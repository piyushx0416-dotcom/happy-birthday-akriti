// types/ayaSettings.ts
// Comprehensive settings schema matching reference https://aya-sigma-six.vercel.app/

export interface BookPageConfig {
  id: number;
  leftImage: string;
  rightImage: string;
  message: string;
}

export type ColorTheme = "pink" | "blue" | "purple" | "custom";

export interface AyaSettings {
  music: string;
  countdown: number; // 3, 5, 10
  matrixText: string;
  colorTheme: ColorTheme;
  matrixColor1: string;
  matrixColor2: string;
  sequence: string; // "HAPPY|BIRTHDAY|AKRITI|MY|WHOLE|UNIVERSE|❤"
  sequenceColor: string;
  gift: string; // "./image/happy3.gif"
  enableBook: boolean;
  enableHeart: boolean;
  pages: BookPageConfig[];
}

export const DEFAULT_AYA_SETTINGS: AyaSettings = {
  music: "one-of-the-girls", // or "music.mp3"
  countdown: 3,
  matrixText: "HAPPYBIRTHDAYAKRITI",
  colorTheme: "pink",
  matrixColor1: "#ff69b4",
  matrixColor2: "#ff1493",
  sequence: "HAPPY|BIRTHDAY|AKRITI|MY|WHOLE|UNIVERSE|❤",
  sequenceColor: "#ff69b4",
  gift: "/assets/aya/happy3.gif",
  enableBook: true,
  enableHeart: true,
  pages: [
    {
      id: 1,
      leftImage: "/assets/akriti/photo-01.jpg",
      rightImage: "/assets/akriti/photo-02.jpg",
      message: "Happy birthday my love 🤎",
    },
    {
      id: 2,
      leftImage: "/assets/akriti/photo-03.jpg",
      rightImage: "/assets/akriti/photo-04.jpg",
      message: "As long as you’re smiling, I’m happy. Stay happy, my love.",
    },
    {
      id: 3,
      leftImage: "/assets/akriti/photo-05.jpg",
      rightImage: "/assets/aya/theend.jpg",
      message: "In every universe, across every star, I would still choose yours. Happy 19th Birthday, Akriti! ❤️",
    },
  ],
};

export const COLOR_THEMES = {
  pink: {
    name: "Sweet Pink",
    matrixColor1: "#ff69b4",
    matrixColor2: "#ff1493",
    sequenceColor: "#ff69b4",
  },
  blue: {
    name: "Ocean Blue",
    matrixColor1: "#00bfff",
    matrixColor2: "#1e90ff",
    sequenceColor: "#00bfff",
  },
  purple: {
    name: "Dreamy Purple",
    matrixColor1: "#da70d6",
    matrixColor2: "#ba55d3",
    sequenceColor: "#da70d6",
  },
};
