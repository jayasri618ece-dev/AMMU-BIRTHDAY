import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Flame, ArrowRight, Wind } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playBlowSound, playFireworkSound, playChime } from '../../services/soundEffects';

interface CakeCelebrationScreenProps {
  onContinue: () => void;
}

export const CakeCelebrationScreen: React.FC<CakeCelebrationScreenProps> = ({ onContinue }) => {
  const [isBlown, setIsBlown] = useState(false);
  const [showGrandMessage, setShowGrandMessage] = useState(false);

  const handleBlowCandles = () => {
    if (isBlown) return;

    setIsBlown(true);
    playBlowSound();
    if (navigator.vibrate) navigator.vibrate([100, 50, 150]);

    // Delay fireworks explosion slightly after blowing candles
    setTimeout(() => {
      playFireworkSound();
      setShowGrandMessage(true);

      // Trigger Grand Fireworks & Confetti
      const duration = 2500;
      const end = Date.now() + duration;

      const interval: NodeJS.Timeout = setInterval(() => {
        if (Date.now() > end) {
          return clearInterval(interval);
        }

        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: {
            x: Math.random(),
            y: Math.random() - 0.2,
          },
          colors: ['#FF2E5B', '#FFD700', '#FFFFFF', '#D9A0A8', '#B50935'],
          disableForReducedMotion: true,
        });
      }, 250);
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-5 pt-12 pb-24 text-center overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 inset-x-0 mx-auto w-80 h-80 rounded-full bg-[#B50935]/25 blur-3xl pointer-events-none" />

      {/* Screen Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 space-y-1 max-w-sm mt-3"
      >
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#D9A0A8]">
          Chapter 06 · The Grand Wish
        </span>
        <h2 className="font-cinzel text-2xl sm:text-3xl text-white font-bold tracking-wide glow-text">
          MAKE A WISH AMMU! 🎂
        </h2>
        <p className="font-romantic text-xs sm:text-sm text-[#FFB6C8] italic">
          {isBlown ? 'Wish made with all my heart ✨' : 'Close your eyes and make a special wish'}
        </p>
      </motion.div>

      {/* Realistic 3D Birthday Cake Stage */}
      <div className="relative z-20 my-auto flex flex-col items-center justify-center">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex flex-col items-center justify-end pb-6 select-none">
          {/* Cake Platform Glow */}
          <div className="absolute inset-x-4 bottom-2 h-10 bg-[#B50935]/40 rounded-full blur-xl" />

          {/* 3 Candles */}
          <div className="flex items-center justify-center gap-5 mb-1 z-30">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center relative">
                {/* Candle Flame (turns off with smoke when blown) */}
                <AnimatePresence>
                  {!isBlown ? (
                    <motion.div
                      key="flame"
                      initial={{ scale: 0 }}
                      animate={{
                        scale: [1, 1.2, 0.95, 1],
                        opacity: [0.9, 1, 0.85, 1],
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        duration: 0.5 + i * 0.15,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-4 h-6 rounded-full bg-gradient-to-t from-[#FF5500] via-[#FFD700] to-white shadow-[0_0_15px_#FFD700] -mb-1"
                    />
                  ) : (
                    /* Smoke animation */
                    <motion.div
                      key="smoke"
                      initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                      animate={{ opacity: 0, y: -25, scale: 1.6 }}
                      transition={{ duration: 1.4, ease: 'easeOut' }}
                      className="w-3 h-5 rounded-full bg-white/40 blur-xs -mb-1"
                    />
                  )}
                </AnimatePresence>

                {/* Candle Wick */}
                <div className="w-0.5 h-1.5 bg-[#4A0012]" />

                {/* Candle Body */}
                <div className="w-2.5 h-10 rounded-t-sm bg-gradient-to-b from-white via-[#FFD4DE] to-[#D9A0A8] shadow-md border-x border-white/40" />
              </div>
            ))}
          </div>

          {/* Top Tier */}
          <div className="relative w-36 h-14 rounded-2xl bg-gradient-to-r from-[#4A0014] via-[#B50935] to-[#36000F] border-t-2 border-[#FFD9E2] shadow-xl flex items-center justify-center z-20">
            <span className="font-cinzel text-xs font-bold text-white tracking-widest">
              AMMU ❤️
            </span>
            {/* Cream drops */}
            <div className="absolute -top-1 inset-x-2 flex justify-between px-1">
              {[...Array(7)].map((_, i) => (
                <span key={i} className="w-2 h-3 rounded-b-full bg-[#FFE6EC] opacity-80" />
              ))}
            </div>
          </div>

          {/* Middle Tier */}
          <div className="relative w-48 h-16 rounded-2xl bg-gradient-to-r from-[#29000C] via-[#520018] to-[#1F0009] border-t-2 border-[#D9A0A8] shadow-2xl flex items-center justify-center -mt-2 z-10">
            <div className="flex items-center gap-2 text-xs text-[#FFB6C8]">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
              <span className="font-cinzel text-xs tracking-wider">FOREVER WITH YOU</span>
              <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
            </div>
          </div>

          {/* Bottom Tier */}
          <div className="relative w-60 h-16 rounded-2xl bg-gradient-to-r from-[#180007] via-[#36000F] to-[#120005] border-t-2 border-[#D9A0A8]/80 shadow-2xl flex items-center justify-center -mt-2">
            <div className="flex items-center gap-1.5 text-xs text-[#D9A0A8]">
              <Heart className="w-3.5 h-3.5 fill-[#FF2E5B] text-[#FF2E5B]" />
              <span className="font-romantic text-xs tracking-wide italic">4 Beautiful Years</span>
              <Heart className="w-3.5 h-3.5 fill-[#FF2E5B] text-[#FF2E5B]" />
            </div>
          </div>

          {/* Serving Plate */}
          <div className="w-64 h-3.5 rounded-full bg-gradient-to-r from-[#D9A0A8]/20 via-[#D9A0A8] to-[#D9A0A8]/20 shadow-xl -mt-1" />
        </div>

        {/* Revealed Birthday Wish Messages */}
        <AnimatePresence>
          {showGrandMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-4 p-4 rounded-2xl glass-crimson border border-[#D9A0A8]/40 shadow-2xl max-w-sm"
            >
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white glow-text">
                &ldquo;May all your wishes come true, Kunjuu paya ❤️&rdquo;
              </h3>
              <p className="font-cinzel text-sm sm:text-base text-[#FF4B6E] font-semibold mt-2 tracking-wider">
                HAPPY BIRTHDAY ONCE AGAIN AMMU!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Button */}
      <div className="relative z-20 w-full max-w-xs space-y-2 mt-4">
        {!isBlown ? (
          <button
            onClick={handleBlowCandles}
            className="w-full py-4 px-6 rounded-2xl font-cinzel text-sm sm:text-base font-bold text-white tracking-wider flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 glow-crimson bg-gradient-to-r from-[#B50935] via-[#E61952] to-[#B50935] shadow-xl border border-white/20 animate-pulse"
          >
            <Wind className="w-5 h-5" />
            <span>BLOW THE CANDLES 🕯️</span>
          </button>
        ) : (
          <button
            onClick={() => {
              playChime();
              onContinue();
            }}
            className="w-full py-4 px-6 rounded-2xl font-cinzel text-sm sm:text-base font-bold text-white tracking-wider flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 glow-crimson bg-gradient-to-r from-[#B50935] via-[#D9043C] to-[#B50935] shadow-xl border border-white/20"
          >
            <span>ONE LAST SECRET... 💫</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
