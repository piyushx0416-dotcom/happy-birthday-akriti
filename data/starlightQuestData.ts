// data/starlightQuestData.ts
// The Starlight Quest: A celestial puzzle adventure crafted exclusively for Akriti Singh.
// 19th Birthday celebration — November 6, 2026.

export interface QuestStarNode {
  id: number;
  label: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  order: number;
  clue: string;
}

export interface QuestLevel {
  id: number;
  title: string;
  subtitle: string;
  lore: string;
  hint: string;
  stardustReward: number;
  pointsRequired: number;
  reward: QuestReward;
}

export interface QuestReward {
  levelId: number;
  type: "compliment" | "secret" | "letter" | "keepsake" | "grand-letter";
  title: string;
  subtitle: string;
  badge: string;
  content: string[];
  signature: string;
  cosmeticUnlock?: string;
  photoUrl?: string;
}

export interface BonusSecret {
  id: string;
  name: string;
  stardustCost: number;
  title: string;
  description: string;
  unlockText: string;
}

export const QUEST_LEVELS: QuestLevel[] = [
  {
    id: 1,
    title: "Level 1: The First Constellation",
    subtitle: "The Lyra of Akriti",
    lore: "In the darkened celestial observatory, five ancient stars have lost their luminous path. Trace the path from star to star in their true harmonic sequence to restore the first beacon.",
    hint: "Connect the stars in numerical order (1 through 5) by dragging or clicking from star to star without lifting your finger.",
    stardustReward: 75,
    pointsRequired: 75,
    reward: {
      levelId: 1,
      type: "compliment",
      title: "The Radiant Empress Compliment Card",
      subtitle: "Unlocked from the First Constellation",
      badge: "✦ CELESTIAL HONOUR",
      content: [
        "Akriti,",
        "They say stars are born from ancient dust, but looking at you, I think the cosmos saved its purest light for the moment you were born.",
        "Your elegance isn't something you put on—it's woven into your quiet posture, your gentle laughter, and the silver hoops that frame your smile.",
        "You possess the rare kind of beauty that makes everything around you calm down and feel peaceful."
      ],
      signature: "Forever admiring your light,",
      cosmeticUnlock: "Cosmic Lavender Trail",
      photoUrl: "/assets/akriti/photo-01.jpg"
    }
  },
  {
    id: 2,
    title: "Level 2: The Orbital Puzzle",
    subtitle: "The Harmony of the Three Rings",
    lore: "Three concentric astrolabe rings float around the Polaris Beacon. Rotate the outer, middle, and inner rings until their celestial glyphs line up with the celestial meridian.",
    hint: "Drag or use the rotation controls on each ring until the glowing alignment notch reaches the top meridian (0 degrees). When aligned, the ring locks with a chime.",
    stardustReward: 100,
    pointsRequired: 175,
    reward: {
      levelId: 2,
      type: "secret",
      title: "The Secret Romantic Whisper",
      subtitle: "Decrypted from the Astrolabe Alignment",
      badge: "✧ SACRED CIPHER",
      content: [
        "A Secret Kept in the Stars:",
        "Whenever someone asks me what peace feels like, I think of sitting beside you in comfortable silence, listening to music while the city sleeps outside.",
        "You are my favorite thought at 2:00 AM and my first quiet smile in the morning sun.",
        "No matter what direction the world spins, you are my true north."
      ],
      signature: "Your greatest confidant,",
      cosmeticUnlock: "Golden Orbit Halo",
      photoUrl: "/assets/akriti/photo-03.jpg"
    }
  },
  {
    id: 3,
    title: "Level 3: The Lost Stardust",
    subtitle: "Fragments of the Nebula",
    lore: "A deep violet nebula has scattered four luminous prism crystals into the starfield. Seek them out among the twinkling star cluster and fuse them together.",
    hint: "Click or tap on the pulsing glowing crystals floating in the nebula. Once you gather all four fragments, tap the central crucible to unite them.",
    stardustReward: 125,
    pointsRequired: 300,
    reward: {
      levelId: 3,
      type: "letter",
      title: "A Personalised Mini Love Letter",
      subtitle: "Woven from Reunited Star Fragments",
      badge: "✦ NEBULA ARCHIVE",
      content: [
        "My Dearest Akriti,",
        "Nineteen years ago, on the sixth day of November, something extraordinary was given to this earth. Today, I get to witness the miracle of who you are.",
        "I love the way you listen with your whole heart. I love your sharp wit that catches me off guard. I love how you make me feel like the luckiest human alive simply by sharing your world with me.",
        "May this year bring you the quiet joy, grand triumphs, and gentle days you deserve."
      ],
      signature: "With every ounce of my heart,",
      cosmeticUnlock: "Stardust Constellation Shimmer",
      photoUrl: "/assets/akriti/photo-05.jpg"
    }
  },
  {
    id: 4,
    title: "Level 4: The Celestial Mechanism",
    subtitle: "The Clockwork of Destiny",
    lore: "Three ancient celestial dials control the observatory\'s grand telescope: The Sun Dial, The Moon Dial, and The Venus Dial. Rotate them to their sacred angles to unleash the starlight.",
    hint: "Turn the three dials to match the celestial symbols shown in the constellation legend: Sun to 90°, Moon to 180°, and Venus to 270°.",
    stardustReward: 150,
    pointsRequired: 450,
    reward: {
      levelId: 4,
      type: "keepsake",
      title: "The Eternal Celestial Rose Keepsake",
      subtitle: "Crafted by the Ancient Mechanism",
      badge: "✧ INFINITE KEEPSAKE",
      content: [
        "A Keepsake Preserved in Starlight:",
        "This virtual bloom never withers, never fades, and never loses its fragrance. It carries every tender glance, every shared joke, and every quiet promise.",
        "Whenever life feels heavy, come back here and remember: you are deeply cherished, fiercely admired, and endlessly loved."
      ],
      signature: "Always and endlessly,",
      cosmeticUnlock: "Celestial Aurora Atmosphere",
      photoUrl: "/assets/akriti/photo-07.jpg"
    }
  },
  {
    id: 5,
    title: "Level 5: The Grand Constellation Finale",
    subtitle: "The Crown of November 6",
    lore: "The entire observatory stands breathless. The final grand constellation—the Heart-Crown of Akriti—needs only its final connections to illuminate the cosmos.",
    hint: "Connect the remaining constellation stars to complete the radiant 19th birthday crown heart. The final supernova will illuminate the entire observatory!",
    stardustReward: 250,
    pointsRequired: 700,
    reward: {
      levelId: 5,
      type: "grand-letter",
      title: "The Grand Birthday Letter to Akriti Singh",
      subtitle: "The Ultimate Secret of Her Universe",
      badge: "✦ GRAND TREASURE",
      content: [
        "Akriti,",
        "Happy 19th Birthday, my love.",
        "When I started building this universe for you, I wondered if code, music, and pixels could ever express how much you mean to me. But every star here represents a real moment—a smile of yours that saved a bad day, a look from your dark eyes that made my heart race, a quiet laugh that felt like poetry.",
        "You are nineteen today. You are stepping into a chapter of your life that will be filled with brilliant dreams, beautiful adventures, and unforgettable heights.",
        "No matter where your journey leads, remember this: in every universe, in every timeline, and across every star, I would still choose you.",
        "Happy Birthday, Akriti. You are my universe."
      ],
      signature: "Forever yours, now and always ❤️",
      cosmeticUnlock: "Grand Supernova Illumination",
      photoUrl: "/assets/akriti/photo-02.jpg"
    }
  }
];

