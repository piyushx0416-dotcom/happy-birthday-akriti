/**
 * PROJECT: HER UNIVERSE
 * CENTRAL CUSTOMIZATION & DATA REPOSITORY
 * 
 * All personal details, messages, qualities, letters, and photograph references
 * are centralized here for easy editing and customisation.
 */

export interface AkritiPhoto {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  caption: string;
  date?: string;
  aspectRatio?: "portrait" | "landscape" | "square";
  tags?: string[];
}

export interface HerQuality {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  quote: string;
  accentColor: string;
  photoIndex: number;
}

export interface ExperienceData {
  celebrant: {
    fullName: string;
    preferredName: string;
    birthDate: string;
    milestoneAge: number;
    year: number;
  };
  messages: {
    heroTagline: string;
    greetingPrimary: string;
    greetingSecondary: string;
    birthdayCardHeadline: string;
    birthdayCardBody: string;
    letterSalutation: string;
    letterBody: string[];
    letterSignoff: string;
    letterAuthor: string;
    letterDate: string;
    finaleQuote: string;
    finaleBirthdayReveal: string;
  };
  qualities: HerQuality[];
  photographs: AkritiPhoto[];
}

export const experienceData: ExperienceData = {
  celebrant: {
    fullName: "Akriti Singh",
    preferredName: "Akriti",
    birthDate: "November 6, 2026",
    milestoneAge: 19,
    year: 2026,
  },

  messages: {
    heroTagline: "A CINEMATIC INTERACTIVE BIRTHDAY EXPERIENCE",
    greetingPrimary: "HAPPY",
    greetingSecondary: "BIRTHDAY",
    birthdayCardHeadline: "Happy birthday, my love.",
    birthdayCardBody:
      "Another year of you.\nAnother year of beautiful possibilities.\nI hope this little world reminds you how special\nyou are and how much happiness you deserve.",
    letterSalutation: "To the girl who deserves a universe of her own,",
    letterBody: [
      "I wanted to create something a little different for your birthday.",
      "Something you could explore, something that could make you smile, and something that would remind you how wonderful you are.",
      "This little universe is yours.",
      "Happy 19th birthday, Akriti.",
    ],
    letterSignoff: "Forever in your orbit,",
    letterAuthor: "With all my love",
    letterDate: "November 06, 2026",
    finaleQuote: "IN EVERY UNIVERSE,\nI WOULD STILL CHOOSE YOURS.",
    finaleBirthdayReveal: "HAPPY 19TH BIRTHDAY, AKRITI.",
  },

  // Her Qualities (Experience Six)
  qualities: [
    {
      id: "kindness",
      number: "01",
      title: "HER KINDNESS",
      subtitle: "A gentle warmth that softens the world",
      summary: "The quiet, effortless way you make everyone around you feel valued and safe.",
      description:
        "Your kindness isn't loud or performative; it lives in the way you listen, the grace with which you understand what people leave unsaid, and the instant comfort your presence brings.",
      quote: "“In a world often too rushed to care, your gentleness is a quiet revolution.”",
      accentColor: "#FF3D91",
      photoIndex: 0,
    },
    {
      id: "individuality",
      number: "02",
      title: "HER INDIVIDUALITY",
      subtitle: "Unapologetically and beautifully herself",
      summary: "You don't follow anyone else's script. You carry your own rhythm.",
      description:
        "There is an effortless authenticity to you. The choices you make, the things that make you light up, and the values you hold onto without hesitation—you are genuinely one of a kind.",
      quote: "“You never tried to fit into the mould; you built your own constellation.”",
      accentColor: "#E8C994",
      photoIndex: 1,
    },
    {
      id: "beautiful-mind",
      number: "03",
      title: "HER BEAUTIFUL MIND",
      subtitle: "Curiosity, depth, and sharp perception",
      summary: "The depth with which you think, observe, and piece together the world.",
      description:
        "Watching your mind work is fascinating. You see nuances that escape most people, connect ideas with spontaneous brilliance, and carry a rare intellectual curiosity that never gets boring.",
      quote: "“A mind that questions deeply, dreams fearlessly, and understands effortlessly.”",
      accentColor: "#BBA7FF",
      photoIndex: 2,
    },
    {
      id: "strength",
      number: "04",
      title: "HER STRENGTH",
      subtitle: "Quiet resilience wrapped in grace",
      summary: "The courage to stand tall, even when the wind blows hard.",
      description:
        "You possess a quiet inner steel that doesn't need to shout to be known. When challenges rise, you meet them with steady poise, learning and growing through every season with unmatched dignity.",
      quote: "“Strength does not always roar; sometimes it is the calm resolve to keep going.”",
      accentColor: "#FF9FCB",
      photoIndex: 3,
    },
    {
      id: "smile",
      number: "05",
      title: "HER SMILE",
      subtitle: "The light that changes the entire room",
      summary: "An uninhibited, sparkling laughter that is completely contagious.",
      description:
        "When you smile genuine and unguarded, everything feels lighter. Your smile has this undeniable gravity that turns any ordinary hour into something unforgettable and luminous.",
      quote: "“Your smile doesn't just illuminate your face; it changes the weather of the room.”",
      accentColor: "#FF3D91",
      photoIndex: 4,
    },
    {
      id: "little-habits",
      number: "06",
      title: "HER LITTLE HABITS",
      subtitle: "The subtle gestures that make you unforgettable",
      summary: "The endearing mannerisms, expressions, and quirks that belong only to you.",
      description:
        "The way you tuck your hair behind your ear, the small pauses you take when thinking, the specific cadence of your voice when you get excited about something you love—the little things are the big things.",
      quote: "“It is in your most unscripted moments that your true beauty shines brightest.”",
      accentColor: "#E8C994",
      photoIndex: 5,
    },
    {
      id: "dreams",
      number: "07",
      title: "HER DREAMS",
      subtitle: "Ambition guided by purpose and heart",
      summary: "The horizon you look towards with fire in your eyes.",
      description:
        "At 19, you stand at the threshold of so many immense possibilities. You dream with wide eyes and a grounded heart, ready to claim the spaces you belong in and write your own extraordinary story.",
      quote: "“May your dreams always be louder than your doubts and bigger than your fears.”",
      accentColor: "#BBA7FF",
      photoIndex: 6,
    },
    {
      id: "way-of-seeing",
      number: "08",
      title: "HER WAY OF SEEING THE WORLD",
      subtitle: "Finding poetry in the ordinary",
      summary: "An artistic lens that notices light, feeling, and unspoken truth.",
      description:
        "You see the world with an uncommon sensitivity—noticing the golden hour light hitting a corner, the sincerity behind someone's gesture, and the poetry woven into everyday life. It makes being with you a gift.",
      quote: "“You look at ordinary things and somehow reveal their hidden wonders.”",
      accentColor: "#FF3D91",
      photoIndex: 7,
    },
  ],

  // Photographs of Akriti (using real provided photos)
  photographs: [
    {
      id: "photo-01",
      src: "/assets/akriti/photo-01.jpg",
      title: "The Golden Horizon",
      subtitle: "Moments in Timeless Light",
      caption: "Akriti in radiant natural light — a glimpse into effortless grace.",
      date: "Milestone Year 19",
      aspectRatio: "landscape",
      tags: ["Radiant", "Grace", "Portrait"],
    },
    {
      id: "photo-02",
      src: "/assets/akriti/photo-02.jpg",
      title: "Her Presence",
      subtitle: "Unapologetically Beautiful",
      caption: "A portrait capturing her calm confidence, elegant posture, and undeniable charm.",
      date: "Signature Collection",
      aspectRatio: "portrait",
      tags: ["Confidence", "Editorial", "Poise"],
    },
    {
      id: "photo-03",
      src: "/assets/akriti/photo-03.jpg",
      title: "Gentle Gaze",
      subtitle: "Depth and Thought",
      caption: "The quiet sincerity in her eyes that speaks without saying a single word.",
      date: "Archival Memory",
      aspectRatio: "portrait",
      tags: ["Eyes", "Depth", "Sanctuary"],
    },
    {
      id: "photo-04",
      src: "/assets/akriti/photo-04.jpg",
      title: "The Signature Waves",
      subtitle: "Natural Elegance",
      caption: "The dark wavy hair framing a face that could inspire a thousand verses.",
      date: "Editorial Detail",
      aspectRatio: "portrait",
      tags: ["Detail", "Artistic", "Akriti"],
    },
    {
      id: "photo-05",
      src: "/assets/akriti/photo-05.jpg",
      title: "Warm Glow",
      subtitle: "Afternoon Serenade",
      caption: "Sunlight falling across the frame, highlighting her peaceful aura.",
      date: "Golden Hours",
      aspectRatio: "landscape",
      tags: ["Light", "Warmth", "Peace"],
    },
    {
      id: "photo-06",
      src: "/assets/akriti/photo-06.jpg",
      title: "Luminous Smile",
      subtitle: "Pure Joy",
      caption: "The smile that turns the entire universe into something brighter.",
      date: "Captured Joy",
      aspectRatio: "square",
      tags: ["Smile", "Laughter", "Magic"],
    },
    {
      id: "photo-07",
      src: "/assets/akriti/photo-07.jpg",
      title: "Candid Grace",
      subtitle: "Unscripted Wonder",
      caption: "An unposed moment capturing her authentic, gentle spirit.",
      date: "Memory Lane",
      aspectRatio: "landscape",
      tags: ["Candid", "Grace", "Pure"],
    },
    {
      id: "photo-08",
      src: "/assets/akriti/photo-08.jpg",
      title: "Poise & Elegance",
      subtitle: "Milestone Chapter",
      caption: "Stepping into nineteen with strength, grace, and an open heart.",
      date: "Chapter 19",
      aspectRatio: "portrait",
      tags: ["Milestone", "Nineteen", "Akriti"],
    },
    {
      id: "photo-09",
      src: "/assets/akriti/photo-09.jpg",
      title: "The Journey",
      subtitle: "Wandering in Wonder",
      caption: "Every path looks better when you walk it with wonder in your eyes.",
      date: "Odyssey",
      aspectRatio: "landscape",
      tags: ["Wander", "Horizon", "Grace"],
    },
    {
      id: "photo-10",
      src: "/assets/akriti/photo-10.jpg",
      title: "Quiet Starlight",
      subtitle: "Celestial Aura",
      caption: "A soul that carries starlight into every room she enters.",
      date: "Nightfall",
      aspectRatio: "portrait",
      tags: ["Starlight", "Celestial", "Quiet"],
    },
    {
      id: "photo-11",
      src: "/assets/akriti/photo-11.jpg",
      title: "Endless Horizons",
      subtitle: "Possibility Awaits",
      caption: "Nineteen years of beauty, and the best chapters are yet to come.",
      date: "November 2026",
      aspectRatio: "landscape",
      tags: ["Future", "Dreams", "Horizon"],
    },
    {
      id: "photo-12",
      src: "/assets/akriti/photo-12.jpg",
      title: "Her Universe",
      subtitle: "The Masterpiece",
      caption: "In every universe, across every timeline, it will always be you.",
      date: "Finale Edition",
      aspectRatio: "portrait",
      tags: ["Universe", "Dedication", "Akriti"],
    },
  ],
};
