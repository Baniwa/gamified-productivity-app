import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, BrainCircuit } from 'lucide-react';

export function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === 'focus') {
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('focus');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#06080f]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden">
      {isRunning && mode === 'focus' && (
        <div className="absolute inset-0 bg-[#8b5cf6]/5 animate-pulse pointer-events-none"></div>
      )}
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-black text-sm tracking-widest uppercase flex items-center gap-2 drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]">
          <BrainCircuit size={16} className={isRunning ? 'text-[#a78bfa] animate-pulse' : 'text-slate-500'} />
          Deep Work Mode
        </h2>
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${mode === 'focus' ? 'bg-[#8b5cf6]/20 text-[#a78bfa]' : 'bg-emerald-500/20 text-emerald-400'}`}>
          {mode === 'focus' ? 'Focus' : 'Break'}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center py-4">
        <div className="text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] mb-6">
          {formatTime(timeLeft)}
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTimer}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
              isRunning 
                ? 'bg-white/10 text-white hover:bg-white/20' 
                : 'bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:bg-[#7c3aed]'
            }`}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
          </button>
          <button 
            onClick={resetTimer}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
