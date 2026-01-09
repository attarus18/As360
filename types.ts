export interface User {
  id: string;
  username: string;
  full_name: string; // Mapped from DB column
  company_name: string; // Mapped from DB column
  onedrive_url: string; // The specific folder link from DB
  password?: string; // Optional, used only for admin reference/editing
}

export enum FileType {
  PDF = 'PDF',
  XLSX = 'XLSX',
  DOCX = 'DOCX',
  IMG = 'IMG'
}

export interface ClientFile {
  id: string;
  ownerId: string;
  name: string;
  date: string;
  size: string;
  type: FileType;
  downloadUrl: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}