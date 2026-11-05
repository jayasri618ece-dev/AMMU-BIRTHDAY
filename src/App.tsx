import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ScreenId } from './types';
import { AudioProvider, useAudio } from './context/AudioContext';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { ParticleCanvas } from './components/ParticleCanvas';
import { BottomNavBar } from './components/BottomNavBar';
import { IntroScreen } from './components/screens/IntroScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { EnvelopeScreen } from './components/screens/EnvelopeScreen';
import { LetterScreen } from './components/screens/LetterScreen';
import { GiftBoxScreen } from './components/screens/GiftBoxScreen';
import { StoryTimelineScreen } from './components/screens/StoryTimelineScreen';
import { PromisesScreen } from './components/screens/PromisesScreen';
import { CakeCelebrationScreen } from './components/screens/CakeCelebrationScreen';
import { SecretHeartScreen } from './components/screens/SecretHeartScreen';
import { GrandEndingScreen } from './components/screens/GrandEndingScreen';

const MainAppContent: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('intro');
  const [unlockedScreens, setUnlockedScreens] = useState<Set<ScreenId>>(new Set(['intro', 'home']));
  const { startMusic } = useAudio();

  const handleScreenChange = (screen: ScreenId) => {
    setCurrentScreen(screen);
    setUnlockedScreens((prev) => new Set([...prev, screen]));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnterFromIntro = () => {
    startMusic();
    handleScreenChange('home');
  };

  const handleReplay = () => {
    handleScreenChange('home');
  };

  // Chapter labels for top progress
  const screenOrder: ScreenId[] = [
    'home',
    'envelope',
    'letter',
    'gift',
    'story',
    'promises',
    'cake',
    'secret-heart',
    'ending',
  ];
  const currentIndex = screenOrder.indexOf(currentScreen);
  const progressPercent = currentIndex >= 0 ? ((currentIndex + 1) / screenOrder.length) * 100 : 0;

  return (
    <div className="relative min-h-screen w-full bg-[#080507] text-[#FFB6C8] selection:bg-[#B50935] selection:text-white overflow-x-hidden">
      {/* Background Particle Canvas (Always rendering floating petals and romantic embers) */}
      <ParticleCanvas />

      {/* Floating Global Music Player (Always mounted, maintains state continuously) */}
      <FloatingMusicPlayer />

      {/* Top Subtle Progress Indicator (shown on story chapters, not intro) */}
      {currentScreen !== 'intro' && (
        <div className="fixed top-0 inset-x-0 z-40 pointer-events-none">
          <div className="h-1 w-full bg-[#30000D]/50">
            <div
              className="h-full bg-gradient-to-r from-[#B50935] via-[#FF4B6E] to-[#FFD9E2] transition-all duration-500 ease-out shadow-[0_0_8px_#FF4B6E]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Responsive Viewport Wrapper: mobile-first centered experience with desktop luxury padding */}
      <main className="relative mx-auto w-full max-w-2xl min-h-screen flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {currentScreen === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <IntroScreen onEnter={handleEnterFromIntro} />
            </motion.div>
          )}

          {currentScreen === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <HomeScreen
                onStartSurprise={() => handleScreenChange('envelope')}
                onNavigate={handleScreenChange}
              />
            </motion.div>
          )}

          {currentScreen === 'envelope' && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <EnvelopeScreen onOpenLetter={() => handleScreenChange('letter')} />
            </motion.div>
          )}

          {currentScreen === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <LetterScreen onNextSurprise={() => handleScreenChange('gift')} />
            </motion.div>
          )}

          {currentScreen === 'gift' && (
            <motion.div
              key="gift"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <GiftBoxScreen onContinue={() => handleScreenChange('story')} />
            </motion.div>
          )}

          {currentScreen === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <StoryTimelineScreen onContinue={() => handleScreenChange('promises')} />
            </motion.div>
          )}

          {currentScreen === 'promises' && (
            <motion.div
              key="promises"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <PromisesScreen onContinue={() => handleScreenChange('cake')} />
            </motion.div>
          )}

          {currentScreen === 'cake' && (
            <motion.div
              key="cake"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <CakeCelebrationScreen onContinue={() => handleScreenChange('secret-heart')} />
            </motion.div>
          )}

          {currentScreen === 'secret-heart' && (
            <motion.div
              key="secret-heart"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <SecretHeartScreen onContinue={() => handleScreenChange('ending')} />
            </motion.div>
          )}

          {currentScreen === 'ending' && (
            <motion.div
              key="ending"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <GrandEndingScreen onReplay={handleReplay} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Bottom Navigation Bar (Visible on all screens except initial Intro) */}
      {currentScreen !== 'intro' && (
        <BottomNavBar
          currentScreen={currentScreen}
          onNavigate={handleScreenChange}
          unlockedScreens={unlockedScreens}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AudioProvider>
      <MainAppContent />
    </AudioProvider>
  );
}
