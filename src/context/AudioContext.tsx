import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { proceduralBGM } from '../services/soundEffects';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  hasStarted: boolean;
  trackName: string;
  isUsingFallback: boolean;
  startMusic: () => Promise<void>;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (val: number) => void;
  loadCustomAudioFile: (file: File) => void;
  audioVisualizerData: number[];
}

const AudioContext = createContext<AudioContextType | null>(null);

const DEFAULT_AUDIO_PATH = '/ammu-birthday-bgm.mp3';
const FALLBACK_AUDIO_PATH = '/assets/aistudio/ammu-birthday-bgm.mp3';
const VIDEO_AUDIO_PATH = '/assets/aistudio/VID-20261105-WA0097_16f97594.mp4';

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(1.0); // 100% full loud volume
  const [hasStarted, setHasStarted] = useState(false);
  const [trackName, setTrackName] = useState("Remo - Happy Birthday BGM ❤️");
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [audioVisualizerData, setAudioVisualizerData] = useState<number[]>([30, 60, 90, 85, 50, 70]);

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const visualizerTimerRef = useRef<number | null>(null);
  const currentVolumeRef = useRef(volume);

  useEffect(() => {
    currentVolumeRef.current = volume;
  }, [volume]);

  // Initialize HTMLAudioElement
  useEffect(() => {
    const audio = new Audio();
    audio.src = DEFAULT_AUDIO_PATH;
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 1.0; // Loud volume
    audioElementRef.current = audio;

    let retryCount = 0;
    const sources = [DEFAULT_AUDIO_PATH, FALLBACK_AUDIO_PATH, VIDEO_AUDIO_PATH];

    const handleError = () => {
      retryCount++;
      if (retryCount < sources.length && audioElementRef.current) {
        audioElementRef.current.src = sources[retryCount];
        audioElementRef.current.load();
        if (hasStarted) {
          audioElementRef.current.play().catch(() => {});
        }
      } else if (hasStarted) {
        setIsUsingFallback(true);
        setTrackName("Ammu's Love Melody (Romantic Synth)");
        proceduralBGM.start();
        proceduralBGM.setVolume(isMuted ? 0 : currentVolumeRef.current);
      }
    };

    audio.addEventListener('error', handleError);

    // Try starting on mount in case browser permissions allow it
    const attemptAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setHasStarted(true);
        setTrackName("Remo - Happy Birthday BGM ❤️");
      } catch {
        // Autoplay requires user gesture; will start on first touch
      }
    };
    attemptAutoplay();

    // Global listener for first user interaction anywhere to ensure loud music starts from the opening
    const handleFirstUserGesture = () => {
      if (!audioElementRef.current) return;
      if (audioElementRef.current.paused) {
        audioElementRef.current.volume = 1.0;
        audioElementRef.current.play().then(() => {
          setIsPlaying(true);
          setHasStarted(true);
          setTrackName("Remo - Happy Birthday BGM ❤️");
        }).catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstUserGesture, { once: true });
    window.addEventListener('touchstart', handleFirstUserGesture, { once: true });

    return () => {
      audio.removeEventListener('error', handleError);
      window.removeEventListener('click', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
      audio.pause();
      proceduralBGM.stop();
      if (visualizerTimerRef.current) {
        clearInterval(visualizerTimerRef.current);
      }
    };
  }, [hasStarted, isMuted]);

  // Visualizer simulation (creates organic dancing audio bars)
  useEffect(() => {
    if (isPlaying) {
      visualizerTimerRef.current = window.setInterval(() => {
        setAudioVisualizerData([
          Math.floor(40 + Math.random() * 60),
          Math.floor(50 + Math.random() * 50),
          Math.floor(65 + Math.random() * 35),
          Math.floor(55 + Math.random() * 45),
          Math.floor(45 + Math.random() * 55),
          Math.floor(35 + Math.random() * 65),
        ]);
      }, 100);
    } else {
      if (visualizerTimerRef.current) {
        clearInterval(visualizerTimerRef.current);
      }
      setAudioVisualizerData([10, 15, 12, 18, 14, 10]);
    }

    return () => {
      if (visualizerTimerRef.current) clearInterval(visualizerTimerRef.current);
    };
  }, [isPlaying]);

  const startMusic = async () => {
    setHasStarted(true);
    const audio = audioElementRef.current;

    if (audio) {
      try {
        audio.volume = isMuted ? 0 : 1.0; // Play immediately in loud, clear volume
        await audio.play();
        setIsPlaying(true);
        setIsUsingFallback(false);
        setTrackName("Remo - Happy Birthday BGM ❤️");
      } catch {
        // Autoplay policy or missing file: try video path or procedural synth
        try {
          audio.src = VIDEO_AUDIO_PATH;
          audio.volume = 1.0;
          await audio.play();
          setIsPlaying(true);
          setTrackName("Remo - Happy Birthday BGM ❤️");
        } catch {
          setIsUsingFallback(true);
          setIsPlaying(true);
          setTrackName("Ammu's Love Melody (Romantic Synth)");
          proceduralBGM.start();
          proceduralBGM.setVolume(isMuted ? 0 : 1.0);
        }
      }
    } else {
      setIsUsingFallback(true);
      setIsPlaying(true);
      proceduralBGM.start();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (audioElementRef.current && !isUsingFallback) {
        audioElementRef.current.pause();
      }
      proceduralBGM.stop();
      setIsPlaying(false);
    } else {
      if (audioElementRef.current && !isUsingFallback) {
        audioElementRef.current.play().catch(() => {
          setIsUsingFallback(true);
          proceduralBGM.start();
        });
      } else {
        proceduralBGM.start();
      }
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    if (audioElementRef.current) {
      audioElementRef.current.muted = newMuted;
    }
    proceduralBGM.setVolume(newMuted ? 0 : volume);
  };

  const setVolume = (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (audioElementRef.current) {
      audioElementRef.current.volume = isMuted ? 0 : clamped;
    }
    proceduralBGM.setVolume(isMuted ? 0 : clamped);
  };

  const loadCustomAudioFile = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    if (audioElementRef.current) {
      proceduralBGM.stop();
      audioElementRef.current.src = objectUrl;
      audioElementRef.current.load();
      audioElementRef.current.play().then(() => {
        setIsPlaying(true);
        setIsUsingFallback(false);
        setTrackName(file.name);
      }).catch(() => {
        // Fallback
      });
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        hasStarted,
        trackName,
        isUsingFallback,
        startMusic,
        togglePlay,
        toggleMute,
        setVolume,
        loadCustomAudioFile,
        audioVisualizerData,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
