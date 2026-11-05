import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Gift, Sparkles, FastForward } from 'lucide-react';
import { playChime, playHeartbeatSound } from '../../services/soundEffects';

interface LetterScreenProps {
  onNextSurprise: () => void;
}

export const LetterScreen: React.FC<LetterScreenProps> = ({ onNextSurprise }) => {
  const paragraphs = [
    { text: "Happy Birthday En Ammu ❤️", highlight: true, font: "font-cinzel text-xl sm:text-2xl text-white font-bold" },
    { text: "Un life-la innaiku mattum illa, every day-um nee happy-ah irukkanum.", highlight: false },
    { text: "Un smile eppovume ipdiye irukkanum.\nUn dreams ellame nijam aaganum.\nUnakku pidicha ellame unakku kidaikkanum.", highlight: false },
    { text: "Naan un pakkathula physically illa naalum, en love eppovume un kooda dhaan irukkum.", highlight: true, italic: true },
    { text: "Namakkulla irukkura memories, chinna chinna sandhoshangal, kovangal, teasing, caring ellame enakku romba special.", highlight: false },
    { text: "Almost 4 years aagapoguthu...\nInnum neraya birthdays, neraya memories, neraya happy moments namma serndhu create pannanum.", highlight: false },
    { text: "I LOVE YOU SO MUCH AMMU ❤️", highlight: true, font: "font-cinzel text-lg sm:text-xl text-[#FF4B6E] font-bold tracking-wider" },
    { text: "Forever un kooda...", highlight: true, font: "font-handwriting text-2xl text-[#FFB6C8]" },
  ];

  const [visibleCount, setVisibleCount] = useState(1);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (visibleCount < paragraphs.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
        if (visibleCount === 3 || visibleCount === 6) {
          playHeartbeatSound();
        }
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setIsDone(true);
    }
  }, [visibleCount, paragraphs.length]);

  const handleRevealAll = () => {
    setVisibleCount(paragraphs.length);
    setIsDone(true);
    playChime();
  };

  const handleNext = () => {
    playChime();
    onNextSurprise();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 sm:px-6 pt-10 pb-24 overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#B50935]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[#30000D]/40 blur-3xl pointer-events-none" />

      {/* Screen Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 text-center space-y-1 mb-4"
      >
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#D9A0A8]">
          Chapter 02 · Straight From The Heart
        </span>
        <h2 className="font-cinzel text-2xl sm:text-3xl text-white font-bold tracking-wide">
          My Love Letter
        </h2>
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#FFB6C8]/80 font-romantic italic">
          <Sparkles className="w-3.5 h-3.5 text-[#FF2E5B]" />
          <span>Every word meant just for you</span>
        </div>
      </motion.div>

      {/* Premium Handwritten Dark Red Glass Card */}
      <div className="relative z-20 w-full max-w-lg mx-auto rounded-3xl p-5 sm:p-7 glass-crimson shadow-2xl border border-[#D9A0A8]/30 overflow-hidden my-auto">
        {/* Subtle decorative stamp in corner */}
        <div className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full border border-[#D9A0A8]/40 bg-[#30000D]/60 text-[10px] text-[#FFB6C8] font-cinzel">
          4 YRS
        </div>

        {/* Skip Animation helper button */}
        {!isDone && (
          <button
            onClick={handleRevealAll}
            className="absolute top-4 left-4 flex items-center gap-1 text-[11px] text-[#D9A0A8]/80 hover:text-white px-2 py-1 rounded-md bg-black/30 border border-white/10"
          >
            <FastForward className="w-3 h-3" />
            <span>Read All</span>
          </button>
        )}

        {/* Letter Text Content */}
        <div className="space-y-4 pt-8 pb-3 text-left">
          {paragraphs.slice(0, visibleCount).map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <p
                className={`whitespace-pre-line leading-relaxed ${
                  p.font
                    ? p.font
                    : 'font-romantic text-base sm:text-lg text-[#FFEBEF]'
                } ${p.italic ? 'italic text-[#FFD9E2]' : ''}`}
              >
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Small Glowing Heart at the Bottom */}
        <div className="pt-4 mt-4 border-t border-[#D9A0A8]/20 flex flex-col items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="cursor-pointer"
            onClick={() => playHeartbeatSound()}
          >
            <Heart className="w-7 h-7 fill-[#FF2E5B] text-[#FF2E5B] drop-shadow-[0_0_12px_rgba(255,46,91,0.9)]" />
          </motion.div>
          <span className="text-[11px] text-[#D9A0A8]/70 mt-1 font-romantic italic">
            Forever yours
          </span>
        </div>
      </div>

      {/* Action CTA Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visibleCount >= 4 ? 1 : 0.4 }}
        className="relative z-20 w-full max-w-sm mt-5"
      >
        <button
          onClick={handleNext}
          className="w-full py-4 px-6 rounded-2xl font-cinzel text-sm sm:text-base font-bold text-white tracking-wider flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 glow-crimson bg-gradient-to-r from-[#B50935] via-[#D9043C] to-[#B50935] shadow-xl border border-white/20"
        >
          <Gift className="w-5 h-5 text-white" />
          <span>ONE MORE SURPRISE? 💝</span>
        </button>
      </motion.div>
    </div>
  );
};
