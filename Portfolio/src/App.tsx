import { useEffect, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { ArrowUpRight, Copy, Info, Menu, X } from 'lucide-react'


const portraitImage = '/profile-new.png'
const email = 'sachin246cr7@gmail.com'
const navLinks = [['Index', '#home'], ['About', '#about'], ['Projects', '#work'], ['Expertise', '#practice'], ['LeetCode', '#leetcode'], ['Experience', '#experience'], ['Beyond Engineering', '#experiments'], ['Contact', '#contact']] as const
const socialLinks = [['GitHub', 'https://github.com/SachinSv07'], ['LinkedIn', 'https://www.linkedin.com/in/sachin-sv-'], ['Instagram', 'https://www.instagram.com/madmaxzin/']] as const
const stackGroups = [
  ['Languages', ['C', 'C++', 'Python', 'JavaScript']],
  ['Frontend', ['React.js', 'HTML', 'CSS']],
  ['Backend', ['Node.js', 'Express.js', 'REST APIs']],
  ['Data', ['MySQL', 'MongoDB']],
  ['Tools', ['Git', 'GitHub', 'Postman', 'VS Code']],
  ['Concepts', ['Data Structures & Algorithms', 'OOP', 'DBMS', 'RESTful APIs']],
] as const
const projects = [
  { title: 'LIVO', type: 'AI / OPERATIONS', description: 'An AI-powered hotel operations platform that connects guest requests with the right staff through voice interactions and automated workflows.', detail: 'Worked on backend integrations and request-processing workflows connecting an AI voice agent, Supabase, and staff notification systems.', tags: ['AI voice agent', 'Supabase', 'Telegram', 'React'], video: '/livo-demo.mp4' },
  { title: 'AI Traffic Signal', type: 'COMPUTER VISION', description: 'A computer vision-based traffic management system that detects vehicles, estimates traffic density, and dynamically adjusts signal timings.', detail: 'Implemented YOLO-based vehicle detection, vehicle classification, traffic-density estimation, and dynamic signal-allocation logic.', tags: ['YOLO', 'Vehicle detection', 'Dashboard'], video: undefined },
  { title: 'Knowledge Base Generator', type: 'AUTOMATION / FULL STACK', description: 'A full-stack application that generates and manages structured knowledge-base content through AI-assisted workflows.', detail: 'Worked across the React interface, Node.js services, REST API integration, MongoDB operations, and workflow automation.', tags: ['React', 'Node.js', 'MongoDB', 'n8n'], video: undefined },
  { title: 'SentinelAI', type: 'TELEMETRY / AI', description: 'An intelligent monitoring concept exploring banking telemetry, backend processing, and automated analysis.', detail: 'Explored backend components and AI integrations for processing and analyzing banking telemetry.', tags: ['Backend', 'AI integration', 'Monitoring'], video: undefined },
] as const
const experience = [
  ['Web Development Training / Internship', 'Nxtlogic', 'WEB / DEV'],
  ['Artificial Intelligence & Machine Learning Internship', 'LST Software Solutions', 'AI / ML'],
] as const
const achievements = ['HackCrux', 'Meta PyTorch OpenEnv x Scaler', 'HackZ24', 'Code Cubicle 5.0']
const certificates = ['NVIDIA CUDA Python', 'NVIDIA CUDA C++', 'Bytexl DSA training', 'SNSCT LeetCode training', 'Nxtlogic Web Development training']
const leetcodeMonths = [{ label: 'Nov', column: 1 }, { label: 'Dec', column: 6 }, { label: 'Jan', column: 11 }, { label: 'Feb', column: 15 }, { label: 'Mar', column: 20 }, { label: 'Apr', column: 24 }, { label: 'May', column: 29 }, { label: 'Jun', column: 33 }, { label: 'Jul', column: 38 }, { label: 'Aug', column: 42 }, { label: 'Sep', column: 47 }, { label: 'Oct', column: 51 }]
const leetcodeActivity = Array.from({ length: 53 * 7 }, (_, index) => {
  const week = Math.floor(index / 7)
  const day = index % 7
  const density = (week * 17 + day * 11 + week * day) % 17
  return density < 8 ? 0 : density < 11 ? 1 : density < 14 ? 2 : density < 16 ? 3 : 4
})
type LeetcodeData = { submissions: number; activeDays: number; maxStreak: number; activity: number[]; months: { label: string; column: number }[]; solved: { difficulty: string; count: number }[] }
const fallbackLeetcodeData: LeetcodeData = { submissions: 473, activeDays: 186, maxStreak: 43, activity: leetcodeActivity, months: leetcodeMonths, solved: [{ difficulty: 'All', count: 378 }, { difficulty: 'Easy', count: 136 }, { difficulty: 'Medium', count: 180 }, { difficulty: 'Hard', count: 62 }] }
function leetcodeLevel(count: number) { return count === 0 ? 0 : count < 2 ? 1 : count < 4 ? 2 : count < 7 ? 3 : 4 }
const marqueeItems = ['Software engineering', 'Product development', 'Backend systems', 'Problem solving', 'Build / test / improve']
function Link({ href, children, className = '', external = false, onClick }: { href: string; children: ReactNode; className?: string; external?: boolean; onClick?: () => void }) {
  return <a href={href} className={`link-underline ${className}`} onClick={onClick} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>{children}</a>
}

function SectionLabel({ number, children }: { number: string; children: string }) {
  return <p className="section-label"><span>{number}</span>{children}</p>
}

function MotionText({ children, className = '' }: { children: string; className?: string }) {
  return <span className={`motion-text ${className}`} aria-label={children}>{children.split(' ').map((word, index) => <span className="motion-word" aria-hidden="true" key={`${word}-${index}`} style={{ '--word-index': index } as CSSProperties}>{word}</span>)}</span>
}

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [stackIndex, setStackIndex] = useState(0)
  const [activeProject, setActiveProject] = useState(0)
  const [activeCertificate, setActiveCertificate] = useState(0)
  const [leetcodeData, setLeetcodeData] = useState<LeetcodeData>(fallbackLeetcodeData)
  const [leetcodeSynced, setLeetcodeSynced] = useState(false)
  const [copied, setCopied] = useState(false)

  const movePortrait = (event: PointerEvent<HTMLDivElement>) => {
    const frame = event.currentTarget
    const bounds = frame.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    frame.style.setProperty('--tilt-x', `${y * -5}deg`)
    frame.style.setProperty('--tilt-y', `${x * 5}deg`)
  }

  const moveProject = (event: PointerEvent<HTMLDivElement>) => {
    const stage = event.currentTarget
    const bounds = stage.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    stage.style.setProperty('--tilt-x', `${y * -2.5}deg`)
    stage.style.setProperty('--tilt-y', `${x * 2.5}deg`)
    stage.style.setProperty('--spot-x', `${(x + 0.5) * 100}%`)
    stage.style.setProperty('--spot-y', `${(y + 0.5) * 100}%`)
  }

  const resetProject = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
  }

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setDrawerOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    let frame = 0
    const updateMotion = () => {
      frame = 0
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0
      document.documentElement.style.setProperty('--scroll-progress', String(progress))
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((item) => {
        const amount = Number(item.dataset.parallax ?? 0)
        item.style.setProperty('--parallax-offset', `${window.scrollY * amount}px`)
      })
    }
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateMotion) }
    updateMotion()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (frame) window.cancelAnimationFrame(frame) }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const onPointerMove = (event: globalThis.PointerEvent) => {
      root.style.setProperty('--cursor-x', `${event.clientX}px`)
      root.style.setProperty('--cursor-y', `${event.clientY}px`)
    }
    window.addEventListener('pointermove', onPointerMove)
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.14 })
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    fetch('/api/leetcode')
      .then((response) => { if (!response.ok) throw new Error('LeetCode data unavailable'); return response.json() })
      .then((data: LeetcodeData) => { if (Array.isArray(data.activity)) { setLeetcodeData(data); setLeetcodeSynced(true) } })
      .catch(() => setLeetcodeSynced(false))
  }, [])

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(email); setCopied(true); window.setTimeout(() => setCopied(false), 1800) }
    catch { window.location.href = `mailto:${email}` }
  }

  const project = projects[activeProject]
  const displayLeetcodeMonths = leetcodeData.months.length ? leetcodeData.months : leetcodeMonths
  const leetcodeMonthByColumn = new Map(displayLeetcodeMonths.map((month) => [month.column, month.label]))
  const hasLeetcodeMonthBoundary = (week: number) => displayLeetcodeMonths.some((month) => month.column === week + 2)

  return (
    <div className="site-shell">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="motion-cursor" aria-hidden="true" />
      <header className="site-header">
        <Link href="#home" className="brand-mark">Sachin S V<span></span></Link>
        <div className="header-meta"><span>Software Engineer</span><span className="status-dot">Available for interesting problems</span></div>
        <nav className="desktop-nav" aria-label="Primary navigation">{navLinks.slice(1, 4).map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</nav>
        <button type="button" className="menu-button" aria-label={drawerOpen ? 'Close menu' : 'Open menu'} aria-expanded={drawerOpen} onClick={() => setDrawerOpen(!drawerOpen)}>{drawerOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </header>

      <div className={`mobile-menu ${drawerOpen ? 'is-open' : ''}`} aria-hidden={!drawerOpen} onClick={() => setDrawerOpen(false)}>
        <aside onClick={(event) => event.stopPropagation()}>
          <p className="section-label"><span>00</span>Site index</p>
          <nav>{navLinks.map(([label, href]) => <Link key={label} href={href} className="mobile-nav-link" onClick={() => setDrawerOpen(false)}>{label}</Link>)}</nav>
          <div className="mobile-socials">{socialLinks.map(([label, href]) => <Link key={label} href={href} external>{label}</Link>)}</div>
        </aside>
      </div>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-grid-mark" aria-hidden="true" />
          <div className="hero-copy reveal-on-load" data-parallax="-0.035">
            <p className="eyebrow">Software Engineer / Product-minded Developer</p>
            <h1><MotionText>I engineer ideas</MotionText><br /><em><MotionText>into reality.</MotionText></em></h1>
            <p className="hero-summary">I build software across interfaces, APIs, and backend systems, turning ideas and real-world problems into useful products.</p>
            
          </div>
          <div className="hero-portrait reveal-on-load" data-parallax="0.02" onPointerMove={movePortrait} onPointerLeave={(event) => { event.currentTarget.style.setProperty('--tilt-x', '0deg'); event.currentTarget.style.setProperty('--tilt-y', '0deg') }}>
            <span className="hero-layer hero-layer-back" aria-hidden="true" /><span className="hero-layer hero-layer-mid" aria-hidden="true" />
            <div className="portrait-frame"><img src={portraitImage} alt="Portrait of Sachin S V" /><span className="portrait-stamp">BUILT<br />WITH CURIOSITY</span></div>
            <span className="portrait-caption">01 / Sachin S V<br />Software Engineering / Product Development</span>
          </div>
          <div className="hero-foot reveal-on-load"><span>Scroll to inspect</span><span className="hero-index">01 — 05</span></div>
        </section>
        <div className="marquee-strip" aria-hidden="true"><div>{[...marqueeItems, ...marqueeItems].map((item, index) => <span key={`${item}-${index}`}>{item}<i>+</i></span>)}</div></div>

        <section id="about" className="paper-section about-section">
          <div className="section-layout"><div><SectionLabel number="01">About</SectionLabel></div><div className="about-content"><p className="section-intro" data-reveal><MotionText>I am a Software Engineer interested in designing and building software that solves meaningful problems.</MotionText></p><p className="body-copy" data-reveal>I enjoy working across the stack, from building intuitive user interfaces to developing backend services, integrating APIs, and working with databases. My approach is driven by curiosity, experimentation, and problem-solving. I like understanding how systems work beneath the surface and turning ideas into functional products.</p><div className="process-line" data-reveal><span>Understand</span><i /> <span>Design</span><i /> <span>Build</span><i /> <span>Test</span><i /> <span>Improve</span></div><Link href="/resume.pdf" className="text-link">View resume <ArrowUpRight size={15} /></Link></div></div>
          <div className="about-note" data-reveal><span>Engineering principle</span><strong>Understand the problem.<br />Design with purpose.<br />Build with precision.</strong><small>01 / 03</small></div>
        </section>

        <section id="work" className="ink-section work-section">
          <div className="section-topline"><SectionLabel number="02">Selected Projects</SectionLabel><span className="section-aside">Selected engineering work</span></div>
          <div className="work-layout">
            <div className="project-stage motion-stage" onPointerMove={moveProject} onPointerLeave={resetProject}>
              <div className="project-visual" data-reveal>{project.video ? <video key={project.video} src={project.video} autoPlay muted loop playsInline controls aria-label={`${project.title} demo`} /> : <div className="project-drawing"><span>{String(activeProject + 1).padStart(2, '0')}</span><div className="drawing-orbit" /><div className="drawing-line" /><b>{project.type}</b></div>}</div>
              <div className="project-heading"><div><p className="eyebrow">{project.type}</p><h2>{project.title}</h2></div><span className="project-count">0{activeProject + 1} / 0{projects.length}</span></div>
              <p className="project-description">{project.description}</p>
              <p className="project-detail"><strong>Contribution</strong>{project.detail}</p>
              <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
            <div className="project-index" data-reveal>
              <p className="index-heading">Project index</p>
              {projects.map((item, index) => <button type="button" key={item.title} className={`project-index-row ${activeProject === index ? 'is-active' : ''}`} onClick={() => setActiveProject(index)}><span>0{index + 1}</span><strong>{item.title}</strong><small>{item.type}</small><ArrowUpRight size={16} /></button>)}
              <p className="index-footnote">Project links are added as they become public. No invented outcomes, only work in progress and real decisions.</p>
            </div>
          </div>
        </section>

        <section id="practice" className="paper-section practice-section">
          <div className="section-layout"><div><SectionLabel number="03">Technical Expertise</SectionLabel></div><div><p className="section-intro">Technologies and concepts I use to design, develop, and improve software.</p><div className="stack-tabs" role="tablist" aria-label="Technology groups">{stackGroups.map(([label], index) => <button type="button" role="tab" aria-selected={stackIndex === index} key={label} className={stackIndex === index ? 'is-active' : ''} onClick={() => setStackIndex(index)}>{label}</button>)}</div><div className="stack-display" data-reveal><span className="stack-number">0{stackIndex + 1}</span><h2>{stackGroups[stackIndex][0]}</h2><div className="stack-items">{stackGroups[stackIndex][1].map((item) => <span key={item}>{item}</span>)}</div></div></div></div>
          <div className="practice-quote">“The interesting part is rarely the tool. It is the decision about where the tool belongs.”</div>
        </section>

        <section id="leetcode" className="paper-section leetcode-section">
          <div className="section-topline"><SectionLabel number="04">LeetCode Practice</SectionLabel><span className="section-aside">Consistent problem solving</span></div>
          <div className="leetcode-card" data-reveal>
            <div className="leetcode-card-header"><div><strong>{leetcodeData.submissions}</strong><span>submissions in the past one year</span><Info size={15} /></div><div className="leetcode-summary"><span>Total active days: <b>{leetcodeData.activeDays}</b></span><span>Max streak: <b>{leetcodeData.maxStreak}</b></span><select aria-label="Activity period" defaultValue="Current"><option>Current</option><option>Previous year</option></select></div></div>
            <div className="leetcode-solved">{leetcodeData.solved.map((item) => <div key={item.difficulty}><span>{item.difficulty}</span><strong>{item.count}</strong></div>)}</div>
            <div className="leetcode-heatmap" aria-label="LeetCode submission activity for the past year"><div className="leetcode-months">{Array.from({ length: 53 }, (_, week) => <span className={`leetcode-month-slot ${hasLeetcodeMonthBoundary(week) ? 'month-gap' : ''}`} key={week}>{leetcodeMonthByColumn.get(week + 1) ?? ''}</span>)}</div><div className="leetcode-grid">{Array.from({ length: 53 }, (_, week) => <span className={`leetcode-week ${hasLeetcodeMonthBoundary(week) ? 'month-gap' : ''}`} key={week}>{Array.from({ length: 7 }, (_, day) => { const index = week * 7 + day; return <span className={`leetcode-cell level-${leetcodeLevel(leetcodeData.activity[index] ?? 0)}`} key={day} aria-hidden="true" /> })}</span>)}</div></div>
            <div className="leetcode-card-footer"><Link href="https://leetcode.com/u/Sachinsv/" external>View LeetCode profile <ArrowUpRight size={15} /></Link><span className="leetcode-sync-status">{leetcodeSynced ? 'Live profile' : 'Snapshot fallback'}</span><span className="leetcode-badge">10<span>◇</span></span></div>
          </div>
        </section>

        <section id="experience" className="ink-section experience-section"><div className="section-topline"><SectionLabel number="05">Experience & Professional Development</SectionLabel><span className="section-aside">Training, internships, active study</span></div><div className="experience-table">{experience.map(([role, company, category], index) => <div className="experience-row" data-reveal key={company}><span className="row-number">0{index + 1}</span><span className="row-category">{category}</span><div><h3>{role}</h3><p>{company}</p></div><span className="row-year">2025</span></div>)}</div><div className="learning-strip"><span>Continuing study</span><p>{certificates[activeCertificate]}</p><button type="button" aria-label="Next certification" onClick={() => setActiveCertificate((activeCertificate + 1) % certificates.length)}><ArrowUpRight size={16} /></button></div></section>

        <section id="experiments" className="paper-section notes-section"><div className="section-topline"><SectionLabel number="06">Beyond Engineering</SectionLabel><span className="section-aside">Creative interests beyond software development</span></div><div className="notes-grid"><div className="note-large"><span>Beyond code</span><h2><MotionText>Engineering is built on curiosity.</MotionText></h2></div><div className="note-list">{['Music', 'Graphic design', 'Content creation', 'Exploring new technologies', 'Building experimental projects'].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div></div><div className="achievement-line"><span>In the mix</span>{achievements.map((achievement) => <strong key={achievement}>{achievement}</strong>)}</div></section>

        <section id="contact" className="contact-section"><div className="contact-ghost">LET'S BUILD</div><SectionLabel number="07">Contact</SectionLabel><div className="contact-content"><h2>Let's build<br /><em>something meaningful.</em></h2><p>I'm interested in challenging engineering problems, thoughtful collaborations, and opportunities to build useful software. If you have an idea worth exploring, let's talk.</p><div className="contact-actions"><Link href={`mailto:${email}`} className="primary-link">Send an email <ArrowUpRight size={16} /></Link><button type="button" className="copy-button" onClick={copyEmail}><Copy size={15} />{copied ? 'Copied' : 'Copy email'}</button></div></div><div className="contact-footer"><span>{email}</span><div>{socialLinks.map(([label, href]) => <Link key={label} href={href} external>{label}</Link>)}</div></div></section>
      </main>
      <footer className="site-footer"><span>© 2026 Sachin S V</span><span>Designed and developed with curiosity and care</span><Link href="#home">Back to top ↑</Link></footer>
    </div>
  )
}

export default App
