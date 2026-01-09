import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carica le variabili d'ambiente in base al mode (es. production su Vercel)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Polyfill per process.env in modo che il codice esistente funzioni
      // Mappa le variabili VITE_ (richieste da Vercel per il frontend) alle variabili usate nel codice
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY),
      'process.env.SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'process.env.SUPABASE_KEY': JSON.stringify(env.VITE_SUPABASE_KEY),
      // Fallback per sicurezza
      'process.env': {
        API_KEY: env.VITE_API_KEY,
        SUPABASE_URL: env.VITE_SUPABASE_URL,
        SUPABASE_KEY: env.VITE_SUPABASE_KEY
      }
    }
  };
});