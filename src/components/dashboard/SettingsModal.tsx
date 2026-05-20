import { useState } from 'react';
import { UserProfile } from '../../hooks/useProfileSystem';
import { X, Save } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  updateProfile: (p: UserProfile) => void;
}

export function SettingsModal({ isOpen, onClose, profile, updateProfile }: SettingsModalProps) {
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);

  if (!isOpen) return null;

  const handleSave = () => {
    updateProfile(tempProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-[#06080f]/90 backdrop-blur-md border border-[#8b5cf6]/50 rounded-2xl w-full max-w-md p-6 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-white uppercase tracking-widest drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]">System Settings</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-[#a78bfa] transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#a78bfa] uppercase tracking-widest mb-1">Player Name</label>
            <input 
              type="text" 
              value={tempProfile.name}
              onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#a78bfa] uppercase tracking-widest mb-1">Class / Job</label>
            <input 
              type="text" 
              value={tempProfile.className}
              onChange={(e) => setTempProfile({...tempProfile, className: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#a78bfa] uppercase tracking-widest mb-1">Avatar Image URL</label>
            <input 
              type="text" 
              value={tempProfile.avatarUrl}
              onChange={(e) => setTempProfile({...tempProfile, avatarUrl: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#8b5cf6]/20 border border-[#8b5cf6] text-[#a78bfa] hover:bg-[#8b5cf6] hover:text-white px-6 py-2 rounded-lg font-bold tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)]"
          >
            <Save size={16} />
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