export const BONUS_SECRETS: BonusSecret[] = [
  {
    id: "secret-1",
    name: "The Cosmic Playlist Code",
    stardustCost: 50,
    title: "The Melodies of Her Universe",
    description: "Unlock the secret track notes and musical secrets behind our songs.",
    unlockText: "Soundtrack Note: 'One of the Girls' carries the exact sultry, midnight dream aura that embodies your presence. Every beat matches the rhythm of a heart that beats for you."
  },
  {
    id: "secret-2",
    name: "The Star Map of November 6",
    stardustCost: 100,
    title: "The Celestial Coordinates",
    description: "Reveals the astronomical constellation data aligned on November 6.",
    unlockText: "Deep Sky Coordinates: RA 21h 30m, Dec +45° 10'. The star cluster Vega and the Lyra constellation reached zenith on your birthdate, painting a celestial crown across the hemisphere."
  },
  {
    id: "secret-3",
    name: "A Secret Digital Vault Note",
    stardustCost: 200,
    title: "A Hidden 2:00 AM Thought",
    description: "A private letter tucked into the deepest chamber of the galaxy.",
    unlockText: "Midnight Confession: 'If I had a single flower for every time I thought of you, I could walk through my garden forever.' Thank you for being the most beautiful part of my life."
  }
];
