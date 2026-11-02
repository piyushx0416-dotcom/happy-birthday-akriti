# HER UNIVERSE ✦ Akriti Singh
> *"A universe where she is the main character."*

A luxury, interactive digital universe crafted exclusively for **Akriti Singh** in celebration of her **19th Birthday** (November 6, 2026).

---

## 🌟 Visual Architecture & Aesthetics
This project combines three visual paradigms:
1. **Dark Cinematic Design**: Midnight black (`#09080F`), deep purple (`#171126`), royal purple (`#30204D`), and volumetric cosmic starlight.
2. **Dreamy Fantasy Design**: AAA cinematic 3D environment with floating celestial islands, golden rune rings, stardust particles, and ethereal avatar styling.
3. **Luxury Editorial Design**: Cormorant Garamond serif typography, champagne gold (`#D6BD8B`), warm ivory (`#F5F0E8`), refined grid borders, and gallery plate formatting.

---

## 🚀 Key Features & Experiences

### 1. Opening Experience (`/`)
- Cinematic intro screen with particle stardust and smooth fading transitions.
- "Somewhere in this universe, there exists a world that revolves around one extraordinary person."
- Choice to **Enter with Sound** or **Enter Silently**, plus skip-intro accessibility.

### 2. The Main Character Hero Experience (`/universe`)
- Full-screen interactive 3D hero scene built with **Three.js, React Three Fiber, and Drei**.
- Ethereal avatar with dark wavy hair, champagne gold waist sash, floating rune rings, and celestial core.
- Interactive mode switcher to toggle between **3D Avatar** and the **Photographic Masterpiece**.
- Graceful 2D fallback for devices without WebGL.
- Drop-in custom model path: `public/assets/models/her-character.glb`.

### 3. The Museum of Her (`/her`)
- Luxury virtual museum inspired by high-end architectural editorial exhibitions:
  - **Exhibition 01: The Masterpiece** (Akriti's introduction and natural traits).
  - **Exhibition 02: Personality Gallery** (Nine virtues: Kindness, Intelligence, Emotional Depth, Individuality, Humour, Resilience, Thoughtfulness, Subtle Radiance, Ordinary Magic).
  - **Exhibition 03: The Little Things** (Habits, expressions, hair tuck, spontaneous laugh).
  - **Exhibition 04: The Beautiful Details** (Natural elegance, dark eyes, small hoop earrings, nose stud).
  - **Exhibition 05: Her Favourite Things** (Colours, music, seasons, coffee, comforts).
  - **Exhibition 06: The Final Portrait** (Personalized celebration tribute).

### 4. Our Little Universe — Memories (`/memories`)
- **Our Timeline**: Chronological milestone path with dates, locations, and descriptions.
- **Memory Gallery**: Curated photo gallery with category filter and full-screen lightbox with keyboard controls (Esc, Arrow Left/Right).
- **Little Moments**: Memorable quotes and inside jokes.
- **Things I Remember**: Personal observations about Akriti.
- **Our Favourite Moments (Feature E)**: Polaroid scrapbook showcase with golden pins, gentle tilts, handwritten notes, and click-to-expand modal view.

### 5. The Interactive Fairytale (`/fairytale`)
- Five connected narrative chapters where Akriti is the protagonist:
  - Chapter I: The Girl Who Makes Everything Beautiful
  - Chapter II: A World Full of Little Wonders
  - Chapter III: The Things That Make Her Special
  - Chapter IV: A Thousand Little Reasons
  - Chapter V: A Day Dedicated to Her (leading into birthday)
- Interactive chapter switcher, progress indicators, and magical artifacts.

### 6. Open When... — Interactive Letters (`/letters`)
- Eight sealed luxury envelopes with wax seals and prompt teasers:
  1. Open when you're sad
  2. Open when you miss me
  3. Open when you need a smile
  4. Open when you feel insecure
  5. Open when you need reassurance
  6. Open when you want to feel loved
  7. Open when you can't sleep
  8. Open when you need to remember how special you are
- Realistic paper opening sound effect, envelope unfolding animation, and full parchment modal.

### 7. 365 Reasons to Smile (`/reasons`)
- Interactive card deck with smooth flip animations.
- **"GIVE ME ANOTHER REASON"** random generator.
- Toggle to browse all 365 reasons for every day of her nineteenth year.
- Category tags and heart saving.

### 8. The Celestial Birthday Room (`/birthday`)
- Grand finale celebration.
- **Interactive Birthday Cake** with 19 candles and realistic flickering flames.
- **"MAKE A WISH & BLOW CANDLES"** interaction:
  - Extinguishes flames with candle smoke wisps.
  - Whoosh sound effect.
  - Golden fireworks burst across the screen via Canvas confetti.
  - Celebratory fanfare arpeggio.
  - Reveals the Grand Birthday Blessing Card.
- **"A LETTER FROM MY HEART"** modal button for the final intimate letter.
- Final scene: *"THE UNIVERSE IS BIG. BUT MY FAVOURITE PART OF IT WILL ALWAYS BE YOU."*

### 9. Central Audio Management & Signature Soundtrack (`src/lib/audio.ts`)
- **Signature Soundtrack**: *"One of the Girls"* by The Weeknd, JENNIE, and Lily-Rose Depp.
- **Floating Luxury Music Player**:
  - Dark translucent glassmorphic body with champagne-gold highlights.
  - Rotating vinyl album artwork.
  - Interactive play/pause, scrubbable progress bar, volume slider, and mute button.
  - Real-time animated audio visualizer waveform bars.
  - Multi-source audio engine: built-in procedural synth chords (Bm, G, Em, F#m), official YouTube video/audio stream modal player, and local audio file support.
- **Web Audio API procedural sound effects**:
  - Melodic harp chime clicks.
  - Paper envelope rustle.
  - Candle blowing whoosh.
  - Celebration fanfare arpeggios.
- Persistent sound toggle in floating navbar and smooth cross-route playback.

---

## 🛠️ Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Audio**: Web Audio API (with zero external dependencies required)

---

## 📁 Content Customization (`src/data/`)
All personal content is stored in clean, editable TypeScript files with clear comments:
- `src/data/akriti.ts` — Profile, distinguishing traits, favourite things, habits.
- `src/data/qualities.ts` — Personality gallery virtues and quotes.
- `src/data/memories.ts` — Timeline milestones, memory gallery, inside jokes.
- `src/data/fairytale.ts` — The 5 narrative chapters.
- `src/data/letters.ts` — The 8 Open When letters.
- `src/data/reasons.ts` — 365 curated reasons to smile.
- `src/data/birthday.ts` — Birthday blessing, wishes, and final letter.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
http://localhost:3000
```

---

## 🚢 Deployment (Vercel)

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Framework Preset: **Next.js**.
4. Root Directory: `./`.
5. Click **Deploy**.

---

*Designed and developed exclusively for Akriti Singh.*
