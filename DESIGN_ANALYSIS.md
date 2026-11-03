# Portfolio Motion Redesign Analysis

## Scope

Reference studied: [Mobius Framer site](https://mobius.framer.website/).

The live site was inspected in a browser at desktop viewport size. I inspected the initial hero, the full-screen menu overlay, and the first editorial scroll chapter. The user-provided video reference was not available as a shared browser page or local file in this session, so details that depend on that recording are marked for confirmation rather than guessed.

This document is an analysis and implementation contract. Application code will not be changed until the user approves the direction.

## Reference Design Language

### Visual thesis

Möbius treats the website as a continuous editorial composition rather than a stack of feature sections. The page moves between short statements, long reading passages, oversized type, and image-led chapters. Its confidence comes from restraint: white space, black type, large scale shifts, and very few decorative elements.

### Typography

- Large sans-serif typography is the main visual material.
- The hero uses a short line-broken statement with a strong first line and a long readable measure.
- Body copy is generous and editorial, with comfortable line length and clear paragraph spacing.
- Navigation and utility labels remain compact and bold.
- Oversized type is used as a spatial object that can extend beyond the viewport or collide with imagery.
- Copy is direct and specific. There is little explanatory UI chrome.

### Layout and spacing

- The header remains visually stable while the content moves beneath it.
- The first viewport is intentionally sparse: text occupies the upper field while the image composition enters from below.
- Large empty areas create anticipation before the next image or typographic chapter appears.
- Sections do not read as cards. They read as full-width scenes with content placed on a broad editorial grid.
- At scroll depth, the next visual chapter is allowed to peek into the viewport.
- The design alternates between white editorial fields and high-contrast black chapters.

### Hero composition

Observed hero characteristics:

- White background.
- Fixed header with brand at left and `MENU` at right.
- Oversized introductory paragraph rather than a conventional “Hi, I’m…” hero.
- A layered image stack enters from the lower viewport edge.
- Image layers are rotated and offset, creating a tactile print-board / art-direction feeling.
- The first viewport communicates identity and point of view before explaining services.

Adaptation for Sachin:

- Replace the studio positioning statement with a first-person software engineering thesis.
- Use the existing portrait as the anchor image, with abstract project frames or local project media entering as layered evidence.
- Keep the hero text-led and avoid a side-by-side profile card.
- Use a single strong line such as “I build the in-between” as the hook, followed by factual software / AI / systems context.

### Navigation

Observed menu behavior:

- The collapsed state is extremely simple: brand and `MENU`.
- Opening the menu switches to a full-screen black overlay.
- The overlay uses large centered links stacked vertically: `Work`, `Studio`, `Feed`, `Contact`.
- The brand and close control remain at the top edges.
- The menu is a scene change, not a dropdown.

Adaptation for Sachin:

- Use `Work`, `About`, `Practice`, `Experiments`, and `Contact` as the primary scene links.
- Use a full-viewport black overlay on mobile and desktop instead of a small drawer.
- Animate menu links as a staggered vertical reveal.
- Keep the overlay keyboard accessible, closable with Escape, and scroll locked.

## Motion System To Recreate

### Motion that is directly supported by browser inspection

1. **Scene-based hero entrance**
   - Fade in the header and copy.
   - Reveal the portrait / project stack from below with a slow clip or translate transition.
   - Stagger headline, supporting text, and utility links.

2. **Editorial scroll reveals**
   - Reveal paragraph groups and section labels as they enter the viewport.
   - Use a masked upward text movement rather than generic opacity-only fades.
   - Stagger adjacent lines and media by approximately 60–100ms.

3. **Oversized type movement**
   - Use large display words as scroll-linked objects.
   - Allow them to move at a different rate from body copy.
   - Keep the movement subtle enough that reading remains stable.

4. **Image mask / layered media reveal**
   - Use clip-path or overflow masks for project media.
   - Reveal media from a geometric edge or vertical wipe.
   - Avoid scale-from-zero and avoid hiding important content until after the reveal.

5. **Full-screen menu transition**
   - Overlay fades in quickly.
   - Menu links rise or slide into place in a short stagger.
   - Close reverses the sequence and returns focus to the menu trigger.

6. **Project hover direction**
   - Project rows should respond with a controlled shift, image crop movement, or preview change.
   - Pointer effects should be additive and disabled on coarse pointers.

7. **Chapter handoffs**
   - Use contrasting paper / ink chapters as the transition language.
   - Add a small edge line or color signal when a chapter becomes active.
   - Avoid arbitrary decorative transitions between every section.

### Motion that needs the unavailable video reference

The following cannot be confirmed from the static browser inspection and must not be copied by assumption:

- Exact smooth-scroll engine and damping values.
- Whether the reference uses pinned / horizontal scroll sections in every chapter.
- Exact image transition masks and sequencing.
- Any custom cursor trail, magnetic behavior, or pointer-following image effect.
- Exact marquee timing and direction.
- Page transition behavior between internal routes.
- Exact easing, duration, and delay values for the reference's animations.

If exact reproduction of those effects is required, the attached screen recording needs to be shared in the workspace or browser. The implementation can still proceed with the documented motion grammar and an original system.

## Portfolio Structure Proposal

### 01 / Hero

- Text-led statement with Sachin's identity and software engineering focus.
- Existing portrait becomes a layered editorial object rather than a profile card.
- Small utility line communicates CSE / builder / availability.
- Scroll progress begins immediately.

### 02 / About

- Long-form editorial introduction.
- Short process sentence as a moving typographic line.
- Resume link treated as a quiet text action.
- No conventional two-column profile block.

### 03 / Technical Expertise

- Interactive expertise index using grouped technologies.
- Animated group changes with crossfade and masked title movement.
- No percentage bars or generic skill cards.
- Technology list remains factual and sourced from the current portfolio.

### 04 / Selected Projects

- Strongest section of the redesign.
- One active project stage plus an editorial project index.
- LIVO retains its real local demo video.
- Other projects use honest visual abstractions until real previews or public links exist.
- Project copy includes problem, contribution, technologies, and verified links only.
- Hover / pointer movement is limited to preview depth and image treatment.

### 05 / Experience and Achievements

- Editorial timeline with internship and training records.
- Certifications, hackathons, and learning milestones become a scrollable sequence rather than isolated cards.
- No invented outcomes, dates, or awards.

### 06 / Experiments / Currently Exploring

- Contrasting chapter with larger type and a moving list of interests.
- Current themes: AI agents, voice interfaces, automation, modern web applications, backend architecture, and system design.
- Motion emphasizes curiosity without turning the section into a particle demo.

### 07 / Contact

- Strong closing statement.
- Email, copy action, GitHub, LinkedIn, and Instagram remain visible.
- Contact chapter changes color and scale to create the final memory point.
- Footer uses a deliberate upward return action and a restrained final reveal.

## Implementation Plan After Approval

1. Build reusable motion primitives:
   - `useScrollProgress`
   - `useInViewReveal`
   - `usePointerTilt`
   - `MaskedText`
   - `FullScreenMenu`
   - `ProjectStage`
2. Replace the current direct DOM reveal effect with a reusable reveal protocol.
3. Add a lightweight scroll-linked motion layer. Use native scroll first; add Lenis only if browser testing shows that native scrolling cannot achieve the intended pacing.
4. Add desktop-only pointer effects with coarse-pointer and reduced-motion fallbacks.
5. Recompose the project section around media masks, active project state, and editorial index behavior.
6. Rework the menu into a full-screen overlay with focus handling.
7. Validate keyboard navigation, reduced motion, mobile composition, project switching, links, video loading, and production build.
8. Browser-test the live Vite app at desktop and mobile widths after the user approves the direction.

## Acceptance Criteria

- The portfolio reads as a continuous digital editorial experience, not a generic developer template.
- Motion supports hierarchy and reading order rather than decorating every element.
- The first viewport communicates Sachin's identity and engineering focus without a conventional split hero.
- Projects are the strongest proof surface and use no fabricated metrics or claims.
- The menu feels like a scene transition and works with keyboard, touch, and Escape.
- Motion is disabled or reduced under `prefers-reduced-motion`.
- Pointer effects do not run on coarse pointers.
- Mobile layout is intentionally recomposed, not merely scaled down.
- `npm run build` passes and the live browser test has no console errors.
