import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Gift, Heart, Sparkles, ChevronRight, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScreenId } from '../../types';
import { playChime } from '../../services/soundEffects';

interface HomeScreenProps {
  onStartSurprise: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStartSurprise, onNavigate }) => {
  useEffect(() => {
    // Gentle welcome confetti burst
    const end = Date.now() + 1200;
    const colors = ['#B50935', '#D9A0A8', '#FFB6C8', '#FFD700'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const handleStart = () => {
    playChime();
    onStartSurprise();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-5 pt-14 pb-24 overflow-x-hidden text-center">
      {/* Top Spotlight Effect */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#B50935]/20 via-[#30000D]/10 to-transparent pointer-events-none blur-2xl" />

      {/* Floating Decorative Balloons (CSS / Motion) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Balloon 1 */}
        <motion.div
          animate={{ y: [-10, 15, -10], rotate: [-2, 3, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-16 left-4 sm:left-12 flex flex-col items-center opacity-70"
        >
          <div className="w-12 h-16 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-tr from-[#30000D] via-[#B50935] to-[#FF4B6E] shadow-[0_0_15px_rgba(181,9,53,0.5)] border border-[#FFB6C8]/30" />
          <div className="w-[1px] h-12 bg-[#D9A0A8]/40 -mt-1" />
        </motion.div>

        {/* Balloon 2 */}
        <motion.div
          animate={{ y: [15, -15, 15], rotate: [3, -2, 3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-20 right-4 sm:right-12 flex flex-col items-center opacity-70"
        >
          <div className="w-11 h-15 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-tr from-[#30000D] via-[#D9A0A8] to-[#FFB6C8] shadow-[0_0_15px_rgba(217,160,168,0.4)] border border-[#FFB6C8]/30" />
          <div className="w-[1px] h-14 bg-[#D9A0A8]/40 -mt-1" />
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 flex flex-col items-center max-w-md w-full my-auto space-y-6">
        {/* Kicker badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#30000D]/80 border border-[#B50935]/40 text-[#FFB6C8] text-xs tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FF2E5B]" />
          <span>A Romantic Celebration For You</span>
        </motion.div>

        {/* Grand Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#D9A0A8] uppercase">
            Special Birthday Edition
          </p>
          <h1 className="font-cinzel text-4xl sm:text-5xl font-extrabold tracking-wider text-white leading-tight glow-text">
            HAPPY BIRTHDAY
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6E] via-[#FFB6C8] to-[#FF2E5B]">
              AMMU ❤️
            </span>
          </h1>
          <p className="font-romantic text-base sm:text-lg text-[#D9A0A8] italic tracking-wide">
            &ldquo;Indha naal unakkaga mattum dhaan...&rdquo;
          </p>
        </motion.div>

        {/* Realistic 3D Stylized Animated Birthday Cake Centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative my-3 flex flex-col items-center cursor-pointer group"
          onClick={() => onNavigate('cake')}
        >
          {/* Cake Glow halo */}
          <div className="absolute inset-0 bg-[#B50935]/25 rounded-full blur-2xl group-hover:bg-[#B50935]/40 transition-colors" />

          {/* 3D Cake Visual Container */}
          <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex flex-col items-center justify-end pb-4">
            {/* Candle with flickering flame */}
            <div className="flex items-center justify-center gap-3 mb-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  {/* Candle Flame */}
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 0.95, 1],
                      opacity: [0.9, 1, 0.85, 1],
                    }}
                    transition={{
                      duration: 0.6 + i * 0.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-3.5 h-5 rounded-full bg-gradient-to-t from-[#FF7A00] via-[#FFD700] to-white shadow-[0_0_12px_#FFD700] -mb-0.5"
                  />
                  {/* Candle Stick */}
                  <div className="w-1.5 h-6 bg-gradient-to-b from-white via-[#FFB6C8] to-[#D9A0A8] rounded-t-sm shadow-sm" />
                </div>
              ))}
            </div>

            {/* Cake Top Tier */}
            <div className="relative w-28 h-10 rounded-xl bg-gradient-to-r from-[#30000D] via-[#B50935] to-[#480014] border-t-2 border-[#FFB6C8] shadow-md flex items-center justify-center">
              {/* Cream drip accents */}
              <div className="absolute -top-1 inset-x-2 flex justify-around">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="w-2.5 h-3 rounded-b-full bg-[#FFD9E2] opacity-80" />
                ))}
              </div>
              <span className="text-[10px] tracking-wider font-semibold text-white/90">AMMU</span>
            </div>

            {/* Cake Bottom Tier */}
            <div className="relative w-38 h-14 rounded-2xl bg-gradient-to-r from-[#1A030A] via-[#30000D] to-[#25030D] border-t-2 border-[#D9A0A8]/80 shadow-2xl flex items-center justify-center -mt-1">
              <div className="flex items-center gap-1.5 text-xs text-[#FFB6C8]/90">
                <Heart className="w-3.5 h-3.5 fill-[#FF2E5B] text-[#FF2E5B]" />
                <span className="font-cinzel font-bold text-[11px] tracking-widest">FOUR YEARS</span>
                <Heart className="w-3.5 h-3.5 fill-[#FF2E5B] text-[#FF2E5B]" />
              </div>
            </div>

            {/* Cake Plate Stand */}
            <div className="w-44 h-3 rounded-full bg-gradient-to-r from-[#D9A0A8]/30 via-[#D9A0A8] to-[#D9A0A8]/30 shadow-lg -mt-0.5" />
          </div>

          <span className="text-[11px] text-[#D9A0A8]/70 flex items-center gap-1 mt-1 group-hover:text-white transition-colors">
            <span>Tap cake anytime to celebrate</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </motion.div>

        {/* Primary CTA: START MY SURPRISE */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full space-y-3"
        >
          <button
            onClick={handleStart}
            className="w-full py-4 px-6 rounded-2xl font-cinzel text-base font-bold text-white tracking-wider flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 glow-crimson bg-gradient-to-r from-[#B50935] via-[#D9043C] to-[#B50935] hover:brightness-110 shadow-xl border border-white/20"
          >
            <Gift className="w-5 h-5 text-white animate-bounce" />
            <span>START MY SURPRISE</span>
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Special Tanglish Message */}
          <p className="font-romantic text-xs sm:text-sm text-[#FFB6C8] italic tracking-wide">
            &ldquo;Un smile dhaan enakku romba special.&rdquo;
          </p>
        </motion.div>

        {/* Quick Chapters Shortcut Grid */}
        <div className="w-full pt-4 border-t border-white/10">
          <p className="text-[11px] text-[#D9A0A8]/70 tracking-wider uppercase mb-2.5 font-medium flex items-center justify-center gap-1">
            <Compass className="w-3 h-3 text-[#FF4B6E]" />
            <span>Surprise Chapters</span>
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'envelope', label: 'Envelope', icon: '💌' },
              { id: 'letter', label: 'Letter', icon: '📜' },
              { id: 'gift', label: 'Gift', icon: '🎁' },
              { id: 'story', label: 'Story', icon: '💫' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  playChime();
                  onNavigate(item.id as ScreenId);
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#1A030A]/60 border border-[#D9A0A8]/20 hover:border-[#FF4B6E]/50 text-xs transition-all active:scale-95"
              >
                <span className="text-base mb-1">{item.icon}</span>
                <span className="text-[10px] text-[#D9A0A8] truncate w-full text-center">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
