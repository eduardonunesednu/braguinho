
export type Role = 'user' | 'model';

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
  audioUrl?: string;
}

export interface BriguinhoConfig {
  apiKey: string;
  systemInstruction: string;
}
