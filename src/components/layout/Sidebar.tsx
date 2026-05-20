import { LayoutDashboard, Sword, Shield, Map, Scroll, HelpCircle } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'quests', label: 'Active Quests', icon: <Sword size={18} /> },
    { id: 'projects', label: 'Projects Board', icon: <Map size={18} /> },
    { id: 'stats', label: 'Status & Skills', icon: <Shield size={18} /> },
    { id: 'journal', label: 'Grimoire (Journal)', icon: <Scroll size={18} /> },
  ];

  return (
    <div className="w-64 h-full bg-[#06080f]/80 backdrop-blur-xl border-r border-white/5 flex flex-col p-6 hidden lg:flex">
      <div className="mb-10 flex items-center gap-2 text-white font-bold text-xl font-mono">
        <span className="text-[#8b5cf6]">&lt;</span>QuestLog<span className="text-[#8b5cf6]"> /&gt;</span>
      </div>

      <div className="flex-1 space-y-2">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">General</p>
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
              activeTab === item.id 
                ? 'bg-[#8b5cf6]/10 text-[#a78bfa] border border-[#8b5cf6]/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]' 
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-auto">
        <div className="bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] rounded-xl p-4 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
          <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
            <HelpCircle size={16} /> Need Help?
          </div>
          <p className="text-white/70 text-xs mb-3">Upgrade your system or check the latest patch notes.</p>
          <button 
            onClick={() => window.open('https://github.com/Baniwa/gamified-productivity-app/commits/main', '_blank')}
            className="w-full bg-white text-[#6d28d9] font-bold text-xs py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            System Update
          </button>
        </div>
      </div>
    </div>
  );
}
