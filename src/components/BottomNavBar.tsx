import React from 'react';
import { Home, Gift, Heart, Sparkles, Mail } from 'lucide-react';
import { NavTabId, ScreenId } from '../types';

interface BottomNavBarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  unlockedScreens: Set<ScreenId>;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  onNavigate,
}) => {
  // Map current screen to active tab
  const getActiveTab = (): NavTabId => {
    switch (currentScreen) {
      case 'home':
        return 'home';
      case 'envelope':
      case 'gift':
        return 'surprises';
      case 'story':
      case 'promises':
        return 'story';
      case 'cake':
      case 'ending':
        return 'birthday';
      case 'letter':
      case 'secret-heart':
        return 'letter';
      default:
        return 'home';
    }
  };

  const activeTab = getActiveTab();

  const tabs: Array<{ id: NavTabId; label: string; icon: React.ReactNode; targetScreen: ScreenId }> = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
      targetScreen: 'home',
    },
    {
      id: 'surprises',
      label: 'Surprises',
      icon: <Gift className="w-5 h-5" />,
      targetScreen: 'envelope',
    },
    {
      id: 'story',
      label: 'Our Love',
      icon: <Heart className="w-5 h-5" />,
      targetScreen: 'story',
    },
    {
      id: 'birthday',
      label: 'Birthday',
      icon: <Sparkles className="w-5 h-5" />,
      targetScreen: 'cake',
    },
    {
      id: 'letter',
      label: 'My Letter',
      icon: <Mail className="w-5 h-5" />,
      targetScreen: 'letter',
    },
  ];

  return (
    <nav
      aria-label="App Navigation"
      className="fixed bottom-3 inset-x-0 mx-auto max-w-md px-3 z-40 pointer-events-auto"
    >
      <div className="relative flex items-center justify-around h-15 rounded-2xl bg-[#140207]/90 backdrop-blur-xl border border-[#D9A0A8]/25 shadow-2xl shadow-black/80 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.targetScreen)}
              className="relative flex flex-col items-center justify-center flex-1 h-full py-1 text-center transition-all duration-200 active:scale-90"
              aria-label={tab.label}
            >
              {/* Active glow background halo */}
              {isActive && (
                <div className="absolute inset-x-2 inset-y-1.5 rounded-xl bg-gradient-to-t from-[#B50935]/40 to-transparent -z-10 animate-fade-in" />
              )}

              <div
                className={`transition-colors duration-200 ${
                  isActive ? 'text-[#FF4B6E] scale-105 drop-shadow-[0_0_8px_rgba(255,75,110,0.8)]' : 'text-[#D9A0A8]/60 hover:text-[#FFB6C8]'
                }`}
              >
                {tab.icon}
              </div>

              <span
                className={`text-[10px] tracking-tight mt-0.5 transition-colors duration-200 font-medium ${
                  isActive ? 'text-white font-semibold' : 'text-[#D9A0A8]/60'
                }`}
              >
                {tab.label}
              </span>

              {/* Active dot indicator */}
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#FF4B6E] mt-0.5 shadow-[0_0_4px_#FF4B6E]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
