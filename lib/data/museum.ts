export interface MuseumExhibit {
  id: string;
  collectionId: "beginning" | "smile" | "little-things" | "unforgettable" | "her-eyes";
  title: string;
  subtitle: string;
  dateOrEra: string;
  imageSrc: string;
  curatorNote: string;
  dimensions: string;
  medium: string;
  accentQuote: string;
}

export interface MuseumCollection {
  id: "beginning" | "smile" | "little-things" | "unforgettable" | "her-eyes";
  code: string;
  title: string;
  description: string;
  curatorIntro: string;
  coverImage: string;
  exhibits: MuseumExhibit[];
}

export const MUSEUM_COLLECTIONS: MuseumCollection[] = [
  {
    id: "beginning",
    code: "GALLERY A",
    title: "The Beautiful Beginning",
    description: "The early milestones, initial memories, and the first steps of an extraordinary journey.",
    curatorIntro: "A delicate curation of origins—capturing the innocence, first glances, and the organic inception of her luminous path.",
    coverImage: "/assets/akriti/exhibit-a1.jpg",
    exhibits: [
      {
        id: "exhibit-a1",
        collectionId: "beginning",
        title: "Genesis of Grace",
        subtitle: "The quiet beginnings of an unshakeable poise",
        dateOrEra: "Early Chapter",
        imageSrc: "/assets/akriti/beginning-1.jpg",
        curatorNote: "Notice the natural calm in her posture even in the earliest frames. Some people are born carrying a quiet dignity that needs no coaching.",
        dimensions: "35mm Archival Film",
        medium: "Natural Sunlight & Warm Memory",
        accentQuote: "“From the very start, she looked at the world as if it were a poem waiting to be read.”"
      },
      {
        id: "exhibit-a2",
        collectionId: "beginning",
        title: "The First Glimpse of the Dreamer",
        subtitle: "An inquisitive look into the endless horizon",
        dateOrEra: "Milestone Era",
        imageSrc: "/assets/akriti/beginning-2.jpg",
        curatorNote: "The unmistakable spark of intellect in her dark brown eyes—always observing, always digesting the deeper rhythm of the world.",
        dimensions: "High Definition Curation",
        medium: "Candid Portraiture",
        accentQuote: "“Curiosity was her first language, and wonder her companion.”"
      }
    ]
  },
  {
    id: "smile",
    code: "GALLERY B",
    title: "Her Smile",
    description: "The rarest currency in the cosmos: unfiltered joy and luminous laughter.",
    curatorIntro: "Science attempts to define luminescence in lumens; this gallery proves that true radiance resides in the curvature of her lips.",
    coverImage: "/assets/akriti/exhibit-b1.jpg",
    exhibits: [
      {
        id: "exhibit-b1",
        collectionId: "smile",
        title: "The Uninhibited Laugh",
        subtitle: "Caught mid-joy, where time itself suspended",
        dateOrEra: "Timeless Moment",
        imageSrc: "/assets/akriti/smile-1.jpg",
        curatorNote: "This frame captures the holy grail of photography: zero self-consciousness, pure genuine delight lighting up every feature.",
        dimensions: "4K Color Grade",
        medium: "Spontaneous Laughter",
        accentQuote: "“A smile so bright that the shadows in the room had no choice but to surrender.”"
      },
      {
        id: "exhibit-b2",
        collectionId: "smile",
        title: "The Soft Half-Smirk",
        subtitle: "The knowing gaze that speaks volumes in silence",
        dateOrEra: "Golden Hour",
        imageSrc: "/assets/akriti/smile-2.jpg",
        curatorNote: "The playful, subtle tilt of the head. When she gives you this smile, you know she has won the argument and she is simply letting you catch up.",
        dimensions: "Editorial 85mm",
        medium: "Champagne Light",
        accentQuote: "“Subtlety is the highest form of power.”"
      }
    ]
  },
  {
    id: "little-things",
    code: "GALLERY C",
    title: "The Little Things",
    description: "Delicate gestures, quiet nuances, and the understated signatures of Akriti.",
    curatorIntro: "A study in micro-elegance: the glint of a hoop earring, the tuck of dark waves, the quiet gaze of contemplation.",
    coverImage: "/assets/akriti/exhibit-c1.jpg",
    exhibits: [
      {
        id: "exhibit-c1",
        collectionId: "little-things",
        title: "The Signature Waves",
        subtitle: "Dark, natural curls catching the ambient light",
        dateOrEra: "Everyday Poetry",
        imageSrc: "/assets/akriti/little-things-1.jpg",
        curatorNote: "Her dark black hair with soft natural waves creates a frame that would render Renaissance oil painters completely speechless.",
        dimensions: "Texture Study",
        medium: "Silk & Midnight Light",
        accentQuote: "“Hair like midnight, flowing with the cadence of the wind.”"
      },
      {
        id: "exhibit-c2",
        collectionId: "little-things",
        title: "Gold & Ivory Accent",
        subtitle: "Delicate hoop earrings and the sparkle of her nose stud",
        dateOrEra: "Detail Study",
        imageSrc: "/assets/akriti/little-things-2.jpg",
        curatorNote: "The delicate jewelry she wears does not overshadow her—it simply bows in reverence to her natural facial balance and warm skin tone.",
        dimensions: "Macro Editorial",
        medium: "Fine Gold & Sunlight",
        accentQuote: "“Elegance is not when you notice the ornament, but when the ornament enhances the person.”"
      }
    ]
  },
  {
    id: "unforgettable",
    code: "GALLERY D",
    title: "Unforgettable Moments",
    description: "Days marked with gold ink on the timeline of our memory.",
    curatorIntro: "Scenes that refuse to fade with the passage of days; memories that glow brighter with each passing season.",
    coverImage: "/assets/akriti/exhibit-d1.jpg",
    exhibits: [
      {
        id: "exhibit-d1",
        collectionId: "unforgettable",
        title: "The Evening of Endless Conversation",
        subtitle: "When the clock lost all authority and hours vanished like minutes",
        dateOrEra: "Night of Starlight",
        imageSrc: "/assets/akriti/unforgettable-1.jpg",
        curatorNote: "Two souls talking about everything and nothing until the city went completely silent. One of the richest moments in existence.",
        dimensions: "Cinematic 2.39:1",
        medium: "Ambient City Lights & Soulful Dialogue",
        accentQuote: "“Some conversations are not merely exchanges; they are sanctuaries.”"
      },
      {
        id: "exhibit-d2",
        collectionId: "unforgettable",
        title: "The Triumphant Milestone",
        subtitle: "Celebrating an accomplishment earned through sheer dedication",
        dateOrEra: "Victory Moment",
        imageSrc: "/assets/akriti/unforgettable-2.jpg",
        curatorNote: "Standing tall, proud of her hard work, reminding everyone that she is as capable as she is graceful.",
        dimensions: "Trophy Edition",
        medium: "Earned Radiance",
        accentQuote: "“Success looks so natural on someone who works with quiet integrity.”"
      }
    ]
  },
  {
    id: "her-eyes",
    code: "GALLERY E",
    title: "The World Through Her Eyes",
    description: "The perspectives, aesthetics, and moments that capture her attention.",
    curatorIntro: "Not merely pictures of Akriti, but the world as framed through her unique aesthetic sensibility and thoughtful perception.",
    coverImage: "/assets/akriti/exhibit-e1.jpg",
    exhibits: [
      {
        id: "exhibit-e1",
        collectionId: "her-eyes",
        title: "The Sunset Sky She Pointed Out",
        subtitle: "Pastel rose and violet clouds that paused her in her tracks",
        dateOrEra: "Twilight Reverie",
        imageSrc: "/assets/akriti/her-eyes-1.jpg",
        curatorNote: "She has that rare ability to pause amidst the rush of the world and say, 'Look at the sky right now.' It reminds everyone to be present.",
        dimensions: "Atmospheric Panoramic",
        medium: "Sunset Horizons",
        accentQuote: "“She finds art where others only see the end of the day.”"
      },
      {
        id: "exhibit-e2",
        collectionId: "her-eyes",
        title: "The Warmth of Everyday Sanctuary",
        subtitle: "Her favorite corner, book, or cozy nook",
        dateOrEra: "Peaceful Evening",
        imageSrc: "/assets/akriti/her-eyes-2.jpg",
        curatorNote: "Her aesthetic taste is an extension of her soul: warm ivory, comforting textures, curated books, and peaceful silence.",
        dimensions: "Still Life",
        medium: "Warm Ivory & Cozy Aesthetics",
        accentQuote: "“Home is not a place; it is the peace she cultivates within.”"
      }
    ]
  }
];
