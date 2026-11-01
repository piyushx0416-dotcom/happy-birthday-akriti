import { TimelineEvent, MemoryItem } from "@/types";

/**
 * =========================================================================
 * OUR TIMELINE
 * =========================================================================
 * Chronological milestones celebrating Akriti.
 * Customise dates, titles, descriptions, and images as desired.
 */
export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "chapter-01",
    date: "A Sacred Beginning",
    title: "When Our Paths Crossed",
    description:
      "The universe has billions of galaxies, yet among all those stars, the timing aligned so we could meet. That first hello started a ripple that changed everything.",
    location: "The Starting Point",
    image: "/assets/images/memories/memory-01.jpg",
    tag: "Origins",
  },
  {
    id: "chapter-02",
    date: "The First Deep Conversation",
    title: "Hours Vanished Like Seconds",
    description:
      "What was supposed to be a brief exchange turned into hours of discussing our dreams, strange philosophies, and quiet confessions. That was the day I realized your soul was a rare treasure.",
    location: "Under Midnight Skies",
    image: "/assets/images/memories/memory-02.jpg",
    tag: "Connection",
  },
  {
    id: "chapter-03",
    date: "The Uncontrollable Laughter",
    title: "Inside Jokes & Teary Smiles",
    description:
      "That hilarious moment where neither of us could stop laughing until our stomachs hurt. In that exact second, the world felt completely weightless.",
    location: "Pure Joy",
    image: "/assets/images/memories/memory-01.jpg",
    tag: "Joy",
  },
  {
    id: "chapter-04",
    date: "Through The Storms",
    title: "The Quiet Anchor",
    description:
      "Days weren't always sunny, but having each other's quiet presence turned heavy burdens into manageable steps. Your strength inspired me more than words could say.",
    location: "Sanctuary",
    image: "/assets/images/memories/memory-02.jpg",
    tag: "Resilience",
  },
  {
    id: "chapter-05",
    date: "November 6, 2026",
    title: "Her 19th Milestone",
    description:
      "Today, we celebrate nineteen years of Akriti bringing elegance, wisdom, and radiant warmth to this earth. The universe is celebrating its favourite star.",
    location: "Her Universe",
    image: "/assets/images/memories/memory-01.jpg",
    tag: "Milestone",
  },
];

/**
 * =========================================================================
 * MEMORY GALLERY
 * =========================================================================
 * High-resolution photo gallery with categories and captions.
 * Replace or append your own images in public/assets/images/memories/
 */
export const MEMORY_GALLERY: MemoryItem[] = [
  {
    id: "mem-01",
    title: "Radiant Demeanour",
    caption: "The effortless grace that defines every room she enters.",
    image: "/assets/images/memories/memory-01.jpg",
    category: "portrait",
    aspectRatio: "portrait",
    date: "November 2026",
  },
  {
    id: "mem-02",
    title: "Elegance in Thought",
    caption: "Soft waves, contemplative eyes, and natural poise.",
    image: "/assets/images/memories/memory-02.jpg",
    category: "portrait",
    aspectRatio: "portrait",
    date: "A Classic Day",
  },
  {
    id: "mem-03",
    title: "Golden Hour Glow",
    caption: "The sunlight seems to seek her out whenever she steps outdoors.",
    image: "/assets/images/memories/memory-01.jpg",
    category: "moment",
    aspectRatio: "square",
    date: "Golden Moments",
  },
  {
    id: "mem-04",
    title: "The Heartfelt Smile",
    caption: "A smile so disarming and genuine, it brightens the entire day.",
    image: "/assets/images/memories/memory-02.jpg",
    category: "moment",
    aspectRatio: "landscape",
    date: "Unforgettable",
  },
  {
    id: "mem-05",
    title: "Quiet Serenity",
    caption: "Finding peace in the simple cadence of life and gentle thoughts.",
    image: "/assets/images/memories/memory-01.jpg",
    category: "quiet",
    aspectRatio: "portrait",
    date: "Serenade",
  },
  {
    id: "mem-06",
    title: "Forever Cherished",
    caption: "A timeless reminder of how special she is today, and every tomorrow.",
    image: "/assets/images/memories/memory-02.jpg",
    category: "adventure",
    aspectRatio: "square",
    date: "Her 19th",
  },
];

/**
 * =========================================================================
 * LITTLE MOMENTS & INSIDE JOKES
 * =========================================================================
 */
export const LITTLE_MOMENTS = [
  {
    quote: "“Wait, did you actually just say that?”",
    context: "Followed by three solid minutes of trying to hold in laughter.",
    mood: "Pure Hilarity",
  },
  {
    quote: "“I’m not sleepy at all.”",
    context: "Said right before drifting off into peaceful dreams five seconds later.",
    mood: "Sweet Innocence",
  },
  {
    quote: "“Let me show you this song...”",
    context: "Sharing an acoustic track that quickly became our shared comfort anthem.",
    mood: "Soul Connection",
  },
  {
    quote: "“You remember that?”",
    context: "The quiet surprise whenever she recalls the smallest forgotten details.",
    mood: "Cherished Care",
  },
];

/**
 * =========================================================================
 * THINGS I REMEMBER ABOUT HER
 * =========================================================================
 */
export const THINGS_I_REMEMBER = [
  "How you tuck your hair behind your ear when you are thinking hard about an answer.",
  "The exact cadence of your voice when you are genuinely thrilled about something new.",
  "The subtle gleam of your nose stud whenever you turn to look at the sunset.",
  "How fiercely loyal and protective you are of the people you truly care about.",
  "The way you make someone feel seen and appreciated, without ever needing an audience.",
  "Your quiet bravery whenever challenges arise — you stand tall with quiet poise.",
];
