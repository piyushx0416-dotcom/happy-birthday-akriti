export interface ConstellationStar {
  id: string;
  name: string;
  latinName: string;
  quality: string;
  magnitude: number; // 1 to 5 brightness
  xPercent: number; // 0 to 100 on star map canvas
  yPercent: number;
  color: string;
  lore: string;
  quote: string;
}

export interface ConstellationConnection {
  from: string;
  to: string;
}

export const AKRITI_CONSTELLATION_STARS: ConstellationStar[] = [
  {
    id: "star-luminosa",
    name: "The Star of Radiance",
    latinName: "Stella Luminosa",
    quality: "Radiance & Warmth",
    magnitude: 1,
    xPercent: 50,
    yPercent: 18,
    color: "#f5e7c8",
    lore: "The apex star of the Akriti constellation. It shines with warm champagne gold light, representing the sheer brightness she brings into any room she enters.",
    quote: "Her light does not demand to be noticed; it simply warms everything it touches."
  },
  {
    id: "star-sapientia",
    name: "The Star of Wisdom",
    latinName: "Astrum Sapientiae",
    quality: "Sharp Intellect & Discernment",
    magnitude: 2,
    xPercent: 28,
    yPercent: 34,
    color: "#8b5cf6",
    lore: "Pulsing with deep electric violet luminescence, this celestial beacon marks her profound analytical mind, sharp perception, and quick wit.",
    quote: "A mind that sees through the superficial and honors the profound."
  },
  {
    id: "star-serenitas",
    name: "The Star of Poise",
    latinName: "Aura Serenitatis",
    quality: "Graceful Calm & Composure",
    magnitude: 2,
    xPercent: 72,
    yPercent: 32,
    color: "#e2b4bd",
    lore: "Emitting a soft dusty-rose glow, this star symbolizes her natural equilibrium, composure under pressure, and effortless dignity.",
    quote: "Stillness is not absence of motion; it is supreme mastery of self."
  },
  {
    id: "star-caritas",
    name: "The Star of Empathy",
    latinName: "Cor Compassionis",
    quality: "Gentle Heart & Kindness",
    magnitude: 1.5,
    xPercent: 38,
    yPercent: 52,
    color: "#f4dcd6",
    lore: "A warm, beating stellar core that represents her gentle attention to how others feel and her instinctive need to nurture and comfort.",
    quote: "Kindness is the highest form of human elegance."
  },
  {
    id: "star-fortitudo",
    name: "The Star of Resilience",
    latinName: "Ignis Fortitudinis",
    quality: "Silent Strength & Resolve",
    magnitude: 1.8,
    xPercent: 62,
    yPercent: 54,
    color: "#d4af37",
    lore: "Forged in the heart of resilient nebulae, this gold-veined star reflects her quiet courage to overcome any storm without losing herself.",
    quote: "She bends with the wind like silk, but her roots are carved in diamond."
  },
  {
    id: "star-harmonia",
    name: "The Star of Laughter",
    latinName: "Sonus Harmoniae",
    quality: "Contagious Joy & Playfulness",
    magnitude: 2.2,
    xPercent: 22,
    yPercent: 74,
    color: "#a78bfa",
    lore: "A twinkling binary star system that sparkles like her uninhibited laugh, bringing levity and infectious smiles to everyone around her.",
    quote: "Laughter is the melody the heart sings when it feels completely safe."
  },
  {
    id: "star-fidelitas",
    name: "The Star of Loyalty",
    latinName: "Anchor Fidelitatis",
    quality: "Steadfast Devotion & Truth",
    magnitude: 2.4,
    xPercent: 78,
    yPercent: 72,
    color: "#ebd399",
    lore: "An unwavering anchor star in the southern quadrant, symbolizing her dependable nature, loyalty to those she loves, and deep integrity.",
    quote: "In a world of shifting tides, she is a lighthouse that never wavers."
  },
  {
    id: "star-aeterna",
    name: "The Star of Wonder",
    latinName: "Stella Aeterna",
    quality: "Infinite Potential at 19",
    magnitude: 1.2,
    xPercent: 50,
    yPercent: 88,
    color: "#ffffff",
    lore: "The foundational jewel of her constellation, marking her 19th birthday on November 6, 2026. A star that points forward into an infinite, brilliant future.",
    quote: "The past was merely a prologue; her universe has only just begun to bloom."
  }
];

export const CONSTELLATION_CONNECTIONS: ConstellationConnection[] = [
  { from: "star-luminosa", to: "star-sapientia" },
  { from: "star-luminosa", to: "star-serenitas" },
  { from: "star-sapientia", to: "star-caritas" },
  { from: "star-serenitas", to: "star-fortitudo" },
  { from: "star-caritas", to: "star-fortitudo" },
  { from: "star-caritas", to: "star-harmonia" },
  { from: "star-fortitudo", to: "star-fidelitas" },
  { from: "star-harmonia", to: "star-aeterna" },
  { from: "star-fidelitas", to: "star-aeterna" },
  { from: "star-caritas", to: "star-aeterna" },
  { from: "star-fortitudo", to: "star-aeterna" },
];
