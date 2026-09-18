import { useEffect, useState, type PointerEvent } from 'react'
import { X } from 'lucide-react'

const portraitImage = '/profile.png'
const backgroundImage = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85'
const navLinks = [['Home', '#home'], ['About', '#about'], ['Work', '#work'], ['Experience', '#experience'], ['Achievements', '#achievements'], ['Contact', '#contact']] as const
const socialLinks = [['GitHub', 'https://github.com/SachinSv07'], ['LinkedIn', 'https://www.linkedin.com/in/sachin-sv-'], ['Instagram', 'https://www.instagram.com/madmaxzin/']] as const
const stackGroups = [
  ['Languages', ['C', 'C++', 'Python', 'JavaScript']],
  ['Frontend', ['React.js', 'HTML', 'CSS']],
  ['Backend', ['Node.js', 'Express.js', 'REST APIs']],
  ['Databases', ['MySQL', 'MongoDB']],
  ['Tools', ['Git', 'GitHub', 'Postman', 'VS Code']],
  ['Concepts', ['Data Structures & Algorithms', 'OOP', 'DBMS', 'RESTful APIs']],
] as const
const projects = [
  { title: 'LIVO', description: 'An AI-powered hotel receptionist that connects hotel guests with hotel operations.', detail: 'Technical and backend implementation across the request flow and integrations.', tags: 'AI voice agent / Supabase / Telegram / React', image: '', video: '/livo-demo.mp4', link: '' },
  { title: 'AI Traffic Signal', description: 'Computer vision based traffic monitoring and signal optimization.', detail: 'YOLO-based vehicle detection, density estimation, vehicle classification, and dynamic signal logic.', tags: 'Computer vision / YOLO / Dashboard', image: '', video: '', link: '' },
  { title: 'Knowledge Base Generator', description: 'An AI-powered system for generating and managing structured knowledge-base content.', detail: 'A workflow connecting a React interface, Node.js services, MongoDB, REST APIs, and automation.', tags: 'React / Node.js / Express / MongoDB / n8n', image: '', video: '', link: '' },
  { title: 'SentinelAI', description: 'An AI-powered system for monitoring and analyzing banking telemetry.', detail: 'A focused concept around backend systems, telemetry, and automated analysis.', tags: 'Backend / AI integration / Monitoring', image: '', video: '', link: '' },
] as const
const experience = [
  ['Web Development Training / Internship', 'Nxtlogic', 'WEB / DEV'],
  ['Artificial Intelligence & Machine Learning Internship', 'LST Software Solutions', 'AI / ML'],
] as const
const achievements = ['HackCrux', 'Meta PyTorch OpenEnv x Scaler', 'HackZ24', 'Code Cubicle 5.0']
const certificates = ['NVIDIA CUDA Python', 'NVIDIA CUDA C++', 'Bytexl DSA training', 'SNSCT LeetCode training', 'Nxtlogic Web Development training']
const buildSteps = [
  ['01', 'Understand', 'Understand the problem and requirements.'],
  ['02', 'Design', 'Plan the architecture and user experience.'],
  ['03', 'Build', 'Develop the frontend, backend, APIs, database, and integrations.'],
  ['04', 'Test', 'Find issues, improve reliability, and iterate.'],
  ['05', 'Deploy', 'Turn the project into something usable.'],
  ['06', 'Improve', 'Learn from feedback and keep building.'],
] as const

