import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { playHeartbeatSound, playChime } from '../../services/soundEffects';

interface SecretHeartScreenProps {
  onContinue: () => void;
}

export const SecretHeartScreen: React.FC<SecretHeartScreenProps> = ({ onContinue }) => {
  const [isTouched, setIsTouched] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const secretMessages = [
    "Nee enakku romba special...",
    "Distance namma separate pannalaam...",
    "Aana en heart-la unakku eppovume special place irukku...",
    "Unna romba romba love panren Ammu ❤️",
  ];

  const handleTouchHeart = () => {
    if (!isTouched) {
      setIsTouched(true);
      playHeartbeatSound();
      playChime();
      if (navigator.vibrate) navigator.vibrate([40, 80, 120]);

      // Message sequencing
      setTimeout(() => setMessageIndex(1), 2200);
      setTimeout(() => setMessageIndex(2), 4400);
      setTimeout(() => setMessageIndex(3), 6600);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-5 pt-12 pb-24 text-center overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-[#B50935]/20 via-[#1A030A]/60 to-[#080507] pointer-events-none" />

      {/* Screen Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 space-y-1 max-w-sm mt-3"
      >
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#D9A0A8]">
          Chapter 07 · Heart to Heart
        </span>
        <h2 className="font-cinzel text-2xl sm:text-3xl text-white font-bold tracking-wide">
          One last thing...
        </h2>
        <p className="font-romantic text-xs sm:text-sm text-[#FFB6C8] italic">
          {!isTouched ? 'Touch the heart ❤️' : 'Listen with your heart'}
        </p>
      </motion.div>

      {/* Large Glowing Heart & Floating Messages */}
      <div className="relative z-20 my-auto flex flex-col items-center justify-center max-w-md w-full">
        {/* Animated Glowing Heart */}
        <motion.div
          animate={
            isTouched
              ? { scale: [1, 1.25, 1.15], filter: 'drop-shadow(0 0 35px rgba(255,46,91,1))' }
              : { scale: [1, 1.1, 1], filter: 'drop-shadow(0 0 20px rgba(181,9,53,0.7))' }
          }
          transition={{
            duration: isTouched ? 2 : 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          onClick={handleTouchHeart}
          className="relative cursor-pointer select-none mb-8"
        >
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center bg-gradient-to-br from-[#30000D] via-[#B50935] to-[#140207] border-2 border-[#FFB6C8]/40 shadow-2xl">
            <Heart className="w-20 h-20 sm:w-24 sm:h-24 fill-[#FF2E5B] text-white" />
          </div>

          {!isTouched && (
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -bottom-3 inset-x-0 flex items-center justify-center"
            >
              <span className="px-3 py-1 rounded-full bg-black/80 border border-[#D9A0A8]/40 text-[11px] text-[#FFB6C8] font-cinzel tracking-wider">
                TOUCH ME
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Cinematic Message Sequence */}
        <div className="min-h-[110px] flex items-center justify-center px-4">
          <AnimatePresence mode="wait">
            {isTouched && (
              <motion.div
                key={messageIndex}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 1.05 }}
                transition={{ duration: 0.8 }}
                className="p-5 rounded-2xl glass-crimson border border-[#D9A0A8]/30 shadow-2xl max-w-sm"
              >
                <p className="font-romantic text-base sm:text-lg text-white italic leading-relaxed">
                  &ldquo;{secretMessages[messageIndex]}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-1 mt-2 text-xs text-[#FFB6C8]">
                  <Sparkles className="w-3 h-3 text-[#FFD700]" />
                  <span className="font-cinzel text-[10px] tracking-widest">
                    {messageIndex + 1} OF {secretMessages.length}
                  </span>
                  <Sparkles className="w-3 h-3 text-[#FFD700]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Button below */}
      <div className="relative z-20 w-full max-w-xs space-y-2 mt-4">
        <button
          onClick={() => {
            if (!isTouched) {
              handleTouchHeart();
            } else {
              playChime();
              onContinue();
            }
          }}
          className="w-full py-4 px-6 rounded-2xl font-cinzel text-sm sm:text-base font-bold text-white tracking-wider flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 glow-crimson bg-gradient-to-r from-[#B50935] via-[#D9043C] to-[#B50935] shadow-xl border border-white/20"
        >
          <span>{isTouched ? 'GRAND FINALE ✨' : 'TOUCH THE HEART ❤️'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
