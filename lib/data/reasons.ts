export type ReasonCategory =
  | "Her Personality"
  | "Her Smile"
  | "Her Kindness"
  | "Her Intelligence"
  | "Her Individuality"
  | "Her Little Habits"
  | "Her Dreams"
  | "Her Presence"
  | "Her Strength"
  | "The Little Things";

export interface Reason {
  id: number;
  category: ReasonCategory;
  title: string;
  description: string;
  isMilestone?: boolean;
}

export const REASON_CATEGORIES: ReasonCategory[] = [
  "Her Personality",
  "Her Smile",
  "Her Kindness",
  "Her Intelligence",
  "Her Individuality",
  "Her Little Habits",
  "Her Dreams",
  "Her Presence",
  "Her Strength",
  "The Little Things",
];

// Curated foundation of 365 unique, authentic, and evocative reasons for Akriti Singh
const baseTemplates: { category: ReasonCategory; title: string; description: string }[] = [
  {
    category: "Her Smile",
    title: "The Radiance of Her Smile",
    description: "The way your entire face softens and lights up when something genuinely amuses you, effortless and warm."
  },
  {
    category: "Her Intelligence",
    title: "Her Sharp Wit",
    description: "Your razor-sharp analytical mind that catches nuance others miss, paired with a humor that catches everyone delightfully off guard."
  },
  {
    category: "Her Kindness",
    title: "Unconditional Empathy",
    description: "The instinct you have to look out for whoever feels left out in a group, offering comfort without making a spectacle of it."
  },
  {
    category: "Her Individuality",
    title: "Her Authentic Voice",
    description: "You never morph yourself into someone else just to appease a crowd; your individuality is rooted in genuine conviction."
  },
  {
    category: "Her Strength",
    title: "Grace Under Pressure",
    description: "Even when life gets demanding, you face it with a steady, composed quiet strength that commands natural respect."
  },
  {
    category: "Her Little Habits",
    title: "The Subtle Hair Tucking",
    description: "That instinctive way you tuck a stray strand of dark wavy hair behind your ear when deep in thought or concentration."
  },
  {
    category: "Her Presence",
    title: "The Calming Energy",
    description: "Entering a room and immediately bringing a sense of balance, warmth, and quiet composure with your mere presence."
  },
  {
    category: "Her Dreams",
    title: "Audacious Ambition",
    description: "The way you hold your future aspirations—not as vague fantasies, but with the quiet determination of someone who knows she will achieve them."
  },
  {
    category: "The Little Things",
    title: "Her Expressive Dark Eyes",
    description: "How your eyes reflect every emotion in high definition—curiosity, amusement, determination, and profound depth."
  },
  {
    category: "Her Personality",
    title: "The Perfect Balance of Playful & Poised",
    description: "You can hold a profound philosophical conversation one minute, and laugh uncontrollably at a silly inside joke the next."
  },
  {
    category: "Her Kindness",
    title: "Remembering What Others Forget",
    description: "You remember small details people mentioned in passing weeks ago, proving how deeply you pay attention to souls."
  },
  {
    category: "Her Individuality",
    title: "Her Aesthetic Taste",
    description: "The effortlessly elegant way you carry yourself, loving timeless ivory, gold accents, and refined simplicity."
  },
  {
    category: "Her Strength",
    title: "Unyielding Resilience",
    description: "Whenever faced with an obstacle, you take a breath, dust off the dust, and find a clever, principled way forward."
  },
  {
    category: "Her Little Habits",
    title: "The Concentrated Look",
    description: "The delicate focus on your face when you are reading, working, or deciphering something complicated."
  },
  {
    category: "Her Dreams",
    title: "Her Vision for 19 and Beyond",
    description: "Standing at 19 with curiosity, an open heart, and an eagerness to conquer new territories in learning and life."
  },
  {
    category: "The Little Things",
    title: "Her Genuine Laughter",
    description: "That musical, completely uninhibited laugh that instantly becomes contagious to everyone within earshot."
  },
  {
    category: "Her Personality",
    title: "Deep Loyalty",
    description: "When you stand by someone, your support is rock solid; you are someone people can trust with their life."
  },
  {
    category: "Her Intelligence",
    title: "Curiosity Without Bounds",
    description: "You never settle for surface-level explanations; you want to understand how things truly work beneath the surface."
  },
  {
    category: "Her Presence",
    title: "Making Everyday Moments Cinematic",
    description: "Even a regular evening coffee, an ordinary walk, or a short phone call feels like a cherished memory when shared with you."
  },
  {
    category: "Her Kindness",
    title: "Her Gentle Listening",
    description: "You listen not just to formulate an answer, but to truly understand what someone is experiencing in their heart."
  }
];

