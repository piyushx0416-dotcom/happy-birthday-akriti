export interface TimeCapsuleEntry {
  id: string;
  era: "past" | "present" | "future";
  year: string;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  content: string;
  futureUnlockDate?: string;
  isLocked?: boolean;
}

export const TIME_CAPSULE_ENTRIES: TimeCapsuleEntry[] = [
  // PAST
  {
    id: "past-1",
    era: "past",
    year: "Before 2026",
    title: "The Inception of Unspoken Understanding",
    subtitle: "The quiet foundation of trust",
    icon: "🕯️",
    badge: "Origin Archive",
    content: "Looking back at the very early days—how conversations grew from polite exchanges into deep, effortless hours where neither of us felt like rushing. The realization that some people enter your life and instantly feel like family."
  },
  {
    id: "past-2",
    era: "past",
    year: "2024 - 2025",
    title: "Overcoming the Steep Mountains",
    subtitle: "Watching her emerge stronger through every trial",
    icon: "🌱",
    badge: "Growth Milestone",
    content: "The moments where exams, challenges, and exhausting weeks tested patience, and you showed up every time with quiet tenacity. You proved to yourself and the world that you are built of stronger material than you gave yourself credit for."
  },
  {
    id: "past-3",
    era: "past",
    year: "2025 - Mid 2026",
    title: "Golden Hour Memories & Little Laughs",
    subtitle: "Unscripted moments etched in gold",
    icon: "🌇",
    badge: "Cherished Moment",
    content: "The sunset strolls, the spontaneous jokes, the shared cups of tea, and the comfortable silences where no words were needed. Proof that the most extraordinary parts of life are disguised as regular Tuesdays."
  },

  // PRESENT
  {
    id: "present-1",
    era: "present",
    year: "November 6, 2026",
    title: "Nineteen Years of Starlight",
    subtitle: "The Golden Age: 19th Birthday",
    icon: "👑",
    badge: "Current Milestone",
    content: "Today marks 19 rotations around the sun. You stand at an exquisite threshold between youth and adulthood—possessing youthful wonder and growing wisdom. You are confident, kind, gorgeous, and on the brink of greatness."
  },
  {
    id: "present-2",
    era: "present",
    year: "Right Now",
    title: "Her Universe: Created Just for You",
    subtitle: "A digital monument to your existence",
    icon: "🪐",
    badge: "Interactive Reality",
    content: "This exact moment, as your eyes read these words on this screen. This website is a living reminder that someone sees you, respects you, and crafted a world to celebrate everything that makes you Akriti Singh."
  },

  // FUTURE
  {
    id: "future-1",
    era: "future",
    year: "Age 20 & Beyond",
    title: "The Unfolding of Your Empire",
    subtitle: "The career, the triumphs, the discoveries",
    icon: "🚀",
    badge: "Destiny Capsule",
    content: "May your twenties be filled with audacious triumphs, inspiring breakthroughs, academic and professional heights, and the deep satisfaction of seeing your biggest goals come to fruition.",
    futureUnlockDate: "November 2027",
    isLocked: false
  },
  {
    id: "future-2",
    era: "future",
    year: "The Dream Horizon",
    title: "A Life Filled With Peace and Endless Travel",
    subtitle: "Wandering ancient cities and mountain sunsets",
    icon: "✈️",
    badge: "Aspiration",
    content: "May you travel to the dream destinations you've always saved photos of. May you stand before historic architecture in ivory coats, feel the ocean breeze, and smile knowing you built a life of beauty and freedom.",
    futureUnlockDate: "2028 and Beyond",
    isLocked: false
  },
  {
    id: "future-3",
    era: "future",
    year: "Eternal Starlight",
    title: "Unshakable Peace Within",
    subtitle: "The ultimate promise to your future self",
    icon: "✨",
    badge: "Blessing",
    content: "Above all trophies and milestones, may you never lose the softness of your heart. May you always look in the mirror with immense pride, knowing you stayed authentic, compassionate, and true to Akriti.",
    futureUnlockDate: "Infinity",
    isLocked: false
  }
];
