# Sachin Portfolio

An editorial portfolio website for Sachin S V, a Computer Science & Engineering student and software developer. It is built with React, TypeScript, Vite, and Tailwind CSS, using a black and cream palette, oversized typography, and motion-led section transitions.

## About Me

I'm Sachin, a 2nd-year Computer Science student learning full-stack development and core CS fundamentals. I build projects to apply what I learn in algorithms, data structures, web development, and application design.

I am especially interested in understanding system design and solving problems through clean, efficient code. My current focus is building practical projects with modern frontend and backend technologies while strengthening my programming and machine learning foundations.

### Focus Areas

- Full-stack web development
- React and React Native applications
- REST APIs and backend systems
- Data structures and algorithms
- Machine learning and computer vision
- Database design, indexing, and search

### Personal Details

- Role: Computer Science student and aspiring full-stack developer
- Portfolio focus: Practical software projects and continuous learning
- Working style: Curious, hands-on, and focused on clear implementation
- Resume: Available through the About section of the portfolio

### Contact

- Email: [sachin246cr7@gmail.com](mailto:sachin246cr7@gmail.com)
- Phone: [+91 7395848588](tel:+917395848588)
- GitHub: [SachinSv07](https://github.com/SachinSv07)
- LeetCode: [Sachinsv](https://leetcode.com/u/Sachinsv/)
- LinkedIn: [sachin-sv-](https://www.linkedin.com/in/sachin-sv-)
- Instagram: [@madmaxzin](https://www.instagram.com/madmaxzin/)

## Page Contents

- Full-screen hero with the existing background treatment, portrait, animated name marquee, developer identity, and mobile drawer
- About section with personal introduction, process line, portrait treatment, and resume link
- Tech Stack section with a keyboard-friendly technology slider
- Featured Projects section with interactive project selection and real local previews where available
- Experience timeline for Nxtlogic Web Development training / internship and LST Software Solutions Artificial Intelligence & Machine Learning internship
- Hackathons & Achievements rail
- Certifications / Learning slider
- How I Build interactive process timeline
- Beyond Code interests
- Currently Building status panel
- Contact section with email, GitHub, and LinkedIn actions

## Visual Design

- Black background with cream text: `#efeee9`
- Helvetica Neue ME webfont with Helvetica fallbacks
- Editorial typography and border-separated content sections
- No purple tones, decorative glow, or glass effects
- Responsive desktop and mobile layouts
- Reduced-motion support for entrance and marquee animations

## Interactions

- Animated hero entrance sequence
- Continuous name marquee
- Scroll-triggered section reveals with staggered timing
- Animated section scan lines
- Interactive project rows with editorial hover motion
- Project preview selector and image movement
- Tech stack, certification, and project sliders
- Animated architecture flow, timelines, and build steps
- Desktop link hover transitions
- Mobile menu drawer with:
  - Backdrop blur
  - Slide-in panel
  - Staggered navigation reveals
  - Animated hamburger-to-close icon
  - Body scroll locking while open
- Hero navigation links to the About, Projects, and Contact sections

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

## Run Locally

From the workspace root:

```powershell
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Build

```powershell
npm run build
```

The root `package.json` forwards commands to the application in `Portfolio/`.

## Project Structure

```text
Portfolio/
├── README.md
├── package.json              # Root command wrapper
└── Portfolio/
    ├── index.html
    ├── package.json          # Vite app package manifest
    ├── src/
    │   ├── App.tsx           # Portfolio layout and interactions
    │   ├── index.css         # Tailwind layers, theme, animations
    │   ├── main.tsx          # React entry point
    │   └── vite-env.d.ts
    ├── profile.png           # Local portrait
    ├── resume.pdf            # Resume download
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── tsconfig.json
    └── vite.config.ts
```
