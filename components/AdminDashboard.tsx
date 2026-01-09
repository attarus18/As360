import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { User } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [clients, setClients] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    full_name: '',
    company_name: '',
    onedrive_url: ''
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('company_name', { ascending: true });
        
      if (error) throw error;
      if (data) setClients(data as User[]);
    } catch (error) {
      console.error('Error fetching clients:', error);
      alert('Errore nel caricamento dei clienti');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      full_name: '',
      company_name: '',
      onedrive_url: ''
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleEdit = (client: User) => {
    setFormData({
      username: client.username,
      password: client.password || '', // Password might not be readable depending on security, assuming plain text for this requirement
      full_name: client.full_name,
      company_name: client.company_name,
      onedrive_url: client.onedrive_url
    });
    setCurrentId(client.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo cliente?')) return;
    
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      fetchClients();
    } catch (error) {
      console.error('Error deleting client:', error);
      alert("Errore durante l'eliminazione");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (isEditing && currentId) {
        // Update
        const { error } = await supabase
          .from('clients')
          .update(formData)
          .eq('id', currentId);
          
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from('clients')
          .insert([formData]);
          
        if (error) throw error;
      }
      
      resetForm();
      fetchClients();
    } catch (error) {
      console.error('Error saving client:', error);
      alert("Errore durante il salvataggio. Assicurati che lo username sia unico.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Header */}
      <header className="bg-slate-900 text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="bg-slate-700 p-1.5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
             </div>
             <div>
                 <h1 className="text-xl font-bold">Gestione Studio</h1>
                 <p className="text-xs text-slate-400">Pannello Amministratore</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-sm text-slate-300">attarus18@gmail.com</span>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Esci
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    {isEditing ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Modifica Cliente
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Nuovo Cliente
                        </>
                    )}
                </h2>
                {isEditing && (
                    <button onClick={resetForm} className="text-sm text-slate-500 hover:text-slate-800 underline">
                        Annulla modifica
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nome Referente</label>
                        <input
                            type="text"
                            required
                            placeholder="Es. Mario Rossi"
                            value={formData.full_name}
                            onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Ragione Sociale / Azienda</label>
                        <input
                            type="text"
                            required
                            placeholder="Es. Rossi SRL"
                            value={formData.company_name}
                            onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Link Cartella OneDrive</label>
                        <input
                            type="url"
                            required
                            placeholder="https://onedrive.live.com/..."
                            value={formData.onedrive_url}
                            onChange={(e) => setFormData({...formData, onedrive_url: e.target.value})}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm"
                        />
                    </div>
                </div>
                <div className="space-y-4">
                     <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-semibold text-slate-800 mb-3">Credenziali di Accesso</h3>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                            <input
                                type="text"
                                required
                                placeholder="Username univoco"
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div className="mt-3">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input
                                type="text"
                                required
                                placeholder="Password cliente"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono"
                            />
                        </div>
                     </div>
                     <div className="flex items-end justify-end h-full pb-1">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className={`w-full md:w-auto px-6 py-3 rounded-lg text-white font-semibold transition-colors shadow-md ${
                                isEditing 
                                ? 'bg-amber-600 hover:bg-amber-700' 
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {isSaving ? 'Salvataggio...' : (isEditing ? 'Aggiorna Cliente' : 'Crea Cliente')}
                        </button>
                     </div>
                </div>
            </form>
        </div>

        {/* List Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Lista Clienti ({clients.length})</h3>
                <button onClick={fetchClients} className="text-slate-500 hover:text-blue-600" title="Ricarica lista">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>
            
            {isLoading ? (
                 <div className="p-8 text-center text-slate-500">Caricamento clienti...</div>
            ) : clients.length === 0 ? (
                 <div className="p-8 text-center text-slate-500">Nessun cliente trovato.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
                                <th className="p-4 border-b border-slate-200 font-semibold">Azienda / Nome</th>
                                <th className="p-4 border-b border-slate-200 font-semibold">Username</th>
                                <th className="p-4 border-b border-slate-200 font-semibold">Password</th>
                                <th className="p-4 border-b border-slate-200 font-semibold text-center">OneDrive</th>
                                <th className="p-4 border-b border-slate-200 font-semibold text-right">Azioni</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {clients.map((client) => (
                                <tr key={client.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="p-4">
                                        <div className="font-medium text-slate-900">{client.company_name}</div>
                                        <div className="text-sm text-slate-500">{client.full_name}</div>
                                    </td>
                                    <td className="p-4 text-sm text-slate-700 font-mono bg-slate-50/50">{client.username}</td>
                                    <td className="p-4 text-sm text-slate-700 font-mono bg-slate-50/50">{client.password}</td>
                                    <td className="p-4 text-center">
                                        <a href={client.onedrive_url} target="_blank" rel="noreferrer" className="inline-block text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => handleEdit(client)}
                                                className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                title="Modifica"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(client.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Elimina"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;