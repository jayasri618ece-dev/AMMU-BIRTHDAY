import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ArrowRight, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playChime, playFireworkSound } from '../../services/soundEffects';

interface GiftBoxScreenProps {
  onContinue: () => void;
}

export const GiftBoxScreen: React.FC<GiftBoxScreenProps> = ({ onContinue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleOpenGift = () => {
    if (!isOpen) {
      setIsOpen(true);
      playFireworkSound();
      playChime();
      if (navigator.vibrate) navigator.vibrate([60, 40, 100]);

      // Confetti burst from gift
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF2E5B', '#D9A0A8', '#FFD700', '#FFFFFF'],
        disableForReducedMotion: true,
      });

      setTimeout(() => {
        setShowModal(true);
      }, 700);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-5 pt-12 pb-24 text-center overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 inset-x-0 mx-auto w-72 h-72 rounded-full bg-[#B50935]/20 blur-3xl pointer-events-none" />

      {/* Screen Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 space-y-1 max-w-sm mt-3"
      >
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#D9A0A8]">
          Chapter 03 · Special Unboxing
        </span>
        <h2 className="font-cinzel text-2xl sm:text-3xl text-white font-bold tracking-wide">
          A Gift For Ammu
        </h2>
        <p className="font-romantic text-sm text-[#FFB6C8] italic">
          &ldquo;Unakkaga oru special gift...&rdquo;
        </p>
      </motion.div>

      {/* 3D Realistic Gift Box */}
      <div className="relative z-20 my-auto flex flex-col items-center">
        <div
          onClick={handleOpenGift}
          className="relative w-52 h-52 sm:w-56 sm:h-56 cursor-pointer select-none group perspective-1000"
        >
          {/* Shadow underneath */}
          <div className="absolute inset-x-4 -bottom-4 h-8 bg-[#B50935]/50 rounded-full blur-xl group-hover:scale-105 transition-transform" />

          {/* Glowing hearts bursting out when open */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.2, y: 0 }}
                animate={{ opacity: 1, scale: 1.4, y: -80 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute inset-x-0 -top-8 flex flex-col items-center z-40 pointer-events-none"
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#FF2E5B] rounded-full blur-xl opacity-60 animate-ping" />
                  <Heart className="w-16 h-16 fill-[#FF2E5B] text-white drop-shadow-[0_0_20px_rgba(255,46,91,1)]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gift Box Lid (Pops UP and rotates when open) */}
          <motion.div
            initial={false}
            animate={
              isOpen
                ? { y: -70, rotateZ: -12, scale: 1.05 }
                : { y: 0, rotateZ: 0, scale: 1 }
            }
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-2 inset-x-2 h-14 rounded-2xl bg-gradient-to-r from-[#4A0012] via-[#B50935] to-[#30000D] border-t-2 border-[#FFD9E2] shadow-2xl z-20 flex items-center justify-center"
          >
            {/* Horizontal ribbon on lid */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 bg-gradient-to-r from-[#D9A0A8] via-[#FFE4E8] to-[#D9A0A8] shadow-sm" />
            {/* Vertical ribbon on lid */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-b from-[#FFE4E8] to-[#D9A0A8] shadow-md z-10" />

            {/* Glowing 3D Ribbon Bow on top */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D9A0A8] to-[#FFFFFF] rotate-45 -mr-2 shadow-md border border-[#FFB6C8]" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-tl from-[#D9A0A8] to-[#FFFFFF] -rotate-45 -ml-2 shadow-md border border-[#FFB6C8]" />
                <div className="absolute w-4 h-4 rounded-full bg-[#FF2E5B] shadow-sm z-10" />
              </div>
            </motion.div>
          </motion.div>

          {/* Gift Box Body */}
          <div className="absolute top-14 inset-x-4 bottom-2 rounded-2xl bg-gradient-to-b from-[#2B000B] via-[#480014] to-[#1A030A] border border-[#D9A0A8]/30 shadow-2xl overflow-hidden z-10">
            {/* Vertical ribbon on box */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-b from-[#FFE4E8] via-[#D9A0A8] to-[#B50935] shadow-md" />
            {/* Horizontal ribbon on box */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 bg-gradient-to-r from-[#D9A0A8] via-[#FFE4E8] to-[#D9A0A8] opacity-80" />

            {/* Inner glow shine */}
            <div className="absolute inset-0 bg-radial from-white/10 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Caption */}
        <p className="font-cinzel text-sm text-[#FFB6C8] font-semibold mt-4 tracking-wider">
          {isOpen ? 'Surprise Unlocked! ✨' : 'Tap the gift box to open ❤️'}
        </p>
      </div>

      {/* Button below */}
      <div className="relative z-20 w-full max-w-xs space-y-2">
        <button
          onClick={() => {
            if (!isOpen) {
              handleOpenGift();
            } else {
              onContinue();
            }
          }}
          className="w-full py-4 px-6 rounded-2xl font-cinzel text-sm sm:text-base font-bold text-white tracking-wider flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 glow-crimson bg-gradient-to-r from-[#B50935] via-[#D9043C] to-[#B50935] shadow-xl border border-white/20"
        >
          <span>{isOpen ? 'CONTINUE ❤️' : 'OPEN GIFT 🎁'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Surprise Popup Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm rounded-3xl p-6 text-center glass-crimson shadow-2xl border border-[#D9A0A8]/40"
            >
              {/* Close Icon */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-[#D9A0A8] hover:text-white bg-black/30"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Heart Icon with Halo */}
              <div className="relative mx-auto mb-4 w-16 h-16 rounded-full bg-[#B50935]/40 flex items-center justify-center border border-[#FFB6C8]/40 shadow-[0_0_20px_rgba(255,46,91,0.8)]">
                <Heart className="w-9 h-9 fill-[#FF2E5B] text-white animate-pulse" />
              </div>

              {/* Content */}
              <div className="space-y-3 mb-6">
                <h3 className="font-cinzel text-lg sm:text-xl text-white font-bold leading-snug">
                  &ldquo;Enakku kidaicha best gift nee dhaan Ammu ❤️&rdquo;
                </h3>
                <div className="w-12 h-0.5 bg-[#FF2E5B] mx-auto rounded-full" />
                <p className="font-romantic text-base text-[#FFB6C8] italic">
                  &ldquo;Un presence-e enakku oru gift.&rdquo;
                </p>
              </div>

              {/* Continue Button */}
              <button
                onClick={() => {
                  setShowModal(false);
                  playChime();
                  onContinue();
                }}
                className="w-full py-3.5 px-6 rounded-2xl font-cinzel text-sm font-bold text-white tracking-wider flex items-center justify-center gap-2 glow-crimson bg-gradient-to-r from-[#B50935] via-[#E61952] to-[#B50935] shadow-lg active:scale-95 transition-all"
              >
                <span>CONTINUE ❤️</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
