import { ClientFile, FileType } from './types';

// Mock Users rimossi - ora gestiti da Supabase

// Mock Files solo per scopo dimostrativo UI nel caso non si carichi nulla o per layout
// In produzione, idealmente questi verrebbero letti via API OneDrive se ci fosse un'integrazione completa
export const MOCK_FILES: ClientFile[] = [
  {
    id: 'f1',
    ownerId: 'u1',
    name: 'Esempio_Bilancio.pdf',
    date: '2023-12-20',
    size: '2.4 MB',
    type: FileType.PDF,
    downloadUrl: '#'
  }
];