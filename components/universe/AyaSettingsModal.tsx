"use client";

import React, { useState, useEffect } from "react";
import {
  AyaSettings,
  ColorTheme,
  COLOR_THEMES,
  BookPageConfig,
} from "@/types/ayaSettings";
import {
  X,
  Music,
  Clock,
  CloudRain,
  Sparkles,
  Gift,
  BookOpen,
  Heart,
  Play,
  Square,
  Check,
  RotateCcw,
} from "lucide-react";

interface AyaSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AyaSettings;
  onApply: (newSettings: AyaSettings) => void;
}

export default function AyaSettingsModal({
  isOpen,
  onClose,
  settings: initialSettings,
  onApply,
}: AyaSettingsModalProps) {
  const [form, setForm] = useState<AyaSettings>(initialSettings);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setForm(initialSettings);
  }, [initialSettings, isOpen]);

  // Handle music preview
  const handleTogglePreview = () => {
    if (isPreviewPlaying && previewAudio) {
      previewAudio.pause();
      setIsPreviewPlaying(false);
      return;
    }

    const src =
      form.music === "reference-music"
        ? "/assets/aya/music.mp3"
        : "/music/one-of-the-girls.mp3";

    const audio = new Audio(src);
    audio.volume = 0.5;
    audio.onended = () => setIsPreviewPlaying(false);
    audio.play().catch(() => {});
    setPreviewAudio(audio);
    setIsPreviewPlaying(true);
  };

  const handleStopPreview = () => {
    if (previewAudio) {
      previewAudio.pause();
      setIsPreviewPlaying(false);
    }
  };

  const handleThemeSelect = (theme: ColorTheme) => {
    if (theme === "custom") {
      setForm((prev) => ({ ...prev, colorTheme: "custom" }));
    } else {
      const t = COLOR_THEMES[theme];
      setForm((prev) => ({
        ...prev,
        colorTheme: theme,
        matrixColor1: t.matrixColor1,
        matrixColor2: t.matrixColor2,
        sequenceColor: t.sequenceColor,
      }));
    }
  };

  const handleSave = () => {
    handleStopPreview();
    onApply(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={() => {
        handleStopPreview();
        onClose();
      }}
      className="fixed inset-0 z-[10002] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl max-h-[90vh] bg-[#12121A] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#F8F1E8]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            <h2 className="font-serif text-lg sm:text-xl font-medium tracking-wide text-white">
              Website Settings // Cài Đặt
            </h2>
          </div>
          <button
            onClick={() => {
              handleStopPreview();
              onClose();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable Settings */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 text-sm">
          {/* Section 1: Audio Settings */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-[#FF9FCB] font-mono text-xs uppercase tracking-wider font-semibold">
              <Music className="w-4 h-4 text-[#FF3D91]" />
              <span>1. Background Audio</span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <select
                value={form.music}
                onChange={(e) => setForm({ ...form, music: e.target.value })}
                className="flex-1 px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white text-xs font-mono focus:border-[#FF3D91] outline-none"
              >
                <option value="one-of-the-girls">One of the Girls (The Weeknd, Jennie, Lily-Rose Depp)</option>
                <option value="reference-music">Reference Birthday Melodies (Original)</option>
              </select>

              <button
                type="button"
                onClick={handleTogglePreview}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-[#FF3D91]/40 bg-[#FF3D91]/15 text-[#FF9FCB] text-xs font-mono hover:bg-[#FF3D91]/25 transition-all"
              >
                {isPreviewPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPreviewPlaying ? "Stop" : "Preview"}</span>
              </button>
            </div>
          </div>

          {/* Section 2: Countdown Timer Settings */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-[#E8C994] font-mono text-xs uppercase tracking-wider font-semibold">
              <Clock className="w-4 h-4 text-[#E8C994]" />
              <span>2. Countdown Duration</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[3, 5, 10].map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setForm({ ...form, countdown: sec })}
                  className={`py-2 px-3 rounded-lg text-xs font-mono transition-all border ${
                    form.countdown === sec
                      ? "bg-[#E8C994] text-black font-bold border-[#E8C994] shadow-[0_0_15px_rgba(232,201,148,0.4)]"
                      : "bg-black/40 text-white/70 border-white/10 hover:border-white/30"
                  }`}
                >
                  {sec} Seconds
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Matrix Rain Settings */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-[#FF9FCB] font-mono text-xs uppercase tracking-wider font-semibold">
              <CloudRain className="w-4 h-4 text-[#FF3D91]" />
              <span>3. Matrix Falling Characters & Themes</span>
            </div>
            <div>
              <label className="text-xs text-white/60 mb-1 block">Matrix Character Set:</label>
              <input
                type="text"
                value={form.matrixText}
                onChange={(e) => setForm({ ...form, matrixText: e.target.value.toUpperCase() })}
                placeholder="HAPPYBIRTHDAYAKRITI"
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white text-xs font-mono uppercase tracking-wider focus:border-[#FF3D91] outline-none"
              />
            </div>

            {/* Color Theme Selector */}
            <div>
              <label className="text-xs text-white/60 mb-1.5 block">Color Theme:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(["pink", "blue", "purple", "custom"] as ColorTheme[]).map((thm) => (
                  <button
                    key={thm}
                    type="button"
                    onClick={() => handleThemeSelect(thm)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-mono capitalize transition-all ${
                      form.colorTheme === thm
                        ? "border-[#FF3D91] bg-[#FF3D91]/20 text-white"
                        : "border-white/10 bg-black/30 text-white/60 hover:text-white"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                      style={{
                        backgroundColor:
                          thm === "pink"
                            ? "#ff69b4"
                            : thm === "blue"
                            ? "#00bfff"
                            : thm === "purple"
                            ? "#da70d6"
                            : form.matrixColor1,
                      }}
                    />
                    <span className="truncate">{thm}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Colors Section */}
            {form.colorTheme === "custom" && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[11px] text-white/60 block mb-1">Matrix Color 1:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.matrixColor1}
                      onChange={(e) => setForm({ ...form, matrixColor1: e.target.value })}
                      className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-xs text-white/70">{form.matrixColor1}</span>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-white/60 block mb-1">Matrix Color 2:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.matrixColor2}
                      onChange={(e) => setForm({ ...form, matrixColor2: e.target.value })}
                      className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-xs text-white/70">{form.matrixColor2}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Main Sequence Text */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#FF9FCB] font-mono text-xs uppercase tracking-wider font-semibold">
                <Sparkles className="w-4 h-4 text-[#FF3D91]" />
                <span>4. Main Animated Typography</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50">Dot Color:</span>
                <input
                  type="color"
                  value={form.sequenceColor}
                  onChange={(e) => setForm({ ...form, sequenceColor: e.target.value })}
                  className="w-6 h-6 rounded border-none cursor-pointer bg-transparent"
                />
              </div>
            </div>
            <div>
              <p className="text-[11px] text-white/50 mb-1">
                Separate words with <span className="text-[#FF9FCB] font-mono font-bold">|</span> to form the sequence:
              </p>
              <textarea
                rows={2}
                value={form.sequence}
                onChange={(e) => setForm({ ...form, sequence: e.target.value.toUpperCase() })}
                placeholder="HAPPY|BIRTHDAY|AKRITI|MY|WHOLE|UNIVERSE|❤"
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white text-xs font-mono uppercase tracking-wider focus:border-[#FF3D91] outline-none"
              />
            </div>
          </div>

          {/* Section 5: Animated Illustration & Interactive Elements */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-[#FF9FCB] font-mono text-xs uppercase tracking-wider font-semibold">
              <Gift className="w-4 h-4 text-[#FF3D91]" />
              <span>5. Animated Illustration & Visual Features</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/10">
                <span className="text-xs text-white/80 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#E8C994]" />
                  <span>3D Memory Book</span>
                </span>
                <input
                  type="checkbox"
                  checked={form.enableBook}
                  onChange={(e) => setForm({ ...form, enableBook: e.target.checked })}
                  className="w-4 h-4 accent-[#FF3D91] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/10">
                <span className="text-xs text-white/80 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#FF3D91]" />
                  <span>Heart Effects</span>
                </span>
                <input
                  type="checkbox"
                  checked={form.enableHeart}
                  onChange={(e) => setForm({ ...form, enableHeart: e.target.checked })}
                  className="w-4 h-4 accent-[#FF3D91] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer: Action Buttons */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setForm(initialSettings)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-white/60 hover:text-white text-xs font-mono transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF3D91] to-[#FF69B4] hover:from-[#FF1493] hover:to-[#FF3D91] text-white text-xs font-mono font-semibold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(255,61,145,0.5)] hover:scale-105 active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Apply Settings // Áp Dụng</span>
          </button>
        </div>
      </div>
    </div>
  );
}
