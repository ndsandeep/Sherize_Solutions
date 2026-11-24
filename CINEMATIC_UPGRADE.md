# Sherize: cinematic 3D upgrade

## Run it

```bash
cd sherize-spark-web-main
npm install          # NOT `npm ci`: package.json gained 5 dependencies, so package-lock.json must be regenerated
npm run dev          # http://localhost:5173
npm run build        # production build -> dist/
npm run preview      # serve the production build locally
```

New dependencies (all MIT, compatible with React 19 / Vite 7):

| Package | Version | Used for |
|---|---|---|
| three | ^0.180.0 | 3D engine |
| @react-three/fiber | ^9.3.0 (React 19 requires v9) | React renderer for three |
| @react-three/drei | ^10.7.6 (pairs with fiber 9) | Float, Sparkles, useTexture helpers |
| gsap | ^3.13.0 | ScrollTrigger sequences, kinetic type, marquee, parallax |
| lenis | ^1.3.11 | smooth scrolling, synced to GSAP's ticker |

Framer Motion and OGL are unchanged and still used (page shell, tilt cards, magnetic buttons, existing Orb).

## What changed, page by page

**All public pages** (via `PageShell`): route curtain transition (dark, no white flash, correct scroll reset), content rise-in,
scroll progress line, Lenis smooth scrolling (desktop pointers only), kinetic headlines, form focus glow.

**Home**: the hero's dashboard image is now a floating 3D screen with an abstract sculpture (faceted core, orbit rings, gems),
mouse parallax, floating particles and a scroll-driven camera dolly. The original 2D panel stays as the fallback.
New kinetic headline and magnetic primary CTA, a two-row service marquee (real service names), 3D tilt/depth-reveal on
"Why choose" cards and the empowerment image, animated closing CTA with a small 3D accent.

**About**: subtle 3D infinity behind the hero; a pinned, scroll-driven storytelling section with the full-size glowing 3D
infinity symbol (light + comet trail travelling its path continuously, speeding up with scroll) and three chapters built from
your existing About copy; tilt on the story image; new "leadership" cards fed by the existing CEO / Cofounder / HR / Operations
data (`dataService.getTestimonials()`), quote reveals on hover (always visible on touch).

**Services**: floating technical solids in the hero, marquee, 3D tilt + depth-reveal category cards, and each active service in
the accordion gets its own icon motion (7 distinct, same duration family). Descriptions, images, links untouched.

**Portfolio**: floating "frame" shapes, marquee, depth-reveal + 3D tilt project cards, images drift against the cursor.
**Gallery**: orb/ring scene, parallax hero, tilt + depth-reveal image grid and testimonial cards.
**Careers (Opportunities)**: rising-shapes scene, tilt perk cards. Application logic untouched.
**Contact**: calm knot/ring scene, tilt contact cards, glow on focused fields. Form, validation and submit untouched.
**Footer**: ember-particle canvas (2D, not WebGL) and a light sweeping the top edge.
**Navbar**: CSS-only polish (growing hover underline, drawn-in active underline, staggered mobile menu). No markup change.
**Privacy / Terms**: only the shared subtle page transition. **Admin**: no 3D, no smooth scroll, no transition; untouched.

## Performance and safety built in
- Heavy 3D code is lazy-loaded and only fetched when a scene is within 300px of the viewport.
- Rendering stops while a scene is off-screen or the tab is hidden; DPR is capped (1.25 on mobile/low-power, 1.75 desktop).
- Fewer particles/shapes on mobile or low-power devices; the closing-CTA scene is desktop-only.
- No WebGL, a WebGL error, or `prefers-reduced-motion` -> CSS glow fallback, no GSAP motion, no smooth scroll, no curtain.
- Hand-made Three resources (tube geometries, glow texture) are disposed on unmount; GSAP contexts are reverted on unmount.
- Canvases ignore pointer events, so links and forms are never blocked.

## NOT verified (no network in the authoring environment)
These were written but never executed. Please check them first:
1. `npm install` and `npm run build` (the dependencies could not be installed, so nothing was bundled).
2. Visual result of every 3D scene (placement/scale of the hero screen + sculpture at desktop, tablet and phone widths; infinity size).
3. The pinned About story on real devices (pin + Lenis + ScrollTrigger refresh after route changes).
4. Frame rate on low-end phones. If any scene is heavy, lower counts in `AmbientScene.jsx` / `HeroScene.jsx`, or pass `desktopOnly` to its `SceneBackdrop`.
5. Tilt/parallax feel with a real mouse (`Tilt3D.jsx`, `.mf-img` in `global.css`).
6. `npm run lint`: the existing ESLint config only targets `.ts/.tsx`, so it does not lint the `.jsx` files either before or after this change.

What WAS checked offline: every `.js/.jsx` file parses (esbuild), every `@/` and relative import resolves to an existing file with the
named export, and the kinetic-heading word splitter was rendered server-side to confirm markup, gradient handling and aria-label.

## File map
- `src/lib/motion.js`: single GSAP/ScrollTrigger registration, Lenis ref, motion helpers
- `src/hooks/useCapabilities.js`, `usePointer.js`: WebGL / reduced-motion / mobile detection, pointer ref
- `src/components/three/`: `SceneCanvas`, `SceneBackdrop` (lazy, fallback, error boundary), `scenes/HeroScene|InfinityScene|AmbientScene`
- `src/components/shared/`: `KineticHeading`, `Tilt3D`, `DepthReveal`, `Parallax`, `Marquee`, `Magnetic`, `SmoothScroll`, `PageTransition`, `ScrollProgress`, `FooterAura`
- `src/components/sections/`: `InfinityStory`, `LeadershipCards`, `ServiceMarquee`
- Edited: `App.jsx`, `PageShell.jsx`, `CinematicHero.jsx`, `HeroContent.jsx`, `ScrollToTop.jsx`, `Footer.jsx`, `OrbCTA.jsx`, `WhoWeAre.jsx`, `Empowerment.jsx`, `WhyChoose.jsx`, all pages except admin/privacy/terms, `styles/global.css` (appended block), `vite.config.js`, `package.json`
