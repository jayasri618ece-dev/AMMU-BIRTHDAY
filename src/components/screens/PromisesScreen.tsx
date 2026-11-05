import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Cake, RotateCw } from 'lucide-react';
import { playChime, playHeartbeatSound } from '../../services/soundEffects';

interface PromisesScreenProps {
  onContinue: () => void;
}

export const PromisesScreen: React.FC<PromisesScreenProps> = ({ onContinue }) => {
  const cards = [
    {
      id: 1,
      title: 'Always Support You ❤️',
      tanglish: 'Un dreams-ku naan eppovume support-ah iruppen.',
      detail: 'Whatever goal you pursue, I will be your strongest cheerleader, believing in you even when you doubt yourself.',
      icon: '❤️',
      emoji: '🎯',
    },
    {
      id: 2,
      title: 'Always Care For You 🥹',
      tanglish: 'Un happiness and wellbeing enakku romba mukkiyam.',
      detail: 'From asking if you ate to listening to your tired rants at the end of a long day, caring for you is my natural instinct.',
      icon: '🥹',
      emoji: '🕊️',
    },
    {
      id: 3,
      title: 'Always Choose You 💗',
      tanglish: 'Endha situation vandhaalum en choice eppovume nee dhaan.',
      detail: 'In every version of life, on good days and through misunderstandings, I will always choose you over and over again.',
      icon: '💗',
      emoji: '💍',
    },
    {
      id: 4,
      title: 'Always Love You ♾️',
      tanglish: 'Distance irundhaalum love eppovume koraiyaadhu.',
      detail: 'Kilometers cannot weaken what is written in the heart. My love for you only grows deeper with every passing breath.',
      icon: '♾️',
      emoji: '💫',
    },
  ];

  // Track flipped card IDs
  const [flippedIds, setFlippedIds] = useState<Set<number>>(new Set());

  const handleCardClick = (id: number) => {
    playChime();
    playHeartbeatSound();
    setFlippedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-5 pt-12 pb-24 text-center overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-[#B50935]/20 blur-3xl pointer-events-none" />

      {/* Screen Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 space-y-1 max-w-sm mt-3"
      >
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#D9A0A8]">
          Chapter 05 · From Me To You
        </span>
        <h2 className="font-cinzel text-2xl sm:text-3xl text-white font-bold tracking-wide">
          Four Little Promises
        </h2>
        <p className="font-romantic text-xs sm:text-sm text-[#FFB6C8] italic">
          Tap each card to flip and read the secret vow
        </p>
      </motion.div>

      {/* 4 Glowing Interactive Flip Cards Grid */}
      <div className="relative z-20 my-auto w-full max-w-md py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {cards.map((card) => {
            const isFlipped = flippedIds.has(card.id);
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className="perspective-1000 h-44 sm:h-48 cursor-pointer select-none group"
              >
                <motion.div
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="relative w-full h-full preserve-3d"
                >
                  {/* FRONT FACE */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl glass-crimson border border-[#D9A0A8]/30 shadow-xl p-4 flex flex-col justify-between text-left group-hover:border-[#FF4B6E]/60 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{card.icon}</span>
                      <RotateCw className="w-3.5 h-3.5 text-[#D9A0A8]/60 group-hover:text-white transition-colors" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-cinzel text-sm sm:text-base text-white font-bold tracking-wide">
                        {card.title}
                      </h3>
                      <p className="font-romantic text-xs sm:text-sm text-[#FFB6C8] italic line-clamp-2">
                        &ldquo;{card.tanglish}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#D9A0A8]/70 border-t border-white/10 pt-2">
                      <span>Promise 0{card.id}</span>
                      <span className="flex items-center gap-1">
                        <span>Tap to flip</span>
                      </span>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-[#450113] via-[#30000D] to-[#1A030A] border border-[#FFB6C8]/40 shadow-2xl p-4 flex flex-col justify-between text-center"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <div className="flex items-center justify-center gap-1 text-[11px] font-cinzel text-[#FFB6C8] tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                      <span>Promise 0{card.id} Vow</span>
                    </div>

                    <p className="font-romantic text-xs sm:text-sm text-[#FFF0F4] leading-relaxed italic px-1">
                      {card.detail}
                    </p>

                    <div className="flex items-center justify-center gap-1 text-[10px] text-[#D9A0A8]/80">
                      <Heart className="w-3 h-3 fill-[#FF2E5B] text-[#FF2E5B]" />
                      <span>Locked with love</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Button */}
      <div className="relative z-20 w-full max-w-xs space-y-2">
        <button
          onClick={() => {
            playChime();
            onContinue();
          }}
          className="w-full py-4 px-6 rounded-2xl font-cinzel text-sm sm:text-base font-bold text-white tracking-wider flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 glow-crimson bg-gradient-to-r from-[#B50935] via-[#D9043C] to-[#B50935] shadow-xl border border-white/20"
        >
          <Cake className="w-5 h-5 text-white" />
          <span>CELEBRATE TOGETHER 🎂</span>
        </button>
      </div>
    </div>
  );
};
