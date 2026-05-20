export type StatType = 'STR' | 'INT' | 'WIS' | 'WIL' | 'REC';

export interface Quest {
  id: number;
  start: string; // HH:mm
  end: string;   // HH:mm
  title: string;
  stat: StatType;
}

export interface Project {
  id: string;
  title: string;
  rank: string;
}

export interface PlayerStats {
  str: number;
  int: number;
  wis: number;
  wil: number;
  rec: number;
}
