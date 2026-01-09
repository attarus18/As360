import React, { useState } from 'react';
import { User } from '../types';
import { supabase } from '../services/supabaseClient';

interface LoginProps {
  onLogin: (user: User) => void;
  onAdminLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onAdminLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 0. Controllo Credenziali Amministratore (Hardcoded come richiesto)
      if (username === 'attarus18@gmail.com' && password === 'Uuceau!8$') {
        onAdminLogin();
        return;
      }

      // 1. Tenta il login Cliente con Supabase
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (data && !error) {
        // Login Supabase riuscito
        const user: User = {
          id: data.id,
          username: data.username,
          full_name: data.full_name,
          company_name: data.company_name,
          onedrive_url: data.onedrive_url
        };
        onLogin(user);
        return;
      } 
      
      // 2. Fallback Demo (Se Supabase non è configurato o non trova l'utente, e vogliamo testare la UI)
      const isDemoLogin = username === 'mario' && password === 'asso360';
      const isSupabaseConfigured = process.env.SUPABASE_URL && process.env.SUPABASE_URL.length > 0;

      if (!isSupabaseConfigured && isDemoLogin) {
         // Utente Mock per Demo
         const demoUser: User = {
           id: 'demo-1',
           username: 'mario',
           full_name: 'Mario Rossi',
           company_name: 'Rossi SRL',
           onedrive_url: 'https://onedrive.live.com/login/' 
         };
         setTimeout(() => onLogin(demoUser), 800);
         return;
      }

      // Se arriviamo qui, le credenziali sono sbagliate (sia DB che Admin che Demo)
      setShowErrorModal(true);

    } catch (err) {
      console.error("Login error:", err);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      {/* Main Login Card */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-blue-800">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-800 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Assoimpresa360</h1>
          <p className="text-slate-500 text-sm mt-2">Portale Clienti</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nome Utente o Email</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Inserisci credenziali"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Accedi"
            )}
          </button>
        </form>
      </div>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 border-t-4 border-red-500">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-center text-slate-800 mb-2">Accesso Negato</h3>
            <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-6">
                 <p className="text-sm text-red-800 text-center font-medium">
                  Credenziali non valide
                 </p>
                 <p className="text-xs text-red-600 text-center mt-2">
                  Le credenziali di accesso sono fornite esclusivamente dallo studio per i propri clienti.
                </p>
            </div>
           
            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Chiudi avviso
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;