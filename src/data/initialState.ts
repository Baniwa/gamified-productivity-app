import { Quest, Project } from '../types';

export const INSPIRATIONAL_QUOTES = [
  "Peace comes from within. Do not seek it without.",
  "What we are is the consequence of what we think.",
  "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
  "Three things cannot be long hidden: the sun, the moon, and the truth.",
  "The root of suffering is attachment.",
  "Be a lamp unto yourself.",
  "Every morning we are born again. What we do today is what matters most.",
  "Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else; you are the one who gets burned.",
  "The mind is everything. What you think you become.",
  "Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened."
];

export const SPECIAL_PROJECTS: Project[] = [
  { id: 'proj-fitness', title: 'Complete Marathon Prep', rank: 'S-Rank' },
  { id: 'proj-finance', title: 'Q3 Trading Operations', rank: 'B-Rank' },
  { id: 'proj-consulting', title: 'Client Architecture Review', rank: 'A-Rank' },
  { id: 'proj-home', title: 'Home Office Setup', rank: 'C-Rank' },
  { id: 'proj-pet', title: 'Dog Training Program', rank: 'C-Rank' },
];

export const getDailyQuests = (dayOfWeek: number): Quest[] => {
  if (dayOfWeek === 0) { // Sunday
    return [
      { id: 101, start: '08:00', end: '10:00', title: 'Gate: Weekly Planning', stat: 'WIL' },
      { id: 102, start: '10:00', end: '12:00', title: 'Quest: Free Time / Recovery', stat: 'REC' },
      { id: 103, start: '12:00', end: '14:00', title: 'Event: Family Lunch', stat: 'REC' },
      { id: 104, start: '14:00', end: '17:30', title: 'Dungeon: Leisure / Organization', stat: 'REC' },
      { id: 105, start: '17:30', end: '18:30', title: 'Quest: Outdoor Walk', stat: 'STR' },
      { id: 106, start: '18:30', end: '20:30', title: 'Main Quest: Meal Prep', stat: 'WIL' },
      { id: 107, start: '20:30', end: '21:30', title: 'Gate: Sleep Hygiene / OFF', stat: 'REC' },
    ];
  }

  if (dayOfWeek === 6) { // Saturday
    return [
      { id: 201, start: '08:00', end: '12:00', title: 'Quest: Home Organization / Shopping', stat: 'STR' },
      { id: 202, start: '12:00', end: '14:00', title: 'Event: Free Lunch', stat: 'REC' },
      { id: 203, start: '14:00', end: '17:30', title: 'Skill Quest: Deep Study', stat: 'WIS' },
      { id: 204, start: '17:30', end: '18:30', title: 'Quest: Outdoor Walk', stat: 'STR' },
      { id: 205, start: '18:30', end: '20:00', title: 'Gate: Financial Review', stat: 'INT' },
      { id: 206, start: '20:00', end: '21:30', title: 'Dungeon: Movie / Reading', stat: 'REC' },
    ];
  }

  const quests: Quest[] = [
    { id: 1, start: '05:45', end: '06:15', title: 'Water Ritual (500ml)', stat: 'REC' },
    { id: 4, start: '08:00', end: '08:45', title: 'Survival Walk', stat: 'STR' },
    { id: 7, start: '11:00', end: '12:00', title: 'Daily Sync Meeting', stat: 'WIL' },
    { id: 8, start: '12:00', end: '14:00', title: 'Nutrition + Writing', stat: 'REC' },
    { id: 9, start: '14:00', end: '17:30', title: 'Main Quest: Deep Work', stat: 'INT' },
    { id: 11, start: '18:30', end: '19:30', title: 'Skill Study / Upskilling', stat: 'WIS' },
    { id: 13, start: '20:30', end: '21:30', title: 'Shutdown Gate: OFF', stat: 'WIL' },
  ];

  if ([1, 3, 5].includes(dayOfWeek)) {
    quests.push({ id: 2, start: '06:30', end: '07:45', title: 'Dungeon: Weightlifting', stat: 'STR' });
    quests.push({ id: 10, start: '17:30', end: '18:15', title: 'Volume Training (Run)', stat: 'STR' });
  } else if ([2, 4].includes(dayOfWeek)) {
    quests.push({ id: 3, start: '06:15', end: '08:00', title: 'Focus Sprint (Dev)', stat: 'INT' });
    quests.push({ id: 6, start: '09:10', end: '10:10', title: 'Dungeon: Swimming', stat: 'STR' });
    quests.push({ id: 10, start: '17:30', end: '18:15', title: 'Interval Training (HIIT)', stat: 'STR' });
  }

  return quests.sort((a, b) => a.start.localeCompare(b.start));
};
