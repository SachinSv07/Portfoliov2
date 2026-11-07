const LEETCODE_ENDPOINT = 'https://leetcode.com/graphql'
const USERNAME = 'Sachinsv'

const query = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      userCalendar {
        streak
        totalActiveDays
        submissionCalendar
      }
    }
  }
`

function buildActivity(calendar) {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const activity = []
  const counts = []
  const firstDay = new Date(today)
  firstDay.setUTCDate(today.getUTCDate() - 364)
  firstDay.setUTCDate(firstDay.getUTCDate() - firstDay.getUTCDay())

  for (let index = 0; index < 53 * 7; index += 1) {
    const date = new Date(firstDay)
    date.setUTCDate(firstDay.getUTCDate() + index)
    const timestamp = Math.floor(date.getTime() / 1000)
    const isInRange = date <= today && date >= new Date(today.getTime() - 364 * 86400000)
    const count = isInRange ? Number(calendar[String(timestamp)] ?? 0) : 0
    activity.push(count)
    if (isInRange) counts.push(count)
  }

  let maxStreak = 0
  let currentStreak = 0
  counts.forEach((count) => {
    currentStreak = count > 0 ? currentStreak + 1 : 0
    maxStreak = Math.max(maxStreak, currentStreak)
  })

  return { activity, submissions: counts.reduce((total, count) => total + count, 0), activeDays: counts.filter(Boolean).length, maxStreak }
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const leetcodeResponse = await fetch(LEETCODE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Referer': 'https://leetcode.com/' },
      body: JSON.stringify({ query, variables: { username: USERNAME } }),
    })
    const payload = await leetcodeResponse.json()

    if (!leetcodeResponse.ok || payload.errors?.length || !payload.data?.matchedUser) {
      throw new Error('LeetCode profile data is unavailable')
    }

    const matchedUser = payload.data.matchedUser
    const calendar = JSON.parse(matchedUser.userCalendar?.submissionCalendar ?? '{}')
    const activity = buildActivity(calendar)
    const solved = matchedUser.submitStats?.acSubmissionNum ?? []

    response.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    return response.status(200).json({ username: matchedUser.username, ...activity, streak: matchedUser.userCalendar?.streak ?? activity.maxStreak, solved })
  } catch (error) {
    return response.status(502).json({ error: error instanceof Error ? error.message : 'Unable to load LeetCode data' })
  }
}
