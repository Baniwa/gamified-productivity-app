import { useState } from 'react';
import { useTimeSystem } from './hooks/useTimeSystem';
import { useQuestSystem } from './hooks/useQuestSystem';
import { useProfileSystem } from './hooks/useProfileSystem';
import { PlayerStatus } from './components/layout/PlayerStatus';
import { QuestLog } from './components/quests/QuestLog';
import { VigilancePanel } from './components/dashboard/VigilancePanel';
import { SettingsModal } from './components/dashboard/SettingsModal';
import { Sidebar } from './components/layout/Sidebar';
import { MarketWidget } from './components/dashboard/MarketWidget';
import { FocusTimer } from './components/dashboard/FocusTimer';
import { JournalWidget } from './components/dashboard/JournalWidget';

export default function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const {
    currentTime,
    waterTimer,
    drinkWater,
    waterPotions,
    waterInterval,
    changeWaterInterval,
    formatTimer,
    dayOfWeek,
    timeString,
    dateString,
    weekdayString,
    dayOfYear
  } = useTimeSystem();

  const {
    quests,
    customProjects,
    currentQuest,
    currentQuestKey,
    completedQuests,
    toggleItem,
    addQuest,
    removeQuest,
    addProject,
    removeProject,
    currentLevel,
    xpToNextLevel,
    stats,
    chartData
  } = useQuestSystem(dayOfWeek, currentTime);

  const { profile, updateProfile, isLoaded } = useProfileSystem();

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#06080f] text-slate-200 font-sans flex relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8b5cf6]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-6 h-screen overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className={`max-w-[1400px] mx-auto ${activeTab === 'dashboard' ? 'grid grid-cols-1 lg:grid-cols-3 gap-6' : 'flex justify-center'}`}>
          
          {(activeTab === 'dashboard' || activeTab === 'stats') && (
            <div className={`space-y-6 ${activeTab === 'stats' ? 'w-full max-w-2xl' : ''}`}>
              <PlayerStatus 
                currentLevel={currentLevel}
                xpToNextLevel={xpToNextLevel}
                stats={stats}
                profile={profile}
                onOpenSettings={() => setIsSettingsOpen(true)}
              />
              {activeTab === 'dashboard' && <MarketWidget />}
            </div>
          )}

          {(activeTab === 'dashboard' || activeTab === 'quests') && (
            <div className={activeTab === 'quests' ? 'w-full max-w-2xl space-y-6' : 'space-y-6'}>
              <QuestLog 
                timeString={timeString}
                dateString={dateString}
                weekdayString={weekdayString}
                quests={quests}
                currentQuest={currentQuest}
                currentQuestKey={currentQuestKey}
                completedQuests={completedQuests}
                toggleItem={toggleItem}
                addQuest={addQuest}
                removeQuest={removeQuest}
                dayOfWeek={dayOfWeek}
              />
              {activeTab === 'dashboard' && <FocusTimer />}
            </div>
          )}

          {(activeTab === 'dashboard' || activeTab === 'projects' || activeTab === 'history') && (
            <div className={activeTab === 'projects' || activeTab === 'history' ? 'w-full max-w-2xl space-y-6' : 'space-y-6'}>
              <VigilancePanel 
                waterTimer={waterTimer}
                drinkWater={drinkWater}
                waterPotions={waterPotions}
                waterInterval={waterInterval}
                changeWaterInterval={changeWaterInterval}
                formatTimer={formatTimer}
                dayOfYear={dayOfYear}
                completedQuests={completedQuests}
                toggleItem={toggleItem}
                projects={customProjects}
                addProject={addProject}
                removeProject={removeProject}
                chartData={chartData}
              />
              {activeTab === 'dashboard' && <JournalWidget />}
            </div>
          )}

        </div>
      </div>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        profile={profile}
        updateProfile={updateProfile}
      />
    </div>
  );
}