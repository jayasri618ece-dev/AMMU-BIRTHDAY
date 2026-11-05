import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, RotateCcw, Smile, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playChime, playFireworkSound, playHugSound } from '../../services/soundEffects';

interface GrandEndingScreenProps {
  onReplay: () => void;
}

export const GrandEndingScreen: React.FC<GrandEndingScreenProps> = ({ onReplay }) => {
  const [showHugModal, setShowHugModal] = useState(false);

  useEffect(() => {
    // Grand celebration fireworks burst
    playFireworkSound();
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#B50935', '#FF4B6E', '#FFD700', '#D9A0A8', '#FFFFFF'],
      disableForReducedMotion: true,
    });
  }, []);

  const handleHugClick = () => {
    playHugSound();
    setShowHugModal(true);
    if (navigator.vibrate) navigator.vibrate([100, 100, 200, 100]);

    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.4 },
      colors: ['#FF2E5B', '#FFB6C8', '#FFFFFF'],
      disableForReducedMotion: true,
    });
  };

  const handleReplayClick = () => {
    playChime();
    onReplay();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-5 pt-10 pb-24 text-center overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 inset-x-0 mx-auto w-96 h-96 rounded-full bg-radial from-[#B50935]/30 via-[#30000D]/20 to-transparent blur-3xl pointer-events-none" />

      {/* Screen Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 space-y-1 max-w-sm mt-3"
      >
        <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#D9A0A8]">
          The Grand Finale · Forever & Always
        </span>
      </motion.div>

      {/* Central Visual Showcase: Huge Heart + Infinity Animation */}
      <div className="relative z-20 my-auto flex flex-col items-center max-w-md w-full space-y-5">
        {/* Huge glowing heart with infinity symbol */}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex items-center justify-center cursor-pointer"
          onClick={() => playHugSound()}
        >
          {/* Pulsing outer aura */}
          <div className="absolute inset-0 bg-[#B50935]/40 rounded-full blur-3xl animate-pulse" />
          
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-[#450113] via-[#B50935] to-[#1F0008] border-2 border-[#FFD9E2]/50 shadow-[0_0_50px_rgba(181,9,53,0.8)]">
            <Heart className="w-16 h-16 sm:w-20 sm:h-20 fill-white text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
            
            {/* Infinity Symbol overlay */}
            <div className="text-xl sm:text-2xl font-bold text-[#FFD9E2] -mt-3 drop-shadow-md">
              ♾️
            </div>
          </div>
        </motion.div>

        {/* Display Text Content */}
        <div className="space-y-4">
          <div>
            <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white tracking-wider glow-text">
              HAPPY BIRTHDAY
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6E] via-[#FFD9E2] to-[#FF2E5B]">
                MY AMMU ❤️
              </span>
            </h1>
          </div>

          {/* 4 Years Down... Forever To Go ♾️ */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-crimson border border-[#D9A0A8]/40 shadow-lg">
            <span className="font-cinzel text-xs sm:text-sm font-bold text-white tracking-wider">
              4 Years Down...
            </span>
            <span className="text-[#D9A0A8]">·</span>
            <span className="font-cinzel text-xs sm:text-sm font-bold text-[#FFB6C8] tracking-wider">
              Forever To Go ♾️
            </span>
          </div>

          {/* Emotional Poem / Reflection */}
          <div className="p-4 rounded-2xl glass-wine border border-[#D9A0A8]/20 space-y-2 max-w-sm mx-auto shadow-xl">
            <p className="font-romantic text-sm sm:text-base text-white italic leading-relaxed">
              &ldquo;Today I may not be beside you...<br />
              But my heart is always with you.&rdquo;
            </p>
            <p className="font-romantic text-xs sm:text-sm text-[#FFB6C8] italic">
              &ldquo;Unakku indha chinna surprise pidichirukkum nu namburen.&rdquo;
            </p>
            <div className="pt-2 border-t border-white/10">
              <p className="font-cinzel text-xs sm:text-sm font-bold text-[#FF4B6E] tracking-widest uppercase">
                I LOVE YOU FOREVER AMMU ❤️
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Functional Action Buttons */}
      <div className="relative z-20 w-full max-w-xs space-y-3 mt-4">
        <button
          onClick={handleHugClick}
          className="w-full py-4 px-6 rounded-2xl font-cinzel text-sm sm:text-base font-bold text-white tracking-wider flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 glow-crimson bg-gradient-to-r from-[#B50935] via-[#E61952] to-[#B50935] shadow-xl border border-white/20"
        >
          <Smile className="w-5 h-5 text-white" />
          <span>ONE MORE HUG 🤗</span>
        </button>

        <button
          onClick={handleReplayClick}
          className="w-full py-3.5 px-6 rounded-2xl font-cinzel text-xs sm:text-sm font-semibold text-[#FFB6C8] tracking-wider flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 glass-wine hover:bg-[#30000D] border border-[#D9A0A8]/30 shadow-md"
        >
          <RotateCcw className="w-4 h-4 text-[#D9A0A8]" />
          <span>PLAY OUR SURPRISE AGAIN ❤️</span>
        </button>
      </div>

      {/* Full Screen Animated Heart Hug Modal */}
      <AnimatePresence>
        {showHugModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
            onClick={() => setShowHugModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 30 }}
              transition={{ type: 'spring', damping: 20, stiffness: 250 }}
              className="relative w-full max-w-sm rounded-3xl p-7 text-center glass-crimson shadow-2xl border border-[#FFD9E2]/40"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowHugModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-[#D9A0A8] hover:text-white bg-black/40"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Giant Hug Icon Animation */}
              <div className="relative mx-auto mb-5 w-24 h-24 rounded-full bg-gradient-to-br from-[#FF2E5B] to-[#990022] flex items-center justify-center shadow-[0_0_35px_rgba(255,46,91,0.9)] border border-white/30">
                <motion.div
                  animate={{ scale: [1, 1.25, 1], rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center justify-center"
                >
                  <span className="text-4xl">🤗</span>
                </motion.div>
              </div>

              {/* Message */}
              <div className="space-y-3 mb-6">
                <h3 className="font-cinzel text-xl text-white font-bold glow-text">
                  A Big Warm Hug!
                </h3>
                <p className="font-romantic text-base sm:text-lg text-[#FFE4E8] italic leading-relaxed">
                  &ldquo;Sending you the biggest hug from here! 🤗❤️&rdquo;
                </p>
                <p className="text-xs text-[#D9A0A8]/80">
                  Feel my warmth and love wrapping around you wherever you are.
                </p>
              </div>

              <button
                onClick={() => setShowHugModal(false)}
                className="w-full py-3 px-6 rounded-2xl font-cinzel text-xs font-bold text-white tracking-wider glow-crimson bg-[#B50935] hover:bg-[#D9043C] active:scale-95 transition-all"
              >
                HELD CLOSE IN MY HEART ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
