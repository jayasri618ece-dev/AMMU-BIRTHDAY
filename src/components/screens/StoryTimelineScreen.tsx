import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, ArrowRight } from 'lucide-react';
import { Milestone } from '../../types';
import { playChime, playHeartbeatSound } from '../../services/soundEffects';

interface StoryTimelineScreenProps {
  onContinue: () => void;
}

export const StoryTimelineScreen: React.FC<StoryTimelineScreenProps> = ({ onContinue }) => {
  const milestones: Milestone[] = [
    {
      number: '01',
      title: 'The Beginning ❤️',
      description: 'Ellame oru chinna beginning-la start aachu.',
      detail: 'A simple spark that turned into the most meaningful part of my life. From that very first moment, you held a special place.',
      icon: '🌱',
      tag: 'Year One',
    },
    {
      number: '02',
      title: 'Beautiful Memories ✨',
      description: 'Namma share panna ovvoru moment-um special.',
      detail: 'The laughter, the long calls, the late night talks, and every little thing we shared that no one else understands.',
      icon: '✨',
      tag: 'Year Two',
    },
    {
      number: '03',
      title: 'Growing Together 🫶',
      description: 'Sandhosham mattum illa, everything-la yum namma grow aagittom.',
      detail: 'Through the ups and downs, the misunderstandings and making up, we chose each other every single time.',
      icon: '🫶',
      tag: 'Year Three',
    },
    {
      number: '04',
      title: 'Forever & Always ♾️',
      description: 'Innum neraya memories create panna porom.',
      detail: 'Almost 4 years now, and my love only grows deeper. This is just the beginning of our forever story.',
      icon: '♾️',
      tag: 'Year Four & Beyond',
    },
  ];

  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);

  const handleMilestoneClick = (m: Milestone) => {
    setActiveMilestone(m);
    playChime();
    playHeartbeatSound();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-5 pt-12 pb-24 text-center overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-[#B50935]/15 blur-3xl pointer-events-none" />

      {/* Screen Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 space-y-1 max-w-sm mt-3"
      >
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#D9A0A8]">
          Chapter 04 · Our Journey
        </span>
        <h2 className="font-cinzel text-2xl sm:text-3xl text-white font-bold tracking-wide">
          OUR LITTLE LOVE STORY ❤️
        </h2>
        <p className="font-romantic text-xs sm:text-sm text-[#FFB6C8] italic">
          Tap each glowing heart to open the memory
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative z-20 my-auto w-full max-w-md py-6">
        {/* Vertical Glowing Timeline Line */}
        <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#B50935] via-[#FF4B6E] to-[#B50935] opacity-60" />

        <div className="space-y-4">
          {milestones.map((m, index) => (
            <motion.div
              key={m.number}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              onClick={() => handleMilestoneClick(m)}
              className="relative flex items-center gap-4 p-3.5 rounded-2xl glass-wine-subtle border border-[#D9A0A8]/20 hover:border-[#FF4B6E]/60 transition-all duration-300 cursor-pointer active:scale-[0.98] group"
            >
              {/* Milestone Glowing Heart Node */}
              <div className="relative z-10 flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-[#30000D] to-[#B50935] border border-[#FFB6C8]/40 flex items-center justify-center shadow-[0_0_15px_rgba(181,9,53,0.6)] group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 fill-[#FF2E5B] text-white" />
              </div>

              {/* Milestone Content */}
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider text-[#D9A0A8]">
                    {m.number} · {m.tag}
                  </span>
                  <span className="text-xs">{m.icon}</span>
                </div>
                <h3 className="font-cinzel text-sm sm:text-base text-white font-semibold group-hover:text-[#FFB6C8] transition-colors">
                  {m.title}
                </h3>
                <p className="font-romantic text-xs sm:text-sm text-[#FFB6C8]/90 italic mt-0.5">
                  &ldquo;{m.description}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Button below */}
      <div className="relative z-20 w-full max-w-xs space-y-2">
        <button
          onClick={() => {
            playChime();
            onContinue();
          }}
          className="w-full py-4 px-6 rounded-2xl font-cinzel text-sm sm:text-base font-bold text-white tracking-wider flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 glow-crimson bg-gradient-to-r from-[#B50935] via-[#D9043C] to-[#B50935] shadow-xl border border-white/20"
        >
          <span>OUR PROMISES ❤️</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Detail Modal for Milestone */}
      <AnimatePresence>
        {activeMilestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              className="relative w-full max-w-sm rounded-3xl p-6 text-center glass-crimson shadow-2xl border border-[#D9A0A8]/40"
            >
              <button
                onClick={() => setActiveMilestone(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-[#D9A0A8] hover:text-white bg-black/30"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-3xl mb-2 inline-block">{activeMilestone.icon}</span>
              <p className="text-[11px] font-mono tracking-widest text-[#D9A0A8]">
                MILESTONE {activeMilestone.number}
              </p>
              <h3 className="font-cinzel text-xl text-white font-bold mt-1 mb-2">
                {activeMilestone.title}
              </h3>

              <div className="p-4 rounded-xl bg-black/30 border border-[#D9A0A8]/20 mb-4">
                <p className="font-romantic text-base text-[#FFB6C8] italic leading-relaxed">
                  &ldquo;{activeMilestone.description}&rdquo;
                </p>
                <p className="text-xs text-[#D9A0A8] mt-3 leading-relaxed">
                  {activeMilestone.detail}
                </p>
              </div>

              <button
                onClick={() => setActiveMilestone(null)}
                className="w-full py-2.5 px-4 rounded-xl font-cinzel text-xs font-bold text-white tracking-wider glow-crimson bg-[#B50935] active:scale-95 transition-all"
              >
                CLOSE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
