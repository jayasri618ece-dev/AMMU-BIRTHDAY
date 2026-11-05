import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Music2, Sparkles, Upload, ChevronUp, ChevronDown } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const FloatingMusicPlayer: React.FC = () => {
  const {
    isPlaying,
    isMuted,
    volume,
    trackName,
    isUsingFallback,
    togglePlay,
    toggleMute,
    setVolume,
    loadCustomAudioFile,
    audioVisualizerData,
    hasStarted,
  } = useAudio();

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      loadCustomAudioFile(e.target.files[0]);
    }
  };

  return (
    <aside
      aria-label="Background Music Controls"
      className="fixed top-4 right-4 z-50 flex flex-col items-end pointer-events-auto"
    >
      {/* Minimized Pill / Floating Bar */}
      <div className="flex items-center gap-2 p-1.5 pl-3 rounded-full bg-[#1A030A]/90 backdrop-blur-md border border-[#D9A0A8]/30 shadow-lg shadow-[#B50935]/20 text-[#FFB6C8] transition-all duration-300">
        {/* Animated Visualizer Bars */}
        <div className="flex items-end gap-[3px] h-4 w-5 px-0.5">
          {audioVisualizerData.slice(0, 4).map((height, i) => (
            <span
              key={i}
              className="w-[3px] bg-gradient-to-t from-[#B50935] to-[#FFB6C8] rounded-full transition-all duration-150"
              style={{
                height: isPlaying ? `${Math.max(20, Math.min(100, height))}%` : '20%',
                opacity: isPlaying ? 0.95 : 0.4,
              }}
            />
          ))}
        </div>

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause romantic music' : 'Play romantic music'}
          className="w-8 h-8 rounded-full bg-[#B50935] hover:bg-[#D9043C] text-white flex items-center justify-center transition-transform active:scale-90 shadow-md shadow-[#B50935]/50"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
        </button>

        {/* Mute/Unmute */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          className="w-8 h-8 rounded-full bg-[#30000D]/80 hover:bg-[#30000D] text-[#D9A0A8] hover:text-[#FFB6C8] flex items-center justify-center transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Expand Details Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Toggle music settings panel"
          className="w-7 h-7 rounded-full text-[#D9A0A8] hover:text-white flex items-center justify-center transition-colors"
        >
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Settings Dropdown */}
      {isExpanded && (
        <div className="mt-2 w-64 p-3.5 rounded-2xl bg-[#140207]/95 backdrop-blur-xl border border-[#D9A0A8]/25 shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-top-2 duration-200 text-xs">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
            <Music2 className="w-4 h-4 text-[#B50935]" />
            <div className="truncate flex-1">
              <p className="font-medium text-white truncate">{trackName}</p>
              <p className="text-[10px] text-[#D9A0A8]/80">
                {isUsingFallback ? 'Romantic Ambient Acoustic Synth' : 'Dedicated Birthday Soundtrack'}
              </p>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="mb-3 space-y-1">
            <div className="flex justify-between text-[11px] text-[#D9A0A8]">
              <span>Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#30000D] rounded-lg appearance-none cursor-pointer accent-[#B50935]"
            />
          </div>

          {/* Upload Custom Track Option */}
          <label className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-[#30000D]/80 hover:bg-[#480014] text-[#FFB6C8] border border-[#B50935]/40 cursor-pointer transition-all active:scale-95 text-center font-medium">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload ammu-birthday-bgm.mp3</span>
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          <p className="mt-2 text-[10px] text-center text-[#D9A0A8]/60 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-[#FFB6C8]" />
            <span>Playing seamlessly for Ammu</span>
          </p>
        </div>
      )}
    </aside>
  );
};
