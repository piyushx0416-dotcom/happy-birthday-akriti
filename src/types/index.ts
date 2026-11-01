export interface AkritiProfile {
  name: string;
  fullName: string;
  nickname: string;
  birthday: string;
  age: number;
  zodiac: string;
  tagline: string;
  openingQuote: string;
  heroQuote: string;
  distinguishingFeatures: string[];
  referencePhotos: {
    src: string;
    caption: string;
    alt: string;
  }[];
  favoriteThings: {
    category: string;
    value: string;
    note?: string;
    icon?: string;
  }[];
  littleThings: {
    title: string;
    description: string;
    category: string;
  }[];
  beautifulDetails: {
    title: string;
    detail: string;
    poeticNote: string;
  }[];
}

export interface PersonalityQuality {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  quote?: string;
  tag: string;
  glowColor?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  location?: string;
  image?: string;
  tag?: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  category: "portrait" | "moment" | "adventure" | "quiet";
  aspectRatio?: "square" | "portrait" | "landscape";
  date?: string;
}

export interface FairytaleChapter {
  id: number;
  numberString: string;
  title: string;
  subtitle: string;
  prose: string[];
  magicalArtifact: string;
  quote: string;
  accentColor: string;
}

export interface OpenWhenLetter {
  id: string;
  trigger: string;
  previewPrompt: string;
  sealColor: string;
  letterTitle: string;
  greeting: string;
  body: string[];
  closing: string;
  signature: string;
  postScript?: string;
}

export interface ReasonToSmile {
  id: number;
  reason: string;
  category: "personality" | "smile" | "little_things" | "dreams" | "presence" | "memories";
  highlight?: boolean;
}

export interface BirthdayDetails {
  recipient: string;
  age: number;
  birthDate: string;
  wishPrompt: string;
  cakeMessage: string;
  mainCelebrationLetter: {
    title: string;
    paragraphs: string[];
    signoff: string;
    author: string;
  };
  finalCinematicQuote: string;
  finalCinematicSub: string;
}
