import React from 'react';

interface StatRowProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}

export function StatRow({ icon, label, value }: StatRowProps) {
  return (
    <div className="flex items-center justify-between text-sm py-1.5">
      <div className="flex items-center gap-3 text-slate-300 font-bold w-32">
        <div className="bg-[#06080f] p-1.5 rounded-full border border-white/10 text-[#a78bfa] shadow-[0_0_10px_rgba(139,92,246,0.2)]">
          {icon}
        </div>
        <span className="uppercase tracking-widest text-[11px]">{label}</span>
      </div>
      <div className="flex items-center gap-4 flex-1">
        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner">
          <div 
            style={{ width: `${Math.min(100, value * 3)}%` }} 
            className="h-full bg-gradient-to-r from-[#6d28d9] to-[#a78bfa] shadow-[0_0_10px_rgba(139,92,246,0.8)] rounded-full transition-all duration-1000"
          ></div>
        </div>
        <span className="text-white font-mono font-bold w-8 text-right text-xs opacity-80">{value}</span>
      </div>
    </div>
  );
}
