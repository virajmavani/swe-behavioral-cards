export type CardFormat = 'STAR' | 'CURL';

export interface Card {
  id: string;
  title: string;
  format: CardFormat;
  content: {
    situation?: string;
    task?: string;
    action?: string;
    result?: string;
    challenge?: string;
    understanding?: string;
    response?: string;
    lesson?: string;
  };
  createdAt: number;
  updatedAt: number;
}

export interface Competency {
  id: string;
  name: string;
  description: string;
  cards: Card[];
}

export interface AppState {
  competencies: Competency[];
  settings: {
    autoSave: boolean;
  };
}