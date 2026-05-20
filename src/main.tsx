import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import './index.css'

declare global {
  interface Window {
    electronAPI: {
      getCompletedQuests: () => Promise<string[]>;
      saveCompletedQuests: (quests: string[]) => Promise<void>;
    }
  }
}

ReactDom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)