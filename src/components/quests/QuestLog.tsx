import { useState } from 'react';
import { CheckSquare, Square, Plus, Trash2 } from 'lucide-react';
import { Quest, StatType } from '../../types';

interface QuestLogProps {
  timeString: string;
  dateString: string;
  weekdayString: string;
  quests: Quest[];
  currentQuest: Quest | undefined;
  currentQuestKey: string;
  completedQuests: string[];
  toggleItem: (key: string) => void;
  addQuest: (quest: Quest) => void;
  removeQuest: (id: number) => void;
  dayOfWeek: number;
}

export function QuestLog({
  timeString,
  dateString,
  weekdayString,
  quests,
  currentQuest,
  currentQuestKey,
  completedQuests,
  toggleItem,
  addQuest,
  removeQuest,
  dayOfWeek
}: QuestLogProps) {
  
  const [newQuestTitle, setNewQuestTitle] = useState('');
  const [newQuestStart, setNewQuestStart] = useState('08:00');
  const [newQuestEnd, setNewQuestEnd] = useState('09:00');
  const [newQuestStat, setNewQuestStat] = useState<StatType>('STR');

  const getRoutineType = () => {
    if (dayOfWeek === 0) return 'Sunday';
    if (dayOfWeek === 6) return 'Saturday';
    return 'Weekdays';
  };

  const handleAddQuest = () => {
    if (!newQuestTitle) return;
    const newQuest: Quest = {
      id: Date.now(),
      title: newQuestTitle,
      start: newQuestStart,
      end: newQuestEnd,
      stat: newQuestStat
    };
    addQuest(newQuest);
    setNewQuestTitle('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#06080f]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <h2 className="text-white font-black text-sm tracking-widest uppercase mb-2">SYSTEM CLOCK</h2>
        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] tracking-tight drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] mb-1">
          {timeString}
        </div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
          {dateString} | {weekdayString}
        </p>
        {currentQuest && (
          <div className="border border-[#8b5cf6]/50 bg-[#8b5cf6]/10 p-4 rounded-xl text-left shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <p className="text-[10px] font-black text-[#a78bfa] tracking-widest uppercase mb-1 drop-shadow-[0_0_5px_rgba(167,139,250,0.8)] animate-pulse">[IN PROGRESS]</p>
            <p className="text-sm font-bold text-white">{currentQuest.title} ({currentQuest.start} - {currentQuest.end})</p>
          </div>
        )}
      </div>

      <div className="bg-[#06080f]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex flex-col max-h-[800px]">
        <h2 className="text-white font-black text-sm tracking-widest uppercase mb-4 border-b border-white/10 pb-2 flex justify-between items-end">
          <span>ACTIVE QUESTS</span>
          <span className="text-[10px] text-slate-500">Routine: {getRoutineType()}</span>
        </h2>
        
        <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {quests.map((q) => {
            const questKey = `${q.id}-${currentQuestKey}`;
            const done = completedQuests.includes(questKey);
            const active = currentQuest?.id === q.id;

            return (
              <div
                key={q.id}
                className={`group p-3 rounded-xl flex items-center justify-between border transition-all ${active
                  ? 'border-[#8b5cf6] bg-[#8b5cf6]/10 shadow-[0_0_10px_rgba(139,92,246,0.2)]'
                  : done
                    ? 'border-transparent opacity-50 bg-white/5'
                    : 'border-transparent bg-white/5 hover:border-white/20'
                  }`}
              >
                <div 
                  className="flex items-center gap-4 cursor-pointer flex-1"
                  onClick={() => toggleItem(questKey)}
                >
                  {done ? <CheckSquare size={18} className="text-[#a78bfa] drop-shadow-[0_0_5px_rgba(167,139,250,0.8)]" /> : <Square size={18} className="text-slate-500" />}
                  <span className={`text-[11px] font-mono font-bold ${active ? 'text-[#a78bfa]' : 'text-slate-500'}`}>{q.start}</span>
                  <span className={`text-sm font-bold ${active ? 'text-white' : 'text-slate-300'}`}>{q.title}</span>
                </div>
                <button 
                  onClick={() => removeQuest(q.id)}
                  className="text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Add Quest Form */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
          <input 
            type="text" 
            placeholder="New Quest Title..." 
            value={newQuestTitle}
            onChange={(e) => setNewQuestTitle(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#8b5cf6]"
          />
          <div className="flex gap-2">
            <input 
              type="time" 
              value={newQuestStart}
              onChange={(e) => setNewQuestStart(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-xs text-white focus:outline-none focus:border-[#8b5cf6] flex-1"
            />
            <select
              value={newQuestStat}
              onChange={(e) => setNewQuestStat(e.target.value as StatType)}
              className="bg-[#06080f] border border-white/10 rounded-lg px-2 py-2 text-xs text-white focus:outline-none focus:border-[#8b5cf6] flex-1"
            >
              <option value="STR">STR (Financial)</option>
              <option value="INT">INT (Learning)</option>
              <option value="WIS">WIS (Value Earn)</option>
              <option value="WIL">WIL (Editing)</option>
              <option value="REC">REC (Creativity)</option>
            </select>
            <button 
              onClick={handleAddQuest}
              className="bg-white/10 hover:bg-[#8b5cf6]/20 text-white p-2 rounded-lg transition-colors border border-white/10 hover:border-[#8b5cf6]/50"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
