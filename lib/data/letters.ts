export interface OpenWhenLetter {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  envelopeColor: string;
  waxSealIcon: string;
  quote: string;
  content: string[];
  readTime: string;
  dateTag: string;
}

export const OPEN_WHEN_LETTERS: OpenWhenLetter[] = [
  {
    id: "sad",
    slug: "open-when-you-are-sad",
    title: "Open When You Are Sad",
    subtitle: "For the quiet afternoons when the weight feels just a little too heavy.",
    envelopeColor: "from-purple-950 via-slate-900 to-indigo-950",
    waxSealIcon: "🌙",
    quote: "Even the moon must pass through phases of darkness before it is whole again.",
    readTime: "3 min read",
    dateTag: "Always Here",
    content: [
      "Dearest Akriti,",
      "If you're reading this, the clouds are probably lingering a little too low today, or something has weighed on your gentle heart. First, take a deep breath. Drop your shoulders away from your ears, unclench your jaw, and let the air fill your chest.",
      "I want you to know that it is completely okay to feel sad. You don't have to carry the sunshine for everyone every single second of the day. You don't have to be invincible. The world often asks people with soft hearts to be endlessly resilient, but even the strongest sky needs rain to bloom again.",
      "Remember who you are: a soul with immense grace, capable of creating warmth wherever you step. Whatever hurt, disappointed, or drained you today does not get the final say on who you are. This sadness is just a passing weather pattern over an infinite, brilliant constellation.",
      "Drink a warm cup of something comforting, wrap yourself in your softest blanket, and rest. You are deeply cherished, and tomorrow the sun will rise with a fresh canvas just for you.",
      "With endless gentleness and warmth,"
    ]
  },
  {
    id: "miss-me",
    slug: "open-when-you-miss-me",
    title: "Open When You Miss Me",
    subtitle: "When distance feels tangible and you want a reminder of closeness.",
    envelopeColor: "from-rose-950 via-slate-900 to-amber-950",
    waxSealIcon: "✨",
    quote: "Distance is just physical geometry; souls that resonate are never apart.",
    readTime: "2 min read",
    dateTag: "Across the Stars",
    content: [
      "Hey Akriti,",
      "Whenever you feel that quiet pang of missing me, look up at the sky. Whether it's the blue horizon or the deep violet canopy of midnight, we are standing under the very same atmosphere, breathing the same air, sharing the exact same orbit.",
      "Every inside joke, every shared smile, every quiet conversation where time simply melted away—all of those are permanently woven into the fabric of this universe. Nothing erases them. Nothing diminishes them.",
      "Think of our favorite moment right now. Can you hear the laughter? Can you picture the goofy smile? Hold onto that warmth. I'm right here with you in spirit, rooting for you, proud of you, and waiting for the next moment we talk.",
      "Until then, carry this reminder close: you are never truly alone.",
      "Always nearby,"
    ]
  },
  {
    id: "doubt-yourself",
    slug: "open-when-you-doubt-yourself",
    title: "Open When You Doubt Yourself",
    subtitle: "When the quiet inner critic speaks louder than your brilliance.",
    envelopeColor: "from-indigo-950 via-slate-900 to-fuchsia-950",
    waxSealIcon: "🛡️",
    quote: "Doubt is merely evidence of how much you care; let your courage answer it.",
    readTime: "3 min read",
    dateTag: "Unshakeable",
    content: [
      "Akriti,",
      "Stop what you're doing right now and look at the path behind you. Every single impossible day you thought you couldn't survive? You made it through every single one of them with 100% success.",
      "Self-doubt has a sneaky way of amplifying our small hesitations while blinding us to our undeniable gifts. It forgets your sharp intellect, your intuition, the effortless elegance with which you solve problems, and the quiet courage you bring to every room.",
      "You are turning 19, standing on the threshold of so much power and discovery. You don't need to know every single step ahead. You only need to trust the brilliant mind and luminous heart you already possess.",
      "You were made to conquer this. Straighten your posture, take that step forward, and watch how the room bends to make space for your light.",
      "Your biggest believer,"
    ]
  },
  {
    id: "cannot-sleep",
    slug: "open-when-you-cannot-sleep",
    title: "Open When You Cannot Sleep",
    subtitle: "For the midnight hours when your mind wanders through galaxies.",
    envelopeColor: "from-slate-950 via-violet-950 to-blue-950",
    waxSealIcon: "🌌",
    quote: "Let the night keep its secrets; tonight, you need only rest.",
    readTime: "3 min read",
    dateTag: "Midnight Lullaby",
    content: [
      "Hey night owl,",
      "It's 2 AM or 3 AM, and the ceiling fan is turning, the silence is humming, and your thoughts are racing in fifty different directions at once. I know that feeling.",
      "Here is your permission slip: you don't have to solve tomorrow's dilemmas tonight. You don't have to replay conversations from three weeks ago. You don't have to figure out your entire life trajectory before sunrise.",
      "Tonight has only one job for you: to let your body soften and recharge. Close your eyes and imagine the floating islands of Her Universe. Imagine the lavender clouds drifting across the violet sky, the sound of starlight waterfalls falling into a calm crystal lake.",
      "Feel the weight of the day lifting off your forehead. Tomorrow will wait for you patiently. Goodnight, Akriti. Rest well.",
      "Sweet dreams in the stars,"
    ]
  },
  {
    id: "need-motivation",
    slug: "open-when-you-need-motivation",
    title: "Open When You Need Motivation",
    subtitle: "When the mountain feels steep and your energy is running low.",
    envelopeColor: "from-amber-950 via-slate-900 to-red-950",
    waxSealIcon: "⚡",
    quote: "Fire is not asked to explain itself; it simply burns and warms.",
    readTime: "2 min read",
    dateTag: "Pure Energy",
    content: [
      "Akriti,",
      "Here is your reminder of the sheer force of nature that lives inside you. When you decide to focus on something, there is an intensity and precision in you that is genuinely awe-inspiring.",
      "I know the deadlines, exams, goals, or expectations might feel like a mountain today. But mountains are climbed one steady breath and one focused step at a time. You don't need an overwhelming surge of lightning; you just need to start with five minutes of undivided focus.",
      "Put your hair up, play your favorite power track, take a sip of water, and show this challenge who is in charge. You have genius within you, and when you lock in, you are completely unstoppable.",
      "Now go conquer it. I already know you will.",
      "Standing by to celebrate you,"
    ]
  },
  {
    id: "feel-lonely",
    slug: "open-when-you-feel-lonely",
    title: "Open When You Feel Lonely",
    subtitle: "When the room feels empty even in a crowded world.",
    envelopeColor: "from-purple-950 via-slate-950 to-emerald-950",
    waxSealIcon: "🕊️",
    quote: "To be solitary is not to be abandoned; it is space to hear your own rhythm.",
    readTime: "3 min read",
    dateTag: "Surrounded by Love",
    content: [
      "Dearest Akriti,",
      "Loneliness can strike in the strangest places—in a crowded lecture hall, in a quiet bedroom, or while scrolling through endless glowing screens. It whispers that no one truly understands or sees the real you.",
      "I built this entire website—every line of code, every star in the sky, every floating petal—to prove to you that you are seen, remembered, and treasured down to the finest detail.",
      "Someone spent hours thinking about the cadence of your laugh, the tilt of your smile, the brilliance of your dreams, and the quiet grace you bring into the world. You are deeply anchored in human hearts. You matter far more than you realize.",
      "Put your hand over your heart. Feel that rhythm? That is life, that is purpose, and that is a heart that will always have an entire universe backing it up.",
      "With steadfast devotion,"
    ]
  },
  {
    id: "need-a-smile",
    slug: "open-when-you-need-a-smile",
    title: "Open When You Need a Smile",
    subtitle: "A quick dose of warmth, delight, and contagious laughter.",
    envelopeColor: "from-yellow-950 via-slate-900 to-rose-950",
    waxSealIcon: "🌻",
    quote: "Your smile is the quiet miracle that brightens an entire room without trying.",
    readTime: "2 min read",
    dateTag: "Pure Joy",
    content: [
      "Hey Akriti!",
      "Quick question: Did you know that when you smile, your whole face lights up in a way that should honestly be registered as a renewable energy source?",
      "Think about the silliest thing that made us both burst into uncontrollable laughter until our stomachs ached. Think of that one goofy face, the inside joke that makes zero sense to anybody else in the world, or that clumsy moment where we couldn't stop giggling for twenty straight minutes.",
      "Life is far too short and ridiculous to take so seriously all the time. Let yourself giggle. Smile right now, even just a tiny half-smile. Yes, right there! See? The whole world just got a little lighter.",
      "Keep that smile on your face today—it looks stunning on you.",
      "Smiling right back at you,"
    ]
  },
  {
    id: "remember-how-special-you-are",
    slug: "open-when-you-want-to-remember-how-special-you-are",
    title: "Open When You Want to Remember How Special You Are",
    subtitle: "A sacred mirror reflecting the extraordinary soul named Akriti.",
    envelopeColor: "from-fuchsia-950 via-slate-900 to-amber-950",
    waxSealIcon: "👑",
    quote: "You were not made to blend into the scenery; you were crafted as the centerpiece.",
    readTime: "4 min read",
    dateTag: "Golden Truth",
    content: [
      "Akriti Singh,",
      "If you ever need an objective, unvarnished reminder of who you are, read this slowly and absorb every syllable:",
      "You are a rare combination of razor-sharp intellect, effortless poise, and genuine kindness. In a world full of imitations and trends, you possess a quiet authenticity that draws people in without a single trace of arrogance.",
      "You have an instinct for understanding what people leave unsaid. You carry your dreams with quiet ambition. You look breathtaking in ivory and gold, and your dark eyes hold both fierce determination and endless softness.",
      "At 19, you are already a masterwork in motion. Out of billions of people across thousands of generations on this floating blue planet, there has never been, and will never be, another Akriti Singh.",
      "This universe is lucky to hold you. Never forget your own magic.",
      "Forever celebrating you,"
    ]
  }
];
