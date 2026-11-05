/**
 * Single Authoritative Message Architecture for:
 * HER UNIVERSE — 3D Cinematic Birthday Message Experience
 * Dedicated to: Akriti Singh (November 6, 2026 // Turning 19)
 *
 * PALETTE SPECIFICATION (Refined Romantic Palette):
 * Primary Text: Warm Pearl White (#FFF5FA), Soft Ivory White (#FCEAF3) (~60%)
 * Pink Text:    Romantic Pink (#FF8FC5), Blush Pink (#F5A6CD), Soft Rose (#E88AB8), Light Pink (#FFD0E5) (~30%)
 * Accent Text:  Bright Rose (#FF4F9A), Delicate Pink (#FFB6D9) (~10%)
 */

export interface AuthoritativeMessage {
  id: string;
  text: string;
  priority: "high" | "medium" | "low";
  tier: "foreground" | "midground" | "background";
  category: "birthday" | "romantic" | "compliment" | "emoji";
  color?: string;
  fontType?: "serif" | "emoji";
  baseSize?: number;
}

export interface BirthdayUniverseConfig {
  recipient: {
    name: string;
    fullName: string;
    birthday: string;
    age: number;
    title: string;
  };
  messages: AuthoritativeMessage[];
}

export const birthdayUniverseData: BirthdayUniverseConfig = {
  recipient: {
    name: "Akriti",
    fullName: "Akriti Singh",
    birthday: "November 6, 2026",
    age: 19,
    title: "19 Years of Radiance",
  },

  messages: [
    // ===============================================================
    // FOREGROUND (Tier 1: Exactly 5 Prominent Messages)
    // Primarily Warm Pearl White (#FFF5FA) and Blush Pink (#F5A6CD)
    // Soft, luminous, elegant serif letterforms
    // ===============================================================
    {
      id: "fg-hero-birthday",
      text: "Happy Birthday, Akriti",
      priority: "high",
      tier: "foreground",
      category: "birthday",
      color: "#FFF5FA", // Warm Pearl White
      fontType: "serif",
      baseSize: 32,
    },
    {
      id: "fg-forever-love",
      text: "Forever 💖",
      priority: "high",
      tier: "foreground",
      category: "romantic",
      color: "#F5A6CD", // Blush Pink
      fontType: "serif",
      baseSize: 30,
    },
    {
      id: "fg-i-love-you",
      text: "I love you",
      priority: "high",
      tier: "foreground",
      category: "romantic",
      color: "#FFF5FA", // Warm Pearl White
      fontType: "serif",
      baseSize: 30,
    },
    {
      id: "fg-mean-so-much",
      text: "You mean so much to me",
      priority: "high",
      tier: "foreground",
      category: "romantic",
      color: "#FCEAF3", // Soft Ivory White
      fontType: "serif",
      baseSize: 28,
    },
    {
      id: "fg-favourite-person",
      text: "My Favourite Person",
      priority: "high",
      tier: "foreground",
      category: "compliment",
      color: "#F5A6CD", // Blush Pink
      fontType: "serif",
      baseSize: 29,
    },

    // ===============================================================
    // MIDGROUND (Tier 2: 16 Readable Supporting Messages)
    // Organic balance: ~60% Warm White, ~30% Soft Rose/Blush, ~10% Accent
    // ===============================================================
    {
      id: "mg-every-universe",
      text: "In every universe",
      priority: "medium",
      tier: "midground",
      category: "romantic",
      color: "#FFF5FA", // Warm Pearl White
      fontType: "serif",
      baseSize: 23,
    },
    {
      id: "mg-stay-happy",
      text: "Stay happy, my love",
      priority: "medium",
      tier: "midground",
      category: "romantic",
      color: "#E88AB8", // Soft Rose
      fontType: "serif",
      baseSize: 22,
    },
    {
      id: "mg-19-radiance",
      text: "19 Years of Radiance",
      priority: "medium",
      tier: "midground",
      category: "compliment",
      color: "#FFB6D9", // Delicate Pink (Accent)
      fontType: "serif",
      baseSize: 22,
    },
    {
      id: "mg-you-are-special",
      text: "You are special",
      priority: "medium",
      tier: "midground",
      category: "compliment",
      color: "#FCEAF3", // Soft Ivory White
      fontType: "serif",
      baseSize: 22,
    },
    {
      id: "mg-always-forever",
      text: "Always & Forever",
      priority: "medium",
      tier: "midground",
      category: "romantic",
      color: "#FFF5FA", // Warm Pearl White
      fontType: "serif",
      baseSize: 22,
    },
    {
      id: "mg-whole-universe",
      text: "My whole universe",
      priority: "medium",
      tier: "midground",
      category: "romantic",
      color: "#F5A6CD", // Blush Pink
      fontType: "serif",
      baseSize: 23,
    },
    {
      id: "mg-love-endlessly",
      text: "Love you endlessly",
      priority: "medium",
      tier: "midground",
      category: "romantic",
      color: "#FFF5FA", // Warm Pearl White
      fontType: "serif",
      baseSize: 22,
    },
    {
      id: "mg-make-beautiful",
      text: "You make everything beautiful",
      priority: "medium",
      tier: "midground",
      category: "compliment",
      color: "#FCEAF3", // Soft Ivory White
      fontType: "serif",
      baseSize: 21,
    },
    {
      id: "mg-favourite-girl",
      text: "My favourite girl",
      priority: "medium",
      tier: "midground",
      category: "compliment",
      color: "#E88AB8", // Soft Rose
      fontType: "serif",
      baseSize: 22,
    },
    {
      id: "mg-akriti-sparkle",
      text: "Akriti ✨",
      priority: "medium",
      tier: "midground",
      category: "compliment",
      color: "#FFF5FA", // Warm Pearl White
      fontType: "serif",
      baseSize: 23,
    },
    {
      id: "mg-happy-19th",
      text: "Happy 19th Birthday",
      priority: "medium",
      tier: "midground",
      category: "birthday",
      color: "#FF8FC5", // Romantic Pink
      fontType: "serif",
      baseSize: 22,
    },
    {
      id: "mg-forever-always-alt",
      text: "Forever & Always",
      priority: "medium",
      tier: "midground",
      category: "romantic",
      color: "#FFF5FA", // Warm Pearl White
      fontType: "serif",
      baseSize: 22,
    },
    {
      id: "mg-choose-yours",
      text: "I would still choose you",
      priority: "medium",
      tier: "midground",
      category: "romantic",
      color: "#FCEAF3", // Soft Ivory White
      fontType: "serif",
      baseSize: 22,
    },
    {
      id: "mg-smiling-happy",
      text: "As long as you're smiling",
      priority: "medium",
      tier: "midground",
      category: "romantic",
      color: "#FFF5FA", // Warm Pearl White
      fontType: "serif",
      baseSize: 21,
    },
    {
      id: "mg-heart-sparkle-1",
      text: "💖",
      priority: "medium",
      tier: "midground",
      category: "emoji",
      color: "#FF4F9A", // Bright Rose (Accent)
      fontType: "emoji",
      baseSize: 22,
    },
    {
      id: "mg-heart-sparkle-2",
      text: "💕",
      priority: "medium",
      tier: "midground",
      category: "emoji",
      color: "#FF8FC5", // Romantic Pink
      fontType: "emoji",
      baseSize: 22,
    },

    // ===============================================================
    // BACKGROUND (Tier 3: 36 Distant Ambient Messages & Hearts)
    // Muted Soft Rose, Dim Ivory, and Light Pink with Lower Opacity
    // ===============================================================
    { id: "bg-01", text: "Happy birthday", priority: "low", tier: "background", category: "birthday", color: "#FCEAF3", fontType: "serif", baseSize: 15 },
    { id: "bg-02", text: "I love you", priority: "low", tier: "background", category: "romantic", color: "#FFF5FA", fontType: "serif", baseSize: 15 },
    { id: "bg-03", text: "Forever", priority: "low", tier: "background", category: "romantic", color: "#FCEAF3", fontType: "serif", baseSize: 15 },
    { id: "bg-04", text: "You mean so much to me", priority: "low", tier: "background", category: "romantic", color: "#FCEAF3", fontType: "serif", baseSize: 14 },
    { id: "bg-05", text: "My whole universe", priority: "low", tier: "background", category: "romantic", color: "#FFF5FA", fontType: "serif", baseSize: 15 },
    { id: "bg-06", text: "You are special", priority: "low", tier: "background", category: "compliment", color: "#E88AB8", fontType: "serif", baseSize: 14 },
    { id: "bg-07", text: "Stay happy, my love", priority: "low", tier: "background", category: "romantic", color: "#FCEAF3", fontType: "serif", baseSize: 14 },
    { id: "bg-08", text: "In every universe", priority: "low", tier: "background", category: "romantic", color: "#FFF5FA", fontType: "serif", baseSize: 15 },
    { id: "bg-09", text: "Always & forever", priority: "low", tier: "background", category: "romantic", color: "#FFF5FA", fontType: "serif", baseSize: 14 },
    { id: "bg-10", text: "19 Years", priority: "low", tier: "background", category: "compliment", color: "#FFB6D9", fontType: "serif", baseSize: 14 },
    { id: "bg-11", text: "Love you endlessly", priority: "low", tier: "background", category: "romantic", color: "#FFF5FA", fontType: "serif", baseSize: 14 },
    { id: "bg-12", text: "Beautiful", priority: "low", tier: "background", category: "compliment", color: "#FCEAF3", fontType: "serif", baseSize: 15 },
    { id: "bg-13", text: "My favourite person", priority: "low", tier: "background", category: "compliment", color: "#E88AB8", fontType: "serif", baseSize: 14 },
    { id: "bg-14", text: "Happy birthday", priority: "low", tier: "background", category: "birthday", color: "#FFF5FA", fontType: "serif", baseSize: 15 },
    { id: "bg-15", text: "Forever & Always", priority: "low", tier: "background", category: "romantic", color: "#FCEAF3", fontType: "serif", baseSize: 14 },
    { id: "bg-16", text: "You are my favorite", priority: "low", tier: "background", category: "compliment", color: "#FCEAF3", fontType: "serif", baseSize: 14 },
    { id: "bg-17", text: "I love you", priority: "low", tier: "background", category: "romantic", color: "#FFF5FA", fontType: "serif", baseSize: 14 },
    { id: "bg-18", text: "Forever", priority: "low", tier: "background", category: "romantic", color: "#FCEAF3", fontType: "serif", baseSize: 15 },
    { id: "bg-19", text: "November 6", priority: "low", tier: "background", category: "birthday", color: "#FF8FC5", fontType: "serif", baseSize: 14 },
    { id: "bg-20", text: "My whole heart", priority: "low", tier: "background", category: "romantic", color: "#FFF5FA", fontType: "serif", baseSize: 14 },
    { id: "bg-21", text: "Akriti", priority: "low", tier: "background", category: "compliment", color: "#FCEAF3", fontType: "serif", baseSize: 15 },
    { id: "bg-22", text: "You mean so much", priority: "low", tier: "background", category: "romantic", color: "#E88AB8", fontType: "serif", baseSize: 14 },
    { id: "bg-23", text: "Stay smiling", priority: "low", tier: "background", category: "romantic", color: "#FFF5FA", fontType: "serif", baseSize: 14 },
    { id: "bg-24", text: "Happy 19th", priority: "low", tier: "background", category: "birthday", color: "#FFF5FA", fontType: "serif", baseSize: 14 },
    { id: "bg-25", text: "Forever and always", priority: "low", tier: "background", category: "romantic", color: "#FCEAF3", fontType: "serif", baseSize: 14 },
    { id: "bg-26", text: "In every universe", priority: "low", tier: "background", category: "romantic", color: "#FFF5FA", fontType: "serif", baseSize: 14 },
    { id: "bg-27", text: "I love you", priority: "low", tier: "background", category: "romantic", color: "#FCEAF3", fontType: "serif", baseSize: 14 },
    { id: "bg-28", text: "Radiance", priority: "low", tier: "background", category: "compliment", color: "#FFB6D9", fontType: "serif", baseSize: 14 },

    // Floating Romantic Heart Emojis (Tier 3)
    { id: "bg-heart-01", text: "💖", priority: "low", tier: "background", category: "emoji", color: "#FF8FC5", fontType: "emoji", baseSize: 17 },
    { id: "bg-heart-02", text: "💕", priority: "low", tier: "background", category: "emoji", color: "#F5A6CD", fontType: "emoji", baseSize: 16 },
    { id: "bg-heart-03", text: "❤️", priority: "low", tier: "background", category: "emoji", color: "#E88AB8", fontType: "emoji", baseSize: 16 },
    { id: "bg-heart-04", text: "💖", priority: "low", tier: "background", category: "emoji", color: "#FFD0E5", fontType: "emoji", baseSize: 15 },
    { id: "bg-heart-05", text: "💕", priority: "low", tier: "background", category: "emoji", color: "#FFB6D9", fontType: "emoji", baseSize: 16 },
    { id: "bg-heart-06", text: "❤️", priority: "low", tier: "background", category: "emoji", color: "#F5A6CD", fontType: "emoji", baseSize: 16 },
    { id: "bg-heart-07", text: "💖", priority: "low", tier: "background", category: "emoji", color: "#FF8FC5", fontType: "emoji", baseSize: 15 },
    { id: "bg-heart-08", text: "💕", priority: "low", tier: "background", category: "emoji", color: "#FFD0E5", fontType: "emoji", baseSize: 15 },
  ],
};
