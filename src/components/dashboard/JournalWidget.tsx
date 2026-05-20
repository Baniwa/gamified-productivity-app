import { useState, useEffect } from 'react';
import { BookOpen, Save } from 'lucide-react';

interface JournalWidgetProps {
  className?: string;
}

export function JournalWidget({ className = 'h-72' }: JournalWidgetProps) {
  const [content, setContent] = useState('');
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('nexus_journal_content');
    if (saved) {
      setContent(saved);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('nexus_journal_content', content);
    setIsSaved(true);
  };

  // Auto-save when clicking outside or unmounting might be good, but manual save is fine for now
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isSaved) {
        handleSave();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [content, isSaved]);

  return (
    <div className={`bg-[#06080f]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex flex-col ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-black text-sm tracking-widest uppercase flex items-center gap-2 drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]">
          <BookOpen size={16} className="text-[#a78bfa]" />
          Adventurer's Journal
        </h2>
        <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 transition-opacity ${isSaved ? 'text-emerald-400 opacity-50' : 'text-slate-400'}`}>
          <Save size={12} />
          {isSaved ? 'Saved' : 'Saving...'}
        </span>
      </div>

      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Document your thoughts, ideas, or daily learnings..."
        className="flex-1 w-full bg-transparent border-none resize-none text-sm text-slate-300 focus:outline-none scrollbar-thin scrollbar-thumb-white/10 placeholder:text-slate-600"
      />
    </div>
  );
}
