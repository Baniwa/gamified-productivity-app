# 🌌 Nexus Dashboard | Productivity & RPG

A highly customized, gamified productivity dashboard designed to turn daily routines and tasks into an RPG-style experience. The project emphasizes a premium **Glassmorphism** dark mode aesthetic with dynamic API integrations.

## 🚀 Features

- **Gamified Progression System:** Earn XP by completing tasks and level up your character. The XP ring visually tracks your progress, pulsating when a Level Up is achieved.
- **Glassmorphism Aesthetics:** Beautiful, frosted glass panels (`backdrop-blur`) layered over neon glowing orbs in a deep dark background (`#06080f`).
- **Live Marketplace Data:** Real-time crypto (Bitcoin, Ethereum, Solana) and stock data (PETR4, VALE3) fetched via public APIs (`CoinGecko` & `Brapi`).
- **RPG Hydration Tracker:** Monitor your daily water intake with visual potion flasks. Adjust intervals dynamically and track your hydration streaks.
- **Deep Work Pomodoro:** An integrated 25/5 minute focus timer with glowing borders, pulsating UI, browser notification alerts, and sound cues to maximize productivity.
- **Adventurer's Grimoire:** A persistent Markdown journal widget that automatically saves your thoughts and daily learnings locally.
- **Kanban Projects Board:** A streamlined "To-Do/Done" project manager.
- **Privacy First (Local Storage):** All tasks, XP, profiles, and journals are saved securely in your browser's local storage. No login required.

## 🛠️ Technology Stack

- **React 18**
- **Vite**
- **TypeScript**
- **Tailwind CSS v4** (Utility-first styling, Glassmorphism design)
- **Recharts** (Habit tracking bar charts)
- **Lucide React** (RPG and Interface icons)

## 🎮 How to Run Locally

1. Clone the repository:
```bash
git clone https://github.com/Baniwa/gamified-productivity-app.git
```
2. Navigate into the directory:
```bash
cd gamified-productivity-app
```
3. Install dependencies:
```bash
npm install
```
4. Start the development server:
```bash
npm run dev
```

## ✨ Design Decisions & Professionalism

This application was designed to demonstrate proficiency in modern frontend architecture. It moves away from generic UI libraries to implement a bespoke design language. The component structure separates concerns effectively, utilizing custom React Hooks (`useQuestSystem`, `useTimeSystem`) to handle domain logic outside of the UI presentation layer.

---

> *"The boundary between work and play is a matter of perspective."*
