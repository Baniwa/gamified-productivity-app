import { useState, useEffect } from 'react';
import { getDailyQuests, SPECIAL_PROJECTS } from '../data/initialState';
import { PlayerStats, Quest, Project } from '../types';

interface HabitHistory {
  [dateStr: string]: number; // date string -> number of completed quests
}

export function useQuestSystem(dayOfWeek: number, currentTime: Date) {
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [customQuests, setCustomQuests] = useState<Quest[]>([]);
  const [customProjects, setCustomProjects] = useState<Project[]>([]);
  const [habitHistory, setHabitHistory] = useState<HabitHistory>({});

  const currentQuestKey = currentTime.toDateString();

  useEffect(() => {
    const savedCompleted = localStorage.getItem('questlog_completed');
    const savedCustomQuests = localStorage.getItem('questlog_custom_quests');
    const savedCustomProjects = localStorage.getItem('questlog_custom_projects');
    const savedHistory = localStorage.getItem('questlog_history');

    if (savedCompleted) setCompletedQuests(JSON.parse(savedCompleted));
    if (savedCustomQuests) setCustomQuests(JSON.parse(savedCustomQuests));
    if (savedCustomProjects) {
      setCustomProjects(JSON.parse(savedCustomProjects));
    } else {
      setCustomProjects(SPECIAL_PROJECTS);
    }
    if (savedHistory) setHabitHistory(JSON.parse(savedHistory));
  }, []);

  // Update history when a quest is completed today
  const updateHistory = (newCompletedArray: string[]) => {
    const todayCompleted = newCompletedArray.filter(k => k.endsWith(currentQuestKey)).length;
    const newHistory = { ...habitHistory, [currentQuestKey]: todayCompleted };
    setHabitHistory(newHistory);
    localStorage.setItem('questlog_history', JSON.stringify(newHistory));
  };

  const quests = customQuests.length > 0 ? customQuests : getDailyQuests(dayOfWeek);

  const currentQuest = quests.find(q => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    const [startH, startM] = q.start.split(':').map(Number);
    const [endH, endM] = q.end.split(':').map(Number);
    return now >= (startH * 60 + startM) && now < (endH * 60 + endM);
  });

  const toggleItem = (key: string) => {
    const updated = completedQuests.includes(key)
      ? completedQuests.filter(k => k !== key)
      : [...completedQuests, key];

    setCompletedQuests(updated);
    localStorage.setItem('questlog_completed', JSON.stringify(updated));
    updateHistory(updated);
  };

  const addQuest = (quest: Quest) => {
    const updated = [...quests, quest].sort((a, b) => a.start.localeCompare(b.start));
    setCustomQuests(updated);
    localStorage.setItem('questlog_custom_quests', JSON.stringify(updated));
  };

  const removeQuest = (id: number) => {
    const updated = quests.filter(q => q.id !== id);
    setCustomQuests(updated);
    localStorage.setItem('questlog_custom_quests', JSON.stringify(updated));
  };

  const addProject = (project: Project) => {
    const updated = [...customProjects, project];
    setCustomProjects(updated);
    localStorage.setItem('questlog_custom_projects', JSON.stringify(updated));
  };
  
  const removeProject = (id: string) => {
    const updated = customProjects.filter(p => p.id !== id);
    setCustomProjects(updated);
    localStorage.setItem('questlog_custom_projects', JSON.stringify(updated));
  };

  const totalCompleted = completedQuests.length;
  const currentLevel = Math.floor(totalCompleted / 5) + 1;
  const xpToNextLevel = (totalCompleted % 5) * 20;

  const stats: PlayerStats = {
    str: completedQuests.filter(k => quests.find(q => q.stat === 'STR' && k.startsWith(`${q.id}-`))).length * 12,
    int: completedQuests.filter(k => quests.find(q => q.stat === 'INT' && k.startsWith(`${q.id}-`))).length * 15,
    wis: completedQuests.filter(k => quests.find(q => q.stat === 'WIS' && k.startsWith(`${q.id}-`))).length * 10,
    wil: completedQuests.filter(k => quests.find(q => q.stat === 'WIL' && k.startsWith(`${q.id}-`))).length * 20,
    rec: completedQuests.filter(k => quests.find(q => q.stat === 'REC' && k.startsWith(`${q.id}-`))).length * 15,
  };

  // Generate last 7 days for the chart
  const getChartData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(currentTime);
      d.setDate(d.getDate() - i);
      const key = d.toDateString();
      const shortDay = d.toLocaleDateString('en-US', { weekday: 'short' });
      data.push({ name: shortDay, value: habitHistory[key] || 0 });
    }
    return data;
  };

  return {
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
    chartData: getChartData()
  };
}
