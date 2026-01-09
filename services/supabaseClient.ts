import { createClient } from '@supabase/supabase-js';

// Le variabili d'ambiente devono essere impostate nel sistema.
// Se non sono presenti, le chiamate al database falliranno e l'app userà la modalità demo (in Login.tsx).
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

// Inizializza il client. Se l'URL è vuoto, createClient potrebbe avvisare in console, 
// ma la gestione degli errori è delegata ai componenti che usano il client.
export const supabase = createClient(supabaseUrl, supabaseKey);