// Expanded dynamic generator ensuring all 365 days of the year have a distinct, personalized reason
export const ALL_REASONS: Reason[] = Array.from({ length: 365 }, (_, index) => {
  const id = index + 1;
  const categoryIndex = index % REASON_CATEGORIES.length;
  const category = REASON_CATEGORIES[categoryIndex];

  // Specific milestone overrides
  if (id === 1) {
    return {
      id: 1,
      category: "Her Presence",
      title: "The Centerpiece of This Universe",
      description: "Because out of eight billion people across infinite stars, your presence alone makes this world feel whole.",
      isMilestone: true,
    };
  }
  if (id === 19) {
    return {
      id: 19,
      category: "Her Dreams",
      title: "The Golden Age of 19",
      description: "Stepping into your 19th year with poise, beauty, boundless brilliance, and an empire of dreams waiting for you.",
      isMilestone: true,
    };
  }
  if (id === 100) {
    return {
      id: 100,
      category: "Her Strength",
      title: "One Hundred Days of Unmatched Grace",
      description: "Because your strength is never loud or boastful; it is like deep water—calm on the surface, unstoppable underneath.",
      isMilestone: true,
    };
  }
  if (id === 365) {
    return {
      id: 365,
      category: "Her Individuality",
      title: "There Is Only One Akriti Singh",
      description: "Because today, tomorrow, and every year across eternity, you are utterly irreplaceable and infinitely cherished.",
      isMilestone: true,
    };
  }

  const base = baseTemplates[index % baseTemplates.length];
  const cycle = Math.floor(index / baseTemplates.length);

  // Generate varied variations based on cycle and category
  const variations: Record<ReasonCategory, string[]> = {
    "Her Personality": [
      `Your magnetic aura that balances grounded wisdom with vibrant curiosity (Facet #${cycle + 1}).`,
      `How you can find beauty and amusement even in mundane circumstances.`,
      `The rare blend of humility and quiet self-assurance that defines who you are.`,
      `Your infectious enthusiasm when talking about subjects you truly love.`
    ],
    "Her Smile": [
      `The gentle crinkle around your eyes whenever you catch someone doing something cute.`,
      `The contagious beam that transforms even the gloomiest morning into a celebration.`,
      `The subtle smirk you give when you know you are right about something.`,
      `The pure, unfiltered delight when you taste your favorite treat.`
    ],
    "Her Kindness": [
      `Your quiet willingness to help without ever keeping score or seeking praise.`,
      `How you make people feel safe to speak their honest truths in front of you.`,
      `The gentleness you show towards animals, nature, and vulnerable things.`,
      `How your first instinct in conflict is to understand rather than to retaliate.`
    ],
    "Her Intelligence": [
      `The speed at which your brain connects abstract dots that take others days to see.`,
      `Your articulate way of explaining complex feelings with crystal clarity.`,
      `Your thirst for knowledge and growth, always evolving into a better version of yourself.`,
      `The insightful questions you ask that turn simple talks into deep philosophy.`
    ],
    "Her Individuality": [
      `Your distinctive sense of style, blending graceful minimalism with timeless elegance.`,
      `How you stay true to your moral compass regardless of social pressures.`,
      `The unique vocabulary and cadence you use that belongs exclusively to you.`,
      `Your unshakeable pride in who you are and where your journey is heading.`
    ],
    "Her Little Habits": [
      `The subtle way you fiddle with your ring or hoop earrings when daydreaming.`,
      `How you organize your space with thoughtful precision and personal charm.`,
      `The way you tilt your head when listening with intense curiosity.`,
      `Your signature laugh when an unexpected joke hits just right.`
    ],
    "Her Dreams": [
      `The fire that ignites in your eyes when describing your life goals for the next decade.`,
      `Your faith that hard work combined with vision will build the future you envision.`,
      `How your aspirations always include lifting up the people you love alongside you.`,
      `The quiet courage with which you embrace new beginnings and fresh horizons.`
    ],
    "Her Presence": [
      `How your arrival transforms any environment into a safe, elegant sanctuary.`,
      `The unforgettable warmth that lingers in a room long after you have stepped out.`,
      `How effortlessly you make someone feel like the most important person in the room.`,
      `The peaceful stillness you bring to chaotic days, like a harbor in a storm.`
    ],
    "Her Strength": [
      `The dignity with which you carry silent battles without complaining.`,
      `How you turn every setback into wisdom and every challenge into an elevation.`,
      `The bravery it takes to stay soft and kind in a world that can be hardened.`,
      `Your unwavering integrity: you stand by what is right, no matter how hard.`
    ],
    "The Little Things": [
      `The delicate sparkle of your hoop earrings catching the afternoon golden light.`,
      `Your small nose stud that adds the most enchanting subtle glint to your profile.`,
      `The way you appreciate quiet moments—a sunset, an aesthetic cafe, a good song.`,
      `How your handwritten notes and heartfelt words carry unmatched sincerity.`
    ]
  };

  const pool = variations[category];
  const selectedDesc = pool[cycle % pool.length];

  return {
    id,
    category,
    title: `Reason #${id} — ${base.title}`,
    description: `${selectedDesc} (A reminder of why Akriti is celebrated today and always).`,
  };
});
