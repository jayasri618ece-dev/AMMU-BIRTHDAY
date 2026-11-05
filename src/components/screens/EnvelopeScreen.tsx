import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, MailOpen, ArrowRight } from 'lucide-react';
import { playChime, playHeartbeatSound } from '../../services/soundEffects';

interface EnvelopeScreenProps {
  onOpenLetter: () => void;
}

export const EnvelopeScreen: React.FC<EnvelopeScreenProps> = ({ onOpenLetter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      playHeartbeatSound();
      playChime();
      if (navigator.vibrate) navigator.vibrate([50, 50, 100]);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-5 pt-12 pb-24 text-center overflow-x-hidden">
      {/* Background glow & blur effect when open */}
      <div
        className={`absolute inset-0 transition-all duration-700 pointer-events-none ${
          isOpen ? 'backdrop-blur-md bg-black/40' : ''
        }`}
      />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#B50935]/15 blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 space-y-1 max-w-sm mt-4"
      >
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#D9A0A8]">
          Chapter 01 · A Secret For You
        </span>
        <h2 className="font-cinzel text-2xl sm:text-3xl text-white font-bold tracking-wide">
          Secret Envelope
        </h2>
        <p className="font-romantic text-sm text-[#FFB6C8] italic">
          &ldquo;Open pannitu paaru Ammu...&rdquo;
        </p>
      </motion.div>

      {/* 3D Realistic Envelope Container */}
      <div className="relative z-20 my-auto w-full max-w-xs sm:max-w-sm perspective-1000 flex flex-col items-center">
        <div
          onClick={handleEnvelopeClick}
          className="relative w-72 sm:w-80 h-48 sm:h-52 cursor-pointer transition-transform duration-500 hover:scale-[1.02] active:scale-[0.98]"
        >
          {/* Glowing Shadow under envelope */}
          <div className="absolute inset-x-4 -bottom-4 h-8 bg-[#B50935]/40 rounded-full blur-xl" />

          {/* Envelope Body (Backplate) */}
          <div className="absolute inset-0 rounded-2xl bg-[#25000A] border border-[#D9A0A8]/30 shadow-2xl overflow-hidden" />

          {/* Glowing Letter Sheet (Slides UP when open) */}
          <motion.div
            initial={false}
            animate={
              isOpen
                ? { y: -110, scale: 1, opacity: 1 }
                : { y: 0, scale: 0.95, opacity: 0.8 }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-4 top-3 h-44 rounded-xl bg-gradient-to-b from-[#FFF5F7] to-[#FFE6EC] text-[#30000D] p-4 shadow-2xl border border-[#D9A0A8] flex flex-col items-center justify-between text-center select-none"
          >
            <div className="flex items-center gap-1.5 text-xs text-[#B50935] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A Personal Note</span>
            </div>

            <p className="font-romantic text-sm sm:text-base text-[#30000D] font-medium leading-relaxed italic px-1">
              &ldquo;Unakku solla neraya irukku... Aana indha chinna surprise-la start panren.&rdquo;
            </p>

            <div className="flex items-center gap-1 text-[11px] text-[#B50935] font-semibold">
              <Heart className="w-3.5 h-3.5 fill-[#B50935]" />
              <span>En Ammu-kaga</span>
            </div>
          </motion.div>

          {/* Envelope Front Left & Right Folds */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Left Triangle */}
            <div
              className="absolute left-0 bottom-0 top-0 w-1/2 bg-[#36000F] border-l border-[#D9A0A8]/20"
              style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
            />
            {/* Right Triangle */}
            <div
              className="absolute right-0 bottom-0 top-0 w-1/2 bg-[#30000D] border-r border-[#D9A0A8]/20"
              style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
            />
            {/* Bottom Triangle */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/2 bg-[#420114] border-b border-[#D9A0A8]/30 rounded-b-2xl shadow-inner"
              style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
            />
          </div>

          {/* Envelope Top Flap (Flips open 180 degrees) */}
          <motion.div
            initial={false}
            animate={{ rotateX: isOpen ? 180 : 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top center' }}
            className="absolute inset-x-0 top-0 h-1/2 z-20 pointer-events-none"
          >
            <div
              className="w-full h-full bg-[#4A0216] border-t border-[#D9A0A8]/40 shadow-md"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            />
          </motion.div>

          {/* Wax Seal Badge (Centers on closed envelope, fades when open) */}
          <motion.div
            animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.5 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#FF2E5B] to-[#990022] shadow-[0_0_15px_rgba(255,46,91,0.8)] border border-[#FFD9E2] text-white"
          >
            <Heart className="w-6 h-6 fill-white" />
          </motion.div>
        </div>

        {/* Envelope Label */}
        <p className="font-cinzel text-sm text-[#FFB6C8] font-semibold mt-4 tracking-wider flex items-center justify-center gap-1.5">
          <span>To My Favourite Person</span>
          <Heart className="w-3.5 h-3.5 fill-[#FF2E5B] text-[#FF2E5B] inline" />
        </p>

        {!isOpen && (
          <p className="text-xs text-[#D9A0A8]/70 mt-1 animate-pulse">
            👆 Tap envelope to unseal
          </p>
        )}
      </div>

      {/* Bottom Button Action */}
      <div className="relative z-20 w-full max-w-xs space-y-2 mt-4">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => {
                  playChime();
                  onOpenLetter();
                }}
                className="w-full py-3.5 px-6 rounded-2xl font-cinzel text-sm font-bold text-white tracking-wider flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 glow-crimson bg-gradient-to-r from-[#B50935] via-[#E61952] to-[#B50935] shadow-xl border border-white/20"
              >
                <MailOpen className="w-4 h-4" />
                <span>READ MY LETTER</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
