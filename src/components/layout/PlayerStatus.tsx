import { Dumbbell, Brain, Target, Flame, Activity, Settings } from 'lucide-react';
import { PlayerStats } from '../../types';
import { StatRow } from '../common/StatRow';
import { UserProfile } from '../../hooks/useProfileSystem';

interface PlayerStatusProps {
  currentLevel: number;
  xpToNextLevel: number;
  stats: PlayerStats;
  profile: UserProfile;
  onOpenSettings: () => void;
}

export function PlayerStatus({ currentLevel, xpToNextLevel, stats, profile, onOpenSettings }: PlayerStatusProps) {
  // Circular Progress calculation
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (xpToNextLevel / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* HEADER / AVATAR CARD */}
      <div className="bg-[#06080f]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] relative">
        <button 
          onClick={onOpenSettings}
          className="absolute top-4 right-4 text-slate-500 hover:text-[#a78bfa] transition-colors"
        >
          <Settings size={18} />
        </button>
        
        <h2 className="text-white font-black text-2xl tracking-tighter uppercase mb-6 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] leading-none">
          SOLO LEVELING<br/>
          <span className="text-xl opacity-80">System</span>
        </h2>
        
        <div className="flex flex-col xl:flex-row items-center gap-6 mb-6">
          {/* Avatar Glowing Circle */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#8b5cf6] blur-xl opacity-40 animate-pulse"></div>
            <div className="w-28 h-28 rounded-full border-4 border-[#8b5cf6] p-1 relative z-10 bg-[#06080f]">
              <div 
                className="w-full h-full rounded-full bg-cover bg-center border-2 border-black"
                style={{ backgroundImage: `url(${profile.avatarUrl})` }}
              ></div>
            </div>
          </div>
          
          <div className="flex-1 text-center xl:text-left">
            <h1 className="text-xl font-black text-[#a78bfa] uppercase tracking-widest drop-shadow-[0_0_5px_rgba(167,139,250,0.5)]">
              {profile.name}
            </h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1 mb-3">{profile.className}</p>
            
            <div className="flex items-center gap-4 justify-center xl:justify-start">
              <div className="text-center">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Level</p>
                <p className="text-lg font-black text-white">{currentLevel}</p>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="text-center">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Rank</p>
                <p className="text-lg font-black text-[#a78bfa]">A</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SKILL TRACKER */}
      <div className="bg-[#06080f]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <h2 className="text-white font-black text-sm tracking-widest uppercase mb-6 border-b border-white/10 pb-2 drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]">
          SKILL TRACKER
        </h2>
        <div className="space-y-3">
          <StatRow icon={<Dumbbell size={12} />} label="Financial" value={stats.str} />
          <StatRow icon={<Brain size={12} />} label="Learning" value={stats.int} />
          <StatRow icon={<Target size={12} />} label="Value Earn" value={stats.wis} />
          <StatRow icon={<Flame size={12} />} label="Editing" value={stats.wil} />
          <StatRow icon={<Activity size={12} />} label="Creativity" value={stats.rec} />
        </div>
      </div>

      {/* GOAL COMPLETION (XP CIRCLE) */}
      <div className="bg-[#06080f]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col shadow-[0_0_15px_rgba(0,0,0,0.5)] relative overflow-hidden">
         {xpToNextLevel === 0 && currentLevel > 1 && (
           <div className="absolute inset-0 bg-[#8b5cf6]/10 animate-pulse pointer-events-none"></div>
         )}
         <h2 className="text-white font-black text-sm tracking-widest uppercase mb-4 w-full text-left drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]">Quest Progression</h2>
         <div className="flex flex-col md:flex-row items-center gap-6">
           <div className="relative flex items-center justify-center w-28 h-28">
              <svg className="transform -rotate-90 w-28 h-28">
                <circle cx="56" cy="56" r={radius} stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/5" />
                <circle
                  cx="56" cy="56" r={radius} stroke="currentColor" strokeWidth="10" fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="text-[#8b5cf6] drop-shadow-[0_0_10px_rgba(139,92,246,0.8)] transition-all duration-1000 ease-in-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-xl font-black text-white drop-shadow-[0_0_5px_rgba(139,92,246,0.8)]">XP</span>
                <span className="text-xs text-[#a78bfa] font-bold">{xpToNextLevel}%</span>
              </div>
           </div>
           
           <div className="flex-1 text-center md:text-left space-y-2">
             <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Status</p>
                <p className={`text-sm font-bold ${xpToNextLevel === 0 && currentLevel > 1 ? 'text-emerald-400 animate-pulse' : 'text-[#a78bfa]'}`}>
                  {xpToNextLevel === 0 && currentLevel > 1 ? 'LEVEL UP ACHIEVED!' : 'Grinding Quests...'}
                </p>
             </div>
             <p className="text-xs text-slate-500 font-medium">
               Complete quests to earn XP. Every 5 completed quests grants a Level Up and boosts your baseline stats.
             </p>
           </div>
         </div>
      </div>

    </div>
  );
}
