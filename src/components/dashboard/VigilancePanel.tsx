import { useState } from 'react';
import { Droplets, Beaker, PenTool, Columns, Plus, Trash2, Settings2 } from 'lucide-react';
import { Project } from '../../types';
import { INSPIRATIONAL_QUOTES } from '../../data/initialState';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface VigilancePanelProps {
  waterTimer: number;
  drinkWater: () => void;
  formatTimer: (secs: number) => string;
  waterPotions: number;
  waterInterval: number;
  changeWaterInterval: (secs: number) => void;
  dayOfYear: number;
  completedQuests: string[];
  toggleItem: (key: string) => void;
  projects: Project[];
  addProject: (p: Project) => void;
  removeProject: (id: string) => void;
  chartData: {name: string, value: number}[];
}

export function VigilancePanel({
  waterTimer,
  drinkWater,
  formatTimer,
  waterPotions,
  waterInterval,
  changeWaterInterval,
  dayOfYear,
  completedQuests,
  toggleItem,
  projects,
  addProject,
  removeProject,
  chartData
}: VigilancePanelProps) {
  
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [showWaterSettings, setShowWaterSettings] = useState(false);
  const dailyQuote = INSPIRATIONAL_QUOTES[dayOfYear % INSPIRATIONAL_QUOTES.length];

  const handleAddProject = () => {
    if (!newProjectTitle) return;
    addProject({
      id: `p-${Date.now()}`,
      title: newProjectTitle,
      status: 'active'
    });
    setNewProjectTitle('');
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeWaterInterval(Number(e.target.value));
    setShowWaterSettings(false);
  };

  return (
    <div className="space-y-6">
      
      {/* HABIT TRACKER (RECHARTS) */}
      <div className="bg-[#06080f]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <h2 className="text-white font-black text-sm tracking-widest uppercase mb-6 drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]">HABIT TRACKER</h2>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{fill: '#8b5cf6', opacity: 0.1}} 
                contentStyle={{backgroundColor: '#06080f', borderColor: '#8b5cf6', borderRadius: '8px', color: '#fff'}} 
              />
              <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} className="drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#06080f]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex flex-col">
        {/* Water Timer */}
        <div className={`mb-6 p-4 rounded-xl border transition-colors relative ${waterTimer === 0 ? 'bg-blue-900/20 border-blue-500' : 'bg-white/5 border-white/10'}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              Hydration System
              <button onClick={() => setShowWaterSettings(!showWaterSettings)} className="hover:text-[#a78bfa]">
                <Settings2 size={12} />
              </button>
            </h3>
            <p className={`text-xl font-black font-mono ${waterTimer === 0 ? 'text-blue-400 animate-pulse' : 'text-white'}`}>
              {formatTimer(waterTimer)}
            </p>
          </div>

          {showWaterSettings && (
            <div className="mb-4 bg-black/40 p-3 rounded-lg border border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-300">Interval:</span>
              <select 
                value={waterInterval} 
                onChange={handleIntervalChange}
                className="bg-[#06080f] border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-[#8b5cf6]"
              >
                <option value={1800}>30 mins</option>
                <option value={2700}>45 mins</option>
                <option value={3600}>60 mins</option>
                <option value={5400}>90 mins</option>
                <option value={7200}>120 mins</option>
              </select>
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-1 flex-wrap max-w-[70%]">
              {/* Render Potions */}
              {Array.from({ length: Math.max(waterPotions, 1) }).map((_, i) => (
                <div key={i} className={`${i < waterPotions ? 'text-blue-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.8)]' : 'text-slate-600'}`}>
                  <Beaker size={18} />
                </div>
              ))}
            </div>
            <button
              onClick={drinkWater}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                waterTimer === 0 
                  ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.6)] hover:bg-blue-400' 
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              <Droplets size={14} /> Drink
            </button>
          </div>
        </div>

        {/* Philosophy */}
        <div className="mb-8 bg-black/40 p-5 rounded-xl border border-white/5">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex justify-between items-center">
            Philosophy.sys <PenTool size={12} />
          </h3>
          <p className="text-[15px] font-medium text-slate-300 leading-relaxed italic border-l-2 border-[#8b5cf6] pl-3">
            "{dailyQuote}"
          </p>
        </div>

        {/* KANBAN / PROJECTS */}
        <div className="mt-auto">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex justify-between items-center">
            Projects Board <Columns size={12} />
          </h3>
          <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 pr-2">
            {projects.map((project: Project) => {
              const isProjectDone = completedQuests.includes(project.id);
              return (
                <div
                  key={project.id}
                  className={`group flex items-center justify-between p-3 rounded-xl transition-all border ${isProjectDone ? 'bg-[#8b5cf6]/10 border-[#8b5cf6]/30 opacity-60' : 'bg-white/5 border-transparent hover:border-[#8b5cf6]/30 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]'}`}
                >
                  <div 
                    onClick={() => toggleItem(project.id)}
                    className="flex-1 cursor-pointer flex justify-between items-center pr-3"
                  >
                    <p className={`text-xs font-bold ${isProjectDone ? 'text-slate-400 line-through' : 'text-white'}`}>
                      {project.title}
                    </p>
                    <span className={`text-[9px] px-2 py-0.5 rounded uppercase tracking-widest ${isProjectDone ? 'bg-[#8b5cf6]/20 text-[#a78bfa]' : 'bg-black/50 text-slate-400 border border-white/10'}`}>
                      {isProjectDone ? 'Done' : 'To Do'}
                    </span>
                  </div>
                  <button 
                    onClick={() => removeProject(project.id)}
                    className="text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )
            })}
          </div>
          {/* Add Project Form */}
          <div className="mt-3 flex gap-2">
             <input 
              type="text" 
              placeholder="New Project..." 
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#8b5cf6]"
             />
             <button 
                onClick={handleAddProject}
                className="bg-white/10 hover:bg-[#8b5cf6]/20 text-white p-2 rounded-lg transition-colors border border-white/10 hover:border-[#8b5cf6]/50"
             >
                <Plus size={14} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
