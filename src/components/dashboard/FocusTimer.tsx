import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, BrainCircuit, BellRing } from 'lucide-react';

export function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [permission, setPermission] = useState(Notification.permission);
  
  // Audio reference for the notification sound
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
  }, []);

  const requestPermission = async () => {
    if (Notification.permission !== 'granted') {
      const result = await Notification.requestPermission();
      setPermission(result);
    }
  };

  const playAlert = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    if (permission === 'granted') {
      new Notification(mode === 'focus' ? 'Break Time!' : 'Focus Time!', {
        body: mode === 'focus' ? 'You completed your focus session. Take a rest!' : 'Break is over. Back to grinding!',
        icon: '/favicon.svg'
      });
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      playAlert();
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

  const toggleTimer = () => {
    if (!isRunning && permission === 'default') {
      requestPermission();
    }
    setIsRunning(!isRunning);
  };

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
    <div className={`transition-all duration-500 bg-[#06080f]/80 backdrop-blur-md border rounded-2xl p-6 flex flex-col relative overflow-hidden ${
      isRunning 
        ? 'border-[#8b5cf6] shadow-[0_0_30px_rgba(139,92,246,0.3)] scale-[1.02] z-10' 
        : 'border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]'
    }`}>
      {isRunning && mode === 'focus' && (
        <div className="absolute inset-0 bg-[#8b5cf6]/5 animate-pulse pointer-events-none"></div>
      )}
      {isRunning && mode === 'break' && (
        <div className="absolute inset-0 bg-emerald-500/5 animate-pulse pointer-events-none"></div>
      )}
      
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h2 className={`font-black text-sm tracking-widest uppercase flex items-center gap-2 transition-colors ${isRunning ? 'text-[#a78bfa] drop-shadow-[0_0_8px_rgba(167,139,250,0.8)]' : 'text-white drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]'}`}>
          <BrainCircuit size={16} className={isRunning ? 'animate-pulse' : 'text-slate-500'} />
          Deep Work Mode
        </h2>
        <div className="flex items-center gap-2">
          {permission !== 'granted' && (
            <button onClick={requestPermission} className="text-slate-500 hover:text-[#a78bfa]" title="Enable Notifications">
              <BellRing size={14} />
            </button>
          )}
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${mode === 'focus' ? 'bg-[#8b5cf6]/20 text-[#a78bfa]' : 'bg-emerald-500/20 text-emerald-400'}`}>
            {mode === 'focus' ? 'Focus' : 'Break'}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-4 relative z-10">
        <div className={`text-5xl font-black font-mono transition-colors mb-6 ${
          isRunning 
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-[#a78bfa] drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]' 
            : 'text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]'
        }`}>
          {formatTime(timeLeft)}
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTimer}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
              isRunning 
                ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]' 
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
