# HER UNIVERSE • AKRITI SINGH
### A Cinematic Interactive Birthday Experience for Her 19th Birthday (November 6, 2026)

> **"In every universe, I would still choose yours."**  
> An award-winning, professionally art-directed digital birthday experience crafted exclusively for **Akriti Singh**.

---

## ✦ Table of Contents

1. [Creative Vision & Visual Identity](#-creative-vision--visual-identity)
2. [The Seven Experiences](#-the-seven-experiences)
3. [Technology Stack](#-technology-stack)
4. [Quick Start & Local Setup](#-quick-start--local-setup)
5. [Photograph Customization System](#-photograph-customization-system)
6. [Editing Content, Letters & Qualities](#-editing-content-letters--qualities)
7. [Audio & Ambient Soundtrack](#-audio--ambient-soundtrack)
8. [Mobile Responsiveness & Performance](#-mobile-responsiveness--performance)
9. [Deployment Guide](#-deployment-guide)

---

## ✦ Creative Vision & Visual Identity

*HER UNIVERSE* transforms personal storytelling into a museum-grade digital film experience. Designed from the ground up to avoid generic templates, floating clip-art, or repetitive card grids, every screen carries an intentional editorial identity.

### Design Tokens & Palette
- **Primary Background:** Deep Midnight Black (`#08080D`)
- **Secondary Background:** Dark Charcoal (`#111119`)
- **Primary Accent:** Electric Pink (`#FF3D91`)
- **Secondary Accent:** Soft Rose (`#FF9FCB`)
- **Additional Accents:**
  - Champagne Gold (`#E8C994`)
  - Lavender (`#BBA7FF`)
  - Warm Ivory (`#F8F1E8`)

### Typography
- **Editorial Serifs:** `Playfair Display` & `Cormorant Garamond`
- **Modern Geometric Sans:** `Space Grotesk`, `DM Sans`, and `Inter`
- **Technical Monospace:** `Space Mono`

---

## ✦ The Seven Experiences

The centerpiece of the application is a choreographed 7-act cinematic journey available directly at `/`:

| Experience | Name | Core Visuals & Interactions |
|---|---|---|
| **Act I** | **The Digital Countdown** | Full-screen electric pink and magenta digital-rain canvas stream. 3 → 2 → 1 cinematic scale & blur reveal, followed by the emerging reveal of **HAPPY → BIRTHDAY → AKRITI** with celestial bloom. Includes Skip Intro & Replay. |
| **Act II** | **The Magical Night** | Transition to deep navy-black midnight sky with twinkling stars and drifting stardust. Centerpiece illustration of Akriti in an ivory gown holding an interactive celestial birthday cake. Guests can **Blow out candles / Make a wish** with dynamic particle smoke and sparks. |
| **Act III** | **The Birthday Message** | Dark starry background framing a central Warm Ivory card (`#F8F1E8`) with gold filigree and an embossed watermark. Gradual line-by-line reveal of *"Happy birthday, my love."* and personal introductory copy. |
| **Act IV** | **The Interactive Photograph Experience** | Exhibition gallery with 4 switchable visual layouts: **Two-Photo Editorial**, **Single Spotlight**, **Stacked 3D Cards**, and **Polaroid Collection**. Interactive 3D Y-axis card flip revealing personal captions, dates, and archival notes on the back. Uses authentic photographs of Akriti. |
| **Act V** | **The Birthday Letter** | A luxury digital envelope in midnight obsidian with gold trim and a wax seal stamped with an embossed "A". Clicking breaks the seal with audio feedback; top flap unfolds in 3D perspective and the warm ivory letter emerges with luxury wedding-invitation typography. |
| **Act VI** | **Her Qualities** | High-fashion editorial storytelling (no generic cards!). Large-scale typography showcasing the 8 core pillars (*Her Kindness, Her Individuality, Her Beautiful Mind, Her Strength, Her Smile, Her Little Habits, Her Dreams, Her Way of Seeing the World*). Interacting triggers smooth background color shifts, profound quotes, and paired archival photographs. |
| **Act VII** | **The Heart Collage (Grand Finale)** | Begins in pure darkness. Stars ignite, a tiny glowing pink seed heart pulses, and authentic photograph frames of Akriti fly from the depths into an exact parametric heart curve. On formation, reveals: *"IN EVERY UNIVERSE, I WOULD STILL CHOOSE YOURS."* and *"HAPPY 19TH BIRTHDAY, AKRITI"* with a golden/rose stardust celebration shower and replay controls. |

### Floating Cinematic Dock Controller
During the journey, a sleek, floating dock provides:
- One-click navigation to jump between any of the 7 chapters
- Sound mute/unmute toggle with animated equalizer bars
- Fullscreen mode toggle
- Seamless portal to explore the 3D Universe islands

---

## ✦ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Glassmorphism, 3D Transforms
- **Motion & Physics:** Framer Motion, GSAP, HTML5 Canvas 60 FPS
- **Celebration Effects:** Canvas Confetti
- **Audio Engine:** Web Audio API Procedural Celestial Synthesizer + Custom MP3 support
- **Icons:** Lucide React

---

## ✦ Quick Start & Local Setup

### Prerequisites
- Node.js 18.x or newer
- npm or pnpm

### 1. Installation
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to experience the cinematic journey!

### 3. Production Build
```bash
npm run build
npm run start
```

---

## ✦ Photograph Customization System

All photographs of Akriti are located in:
```
public/assets/akriti/
```

### File Naming Convention:
- `photo-01.jpg` — Main landscape portrait
- `photo-02.jpg` — Signature vertical portrait
- `photo-03.jpg` to `photo-12.jpg` — Varied detail, candid, smile, and milestone photos

### Replacing Photographs:
To add or swap photos:
1. Place your `.jpg` or `.png` files directly inside `public/assets/akriti/`.
2. Name them `photo-01.jpg`, `photo-02.jpg`, etc.
3. No React components need to be modified! The entire site dynamically reads from this directory.

---

## ✦ Editing Content, Letters & Qualities

All texts, dates, messages, captions, and quotes are centralized in a single clean TypeScript file:
```
lib/data/experienceData.ts
```

### What You Can Edit in `lib/data/experienceData.ts`:
- **Celebrant Details:** Full name, preferred name, milestone age (19), birth date.
- **Introductory Message & Birthday Card:** Headline, body paragraphs.
- **The Birthday Letter:** Salutation, body paragraphs, signoff, author name, date.
- **The 8 Qualities:** Titles, subtitles, quotes, descriptions, and accent colors.
- **Photograph Captions:** Titles, subtitles, captions, dates, and tags for every photo.
- **Finale Message:** Grand reveal quote and birthday reveal text.

---

## ✦ Audio & Ambient Soundtrack

The website comes with an embedded **zero-dependency Web Audio API procedural synthesizer**:
- Plays warm, ethereal chords in F# Major / Eb Minor that shimmer with soft detuning.
- Plays micro-interaction audio effects:
  - Celestial chime on countdown numbers and birthday reveal
  - Tactile whoosh on 3D card flips
  - Crisp seal-break sound on opening the letter
  - Celebration arpeggios on the heart collage finale

### Adding a Custom MP3 Soundtrack:
If you want to play a specific song (e.g. your song for Akriti):
1. Copy your audio file to:  
   `public/assets/music/universe-theme.mp3`
2. The sound engine will automatically detect and loop your MP3 instead of the synthesizer!

---

## ✦ Mobile Responsiveness & Performance

- **Fluid Viewport:** Built with 100dvh support to avoid browser address bar jumps.
- **Touch Gestures:** Tap-to-flip cards, swipeable layouts, and touch-optimized buttons.
- **Adaptive Heart Curve:** The finale heart geometry dynamically calculates coordinates for mobile vertical screens (`18 points`) versus desktop widescreen (`22 points + anchors`), maintaining a balanced, symmetrical silhouette on all devices.
- **Accessibility:** Fully supports `prefers-reduced-motion` to tone down high-intensity animations when requested.

---

## ✦ Deployment Guide

### Deploying to Vercel
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select this repository. Next.js will be detected automatically.
4. Click **Deploy**.

---

*HER UNIVERSE • Dedicated to Akriti Singh • 19th Birthday • November 6, 2026*