function Link({ href, children, className = '' }: { href: string; children: string; className?: string }) {
  return <a href={href} className={`transition-opacity duration-300 hover:opacity-60 ${className}`}>{children}</a>
}

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [stackIndex, setStackIndex] = useState(0)
  const [activeProject, setActiveProject] = useState(0)
  const [activeCertificate, setActiveCertificate] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [copied, setCopied] = useState(false)

  const moveMotionModel = (event: PointerEvent<HTMLDivElement>) => {
    const model = event.currentTarget
    const bounds = model.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    model.style.setProperty('--tilt-x', `${y * -10}deg`)
    model.style.setProperty('--tilt-y', `${x * 12}deg`)
    model.style.setProperty('--pointer-x', `${x * 18}px`)
    model.style.setProperty('--pointer-y', `${y * 18}px`)
  }

  const resetMotionModel = (event: PointerEvent<HTMLDivElement>) => {
    const model = event.currentTarget
    model.style.setProperty('--tilt-x', '0deg')
    model.style.setProperty('--tilt-y', '0deg')
    model.style.setProperty('--pointer-x', '0px')
    model.style.setProperty('--pointer-y', '0px')
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
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.12 })
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText('sachin246cr7@gmail.com'); setCopied(true); window.setTimeout(() => setCopied(false), 1800) }
    catch { window.location.href = 'mailto:sachin246cr7@gmail.com' }
  }

  return (
    <div className="bg-black font-hn text-cream">
      <section id="home" className="relative h-[100dvh] w-full overflow-hidden">
        <img className="anim-fade-in absolute inset-0 h-full w-full object-cover" src={backgroundImage} alt="" />
        <div className="anim-fade-up absolute inset-x-0 top-[16vh] z-10 overflow-hidden sm:top-[14vh]" style={{ animationDelay: '500ms' }}><div className="marquee flex w-max whitespace-nowrap font-hn text-[16vh] leading-none sm:text-[26vh]"><span className="pr-[6vw]">Sachin S V&nbsp;&mdash;&nbsp;Software Developer</span><span className="pr-[6vw]">Sachin S V&nbsp;&mdash;&nbsp;Software Developer</span></div></div>
        <img className="anim-rise-in pointer-events-none absolute inset-0 z-20 h-full w-full object-contain object-bottom" style={{ animationDelay: '300ms' }} src={portraitImage} alt="Portrait" />
        <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8"><Link href="#home" className="anim-fade-up text-lg tracking-wide" >Sachin S V</Link><div className="hidden items-start gap-10 text-sm sm:flex lg:gap-16"><span className="anim-fade-up" style={{ animationDelay: '900ms' }}>Software Developer</span><nav className="flex flex-col gap-0.5">{navLinks.slice(1).map(([label, href], index) => <Link key={label} href={href} className="anim-fade-up" >{label}</Link>)}</nav><nav className="flex flex-col gap-0.5">{socialLinks.map(([label, href]) => <Link key={label} href={href} className="anim-fade-up" >{label}</Link>)}</nav></div></header>
        <div className="absolute inset-x-6 bottom-[5.5rem] z-10 h-0.5 origin-left anim-line bg-cream sm:inset-x-10 sm:bottom-28" style={{ animationDelay: '1200ms' }} />
        <footer className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between px-6 pb-5 text-xs leading-relaxed sm:px-10 sm:pb-8 sm:text-sm"><div className="anim-fade-up max-w-[20rem]" style={{ animationDelay: '1400ms' }}><p>Computer Science student building software, AI-powered systems, and interactive digital experiences.</p><div className="mt-5 flex gap-5 text-[0.7rem] uppercase tracking-[0.16em]"><Link href="#work">View Projects</Link><Link href="#contact">Contact Me</Link></div></div><div className="anim-fade-up text-right" style={{ animationDelay: '1550ms' }}>Scroll to explore<br /><span className="text-cream/50">CSE / 2025</span></div></footer>
        <button type="button" className="absolute right-6 top-6 z-50 flex h-10 w-10 items-center justify-center sm:hidden" aria-label={drawerOpen ? 'Close menu' : 'Open menu'} aria-expanded={drawerOpen} onClick={() => setDrawerOpen(!drawerOpen)}><span className={`absolute h-px w-6 bg-cream transition-transform duration-500 ${drawerOpen ? 'rotate-45' : '-translate-y-1.5'}`} /><span className={`absolute h-px w-6 bg-cream transition-opacity duration-300 ${drawerOpen ? 'opacity-0' : 'opacity-100'}`} /><span className={`absolute h-px w-6 bg-cream transition-transform duration-500 ${drawerOpen ? '-rotate-45' : 'translate-y-1.5'}`} /></button>
        <div className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 sm:hidden ${drawerOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} onClick={() => setDrawerOpen(false)}><aside className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[#141414] px-8 py-10 transition-transform duration-[600ms] [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={(event) => event.stopPropagation()}><button type="button" className="absolute right-6 top-6" aria-label="Close menu" onClick={() => setDrawerOpen(false)}><X size={26} strokeWidth={1.5} /></button><p className="mt-16 text-xs uppercase tracking-[0.2em] text-cream/50">Site Index</p><nav className="mt-5 flex flex-col gap-1">{navLinks.map(([label, href]) => <Link key={label} href={href} className="text-4xl" >{label}</Link>)}</nav><p className="mt-16 text-xs uppercase tracking-[0.2em] text-cream/50">Find Me</p><nav className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">{socialLinks.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</nav></aside></div>
      </section>

      <section id="about" className="page-section border-t border-cream/30 px-6 py-24 sm:px-10 sm:py-32"><div className="mx-auto max-w-7xl"><p data-reveal className="reveal-item section-kicker">01 / About</p><div className="mt-14 grid gap-16 lg:grid-cols-[1fr_0.8fr] lg:items-center"><div data-reveal className="reveal-item"><p className="eyebrow">More than just code.</p><h2 className="display-title">I turn ideas into working software.</h2><p className="body-copy">I am a Computer Science & Engineering student who enjoys turning ideas into working software. I work across frontend development, backend systems, APIs, databases, and AI-powered applications.</p><p className="body-copy mt-6">Problem <span className="text-cream/40">→</span> Architecture <span className="text-cream/40">→</span> Development <span className="text-cream/40">→</span> Testing <span className="text-cream/40">→</span> Deployment</p><Link href="/resume.pdf" className="mt-10 inline-block border-b border-cream pb-2 text-sm">View Resume</Link></div><div data-reveal className="reveal-item reveal-delay-1" aria-label="Interactive 3D software development motion model" role="img"><div className="motion-model" onPointerMove={moveMotionModel} onPointerLeave={resetMotionModel}><div className="motion-model-grid" /><div className="motion-path motion-path-one" /><div className="motion-path motion-path-two" /><div className="motion-node motion-node-one"><span>01</span><b>IDEA</b></div><div className="motion-node motion-node-two"><span>02</span><b>BUILD</b></div><div className="motion-node motion-node-three"><span>03</span><b>SHIP</b></div><div className="motion-model-label">MOVE / TO EXPLORE</div></div></div></div></div></section>

      <section id="stack" className="page-section border-t border-cream/30 px-6 py-24 sm:px-10 sm:py-32"><div className="mx-auto max-w-7xl"><p data-reveal className="reveal-item section-kicker">02 / Tech Stack</p><div className="mt-14 grid gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div data-reveal className="reveal-item"><p className="eyebrow">What I use to build</p><h2 className="display-title">A toolkit that moves with the problem.</h2><div className="mt-10 flex gap-3"><button type="button" className="slider-control" onClick={() => setStackIndex((stackIndex + stackGroups.length - 1) % stackGroups.length)}>Prev</button><button type="button" className="slider-control" onClick={() => setStackIndex((stackIndex + 1) % stackGroups.length)}>Next</button></div></div><div data-reveal className="reveal-item reveal-delay-1 stack-stage"><p className="text-xs uppercase tracking-[0.2em] text-cream/45">0{stackIndex + 1} / 0{stackGroups.length}</p><h3 className="mt-8 text-5xl sm:text-7xl">{stackGroups[stackIndex][0]}</h3><div className="mt-8 flex max-w-2xl flex-wrap gap-x-5 gap-y-3">{stackGroups[stackIndex][1].map((item) => <span key={item} className="stack-word">{item}</span>)}</div><div className="mt-16 h-px bg-cream/30"><div className="h-px bg-cream transition-all duration-700" style={{ width: `${((stackIndex + 1) / stackGroups.length) * 100}%` }} /></div></div></div></div></section>

      <section id="work" className="page-section border-t border-cream/30 px-6 py-24 sm:px-10 sm:py-32"><div className="mx-auto max-w-7xl"><div className="flex items-end justify-between gap-8"><p data-reveal className="reveal-item section-kicker">03 / Featured Projects</p><p className="hidden text-xs uppercase tracking-[0.2em] text-cream/40 sm:block">Selected work / 2026</p></div><div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]"><div data-reveal className="reveal-item project-feature"><div className="project-visual">{projects[activeProject].video ? <video key={projects[activeProject].video} className="project-video" src={projects[activeProject].video} autoPlay muted loop playsInline controls aria-label={`${projects[activeProject].title} demo video`} /> : projects[activeProject].image ? <img src={projects[activeProject].image} alt={`${projects[activeProject].title} preview`} /> : <div className="project-placeholder"><span>{projects[activeProject].title}</span><small>case study / details coming soon</small></div>}</div><div className="mt-7 flex items-start justify-between gap-5"><div><p className="text-xs uppercase tracking-[0.2em] text-cream/45">Project 0{activeProject + 1}</p><h2 className="mt-3 text-4xl sm:text-6xl">{projects[activeProject].title}</h2></div><p className="max-w-xs text-right text-sm leading-relaxed text-cream/60">{projects[activeProject].description}</p></div><p className="mt-6 max-w-2xl text-sm leading-relaxed text-cream/60">{projects[activeProject].detail}</p><p className="mt-5 text-xs uppercase tracking-[0.16em] text-cream/45">{projects[activeProject].tags}</p></div><div data-reveal className="reveal-item reveal-delay-1 project-index">{projects.map((project, index) => <button type="button" key={project.title} onClick={() => setActiveProject(index)} className={`project-index-row ${activeProject === index ? 'is-active' : ''}`}><span>0{index + 1}</span><span>{project.title}</span><span>↗</span></button>)}</div></div></div></section>

      <section id="experience" className="page-section border-t border-cream/30 px-6 py-24 sm:px-10 sm:py-32"><div className="mx-auto max-w-7xl"><p data-reveal className="reveal-item section-kicker">05 / Experience</p><div className="experience-list mt-14">{experience.map(([role, company, category], index) => <div data-reveal key={company} className={`experience-entry reveal-item reveal-delay-${index + 1}`}><div className={`experience-visual ${index === 1 ? 'experience-visual-ai' : ''}`}><span>{category.split(' / ')[0]}<br />{category.split(' / ')[1]}</span><small>{company.toUpperCase()} / 2025</small></div><div className="timeline-row"><span>0{index + 1}</span><div><p className="timeline-category">{category}</p><h3>{role}</h3><p>{company}</p><small>Details available on request.</small></div></div></div>)}</div></div></section>

      <section id="achievements" className="page-section border-t border-cream/30 px-6 py-24 sm:px-10 sm:py-32"><div className="mx-auto max-w-7xl"><p data-reveal className="reveal-item section-kicker">06 / Hackathons & Achievements</p><div className="achievement-track mt-14">{achievements.map((achievement, index) => <div data-reveal key={achievement} className={`reveal-item reveal-delay-${Math.min(index + 1, 4)} achievement-item`}><span>0{index + 1}</span><h3>{achievement}</h3><p>Technical event / project participation</p></div>)}</div></div></section>

      <section id="certifications" className="page-section border-t border-cream/30 px-6 py-24 sm:px-10 sm:py-32"><div className="mx-auto max-w-7xl"><p data-reveal className="reveal-item section-kicker">07 / Certifications & Learning</p><div data-reveal className="reveal-item certificate-slider mt-14"><p className="text-xs uppercase tracking-[0.2em] text-cream/45">0{activeCertificate + 1} / 0{certificates.length}</p><h2 className="mt-8 text-4xl sm:text-6xl">{certificates[activeCertificate]}</h2><p className="mt-6 max-w-xl text-sm leading-relaxed text-cream/60">A learning milestone in the ongoing practice of software development.</p><div className="mt-10 flex gap-6"><button type="button" className="slider-control" onClick={() => setActiveCertificate((activeCertificate + certificates.length - 1) % certificates.length)}>Previous</button><button type="button" className="slider-control" onClick={() => setActiveCertificate((activeCertificate + 1) % certificates.length)}>Next</button></div></div></div></section>

      <section id="build" className="page-section border-t border-cream/30 px-6 py-24 sm:px-10 sm:py-32"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]"><div><p data-reveal className="reveal-item section-kicker">08 / How I Build</p><h2 data-reveal className="reveal-item reveal-delay-1 display-title mt-12">From idea to working software.</h2></div><div className="build-steps">{buildSteps.map(([number, title, text], index) => <button type="button" key={number} onClick={() => setActiveStep(index)} className={`build-step ${activeStep === index ? 'is-active' : ''}`}><span>{number}</span><strong>{title}</strong><p>{text}</p></button>)}</div></div></section>

      <section id="beyond" className="page-section border-t border-cream/30 px-6 py-24 sm:px-10 sm:py-32"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]"><p data-reveal className="reveal-item section-kicker">09 / Beyond Code</p><div data-reveal className="reveal-item reveal-delay-1"><p className="eyebrow">Outside the terminal.</p><h2 className="display-title">Curiosity keeps the work human.</h2><div className="beyond-list mt-12">{['Music', 'Graphic design', 'Content creation', 'Exploring new technologies', 'Building experimental projects'].map((item, index) => <span key={item} style={{ '--item-index': index } as React.CSSProperties}>{item}</span>)}</div></div></div></section>

      <section id="current" className="page-section border-t border-cream/30 px-6 py-24 sm:px-10 sm:py-32"><div className="mx-auto max-w-7xl"><p data-reveal className="reveal-item section-kicker">10 / Currently Building</p><div className="current-grid mt-14">{[['LIVO', 'AI-powered hotel operations platform'], ['Exploring', 'AI agents, voice interfaces, automation, and modern web applications.'], ['Learning', 'Backend architecture, system design, and advanced software development.']].map(([title, text], index) => <div data-reveal key={title} className={`reveal-item reveal-delay-${index + 1} current-item`}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

      <section id="contact" className="page-section border-t border-cream/30 px-6 py-24 sm:px-10 sm:py-32"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]"><p data-reveal className="reveal-item section-kicker">11 / Contact</p><div data-reveal className="reveal-item reveal-delay-1"><h2 className="display-title">Let's build something.</h2><p className="body-copy">Have an idea, project, or opportunity? Let's talk.</p><div className="mt-10 flex flex-wrap items-center gap-6"><Link href="mailto:sachin246cr7@gmail.com" className="action-link">Email Me</Link><button type="button" onClick={copyEmail} className="action-link">{copied ? 'Copied' : 'Copy Email'}</button><Link href="https://github.com/SachinSv07" className="action-link">GitHub</Link><Link href="https://www.linkedin.com/in/sachin-sv-" className="action-link">LinkedIn</Link></div></div></div></section>
      <footer className="border-t border-cream/30 px-6 py-6 text-xs text-cream/50 sm:px-10">© 2026 Sachin S V. Built with curiosity and care.</footer>
    </div>
  )
}

export default App
