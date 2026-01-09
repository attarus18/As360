import React, { useState } from 'react';
import { User } from '../types';
import Assistant from './Assistant';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
             <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-800 text-white shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
             </div>
             <div>
                <h1 className="text-lg md:text-xl font-bold text-slate-800 leading-none truncate max-w-[150px] md:max-w-none">Assoimpresa360</h1>
                <span className="hidden md:block text-xs text-slate-500 font-medium">Portale Clienti</span>
             </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end text-right">
              <span className="text-xs md:text-sm font-semibold text-slate-700">{user.full_name}</span>
              <span className="text-[10px] md:text-xs text-slate-500 max-w-[100px] md:max-w-[200px] truncate">{user.company_name}</span>
            </div>
            <button
              onClick={onLogout}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors border border-slate-200"
              title="Esci"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb / Info Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>Home</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="font-semibold text-blue-800">Archivio Cloud</span>
            </div>
            
            <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="hidden md:flex items-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-full text-sm font-medium transition-colors w-fit"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Assistenza Virtuale
            </button>
        </div>

        {/* OneDrive Access Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 md:p-16 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-50 rounded-full mb-6 text-blue-600 shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Cartella Documenti Riservata</h2>
                <p className="text-slate-500 max-w-lg mx-auto mb-10 leading-relaxed">
                    Accedi in modo sicuro alla tua cartella personale su OneDrive.
                    <br className="hidden md:block"/>
                    Potrai consultare e scaricare bilanci, dichiarazioni e fatture condivise dallo studio.
                </p>

                {user.onedrive_url ? (
                    <a 
                        href={user.onedrive_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 bg-[#0078D4] hover:bg-[#006cbd] text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-md active:scale-95 group w-full sm:w-auto"
                    >
                        <svg className="w-6 h-6 group-hover:animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M9.702 3.656a.75.75 0 01.398.88l-1.026 3.486 4.75-.01a.75.75 0 01.597 1.208l-5.636 7.153a.75.75 0 01-1.196-.867l1.714-3.522-4.148.006a.75.75 0 01-.58-1.226l5.127-7.108zM15.53 1.545a1.5 1.5 0 011.06.44l5.657 5.657a1.5 1.5 0 010 2.122l-5.657 5.657a1.5 1.5 0 01-2.122 0l-5.657-5.657a1.5 1.5 0 010-2.122l5.657-5.657a1.5 1.5 0 011.06-.44z" opacity="0.0"/> 
                             <path d="M12.753 6.002c1.782 0 3.328.77 4.394 1.996.14.161.272.33.397.505a4.73 4.73 0 011.022-.11 4.747 4.747 0 014.746 4.746 4.747 4.747 0 01-4.746 4.746h-1.993a.56.56 0 00-.007 1.121h2a5.867 5.867 0 005.867-5.867 5.867 5.867 0 00-5.867-5.867c-.237 0-.47.015-.7.043A6.717 6.717 0 0012.753 1.52a6.74 6.74 0 00-6.19 4.29 4.475 4.475 0 00-.918-.095A4.48 4.48 0 001.165 10.2a4.48 4.48 0 004.48 4.48h2.008a.56.56 0 000-1.12H5.645a3.36 3.36 0 01-3.36-3.36 3.36 3.36 0 013.36-3.36c.453 0 .884.092 1.284.258.337.14.721-.017.892-.345.862-1.656 2.585-2.751 4.932-2.751z" fill="white"/>
                        </svg>
                        Apri Cartella OneDrive
                    </a>
                ) : (
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg inline-block text-sm">
                        ⚠️ Link OneDrive non configurato per questo account. Contatta lo studio.
                    </div>
                )}
                
                <p className="mt-8 text-xs text-slate-400">
                    Verrai reindirizzato al portale sicuro Microsoft OneDrive in una nuova scheda.
                </p>
            </div>
        </div>
      </main>

      {/* Floating Action Button for Mobile Chat */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-800 text-white p-4 rounded-full shadow-lg hover:bg-blue-900 transition-transform hover:scale-105 z-50 flex items-center justify-center"
          aria-label="Apri assistente"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chat Component */}
      <Assistant user={user} isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
    </div>
  );
};

export default Dashboard;