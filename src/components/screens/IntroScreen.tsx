import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { playHeartbeatSound, playChime } from '../../services/soundEffects';
import { useAudio } from '../../context/AudioContext';

interface IntroScreenProps {
  onEnter: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
  const [stage, setStage] = useState(0);
  const [isExploding, setIsExploding] = useState(false);
  const { startMusic, isPlaying } = useAudio();

  useEffect(() => {
    // Stage sequence
    const t1 = setTimeout(() => setStage(1), 700);   // "Something special is waiting for you..."
    const t2 = setTimeout(() => setStage(2), 2600);  // "Made with endless love ❤️"
    const t3 = setTimeout(() => {
      setStage(3);
      playHeartbeatSound();
    }, 4500);  // "Hey Ammu..."
    const t4 = setTimeout(() => setStage(4), 5800);  // Reveal glowing TAP TO ENTER button

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleEnterClick = () => {
    if (!isPlaying) {
      startMusic();
    }
    setIsExploding(true);
    playChime();
    if (navigator.vibrate) {
      navigator.vibrate([40, 60, 100]);
    }
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-[#080507] text-center select-none">
      {/* Cinematic ambient background glow */}
      <div className="absolute w-[360px] h-[360px] rounded-full bg-radial from-[#B50935]/25 via-[#30000D]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Heart Explosion Effect on Click */}
      <AnimatePresence>
        {isExploding && (
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 28, opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute z-50 w-24 h-24 rounded-full bg-gradient-to-r from-[#B50935] to-[#FF4B6E] pointer-events-none blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Floating particles ring around heart */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Pulsing Glowing 3D Heart */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="relative mb-8 cursor-pointer"
          onClick={() => playHeartbeatSound()}
        >
          {/* Outer glow rings */}
          <div className="absolute inset-0 rounded-full bg-[#B50935]/30 blur-2xl animate-pulse" />
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center bg-gradient-to-br from-[#30000D] to-[#140207] border border-[#D9A0A8]/30 shadow-[0_0_40px_rgba(181,9,53,0.5)]">
            <Heart className="w-14 h-14 sm:w-16 sm:h-16 text-[#FF2E5B] fill-[#B50935] animate-heartbeat drop-shadow-[0_0_16px_rgba(255,46,91,0.9)]" />
          </div>

          {/* Sparkle badge */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-1 -right-1 text-[#FFB6C8]"
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
        </motion.div>

        {/* Cinematic Staged Text */}
        <div className="min-h-[140px] flex flex-col items-center justify-center max-w-sm">
          <AnimatePresence mode="wait">
            {stage === 1 && (
              <motion.p
                key="stage1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.8 }}
                className="font-romantic text-lg sm:text-xl text-[#D9A0A8] italic tracking-wide"
              >
                Something special is waiting for you...
              </motion.p>
            )}

            {stage === 2 && (
              <motion.p
                key="stage2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.8 }}
                className="font-cinzel text-xl sm:text-2xl text-[#FFB6C8] font-semibold tracking-wider glow-text"
              >
                Made with endless love ❤️
              </motion.p>
            )}

            {(stage === 3 || stage === 4) && (
              <motion.div
                key="stage3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="space-y-2"
              >
                <h1 className="font-cinzel text-3xl sm:text-4xl text-white font-bold tracking-widest glow-text">
                  Hey Ammu...
                </h1>
                <p className="font-romantic text-sm sm:text-base text-[#D9A0A8] italic">
                  A little world built just for your smile.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Reveal Glowing Button */}
        <AnimatePresence>
          {stage >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8"
            >
              <button
                onClick={handleEnterClick}
                className="group relative px-8 py-4 rounded-full font-cinzel text-base font-bold tracking-wider text-white overflow-hidden transition-all duration-300 active:scale-95 glow-crimson-lg"
              >
                {/* Button background gradient */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#B50935] via-[#E61952] to-[#B50935] bg-[length:200%_auto] animate-shimmer" />
                {/* Subtle highlight border */}
                <span className="absolute inset-0 rounded-full border border-white/30" />
                
                <span className="relative z-10 flex items-center gap-3">
                  <span>TAP TO ENTER</span>
                  <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
                </span>
              </button>

              <p className="mt-3 text-[11px] text-[#D9A0A8]/60 tracking-wider">
                Sound on for the full cinematic experience 🎵
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
