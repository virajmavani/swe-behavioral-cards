"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { AppState, Card, Competency, CardFormat } from '@/types';

// Default competencies
export const defaultCompetencies: Competency[] = [
  {
    id: 'leadership',
    name: 'Leadership',
    description: 'Demonstrating leadership qualities and taking initiative',
    cards: [],
  },
  {
    id: 'teamwork',
    name: 'Teamwork',
    description: 'Working effectively with others to achieve common goals',
    cards: [],
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    description: 'Analyzing issues and creating effective solutions',
    cards: [],
  },
  {
    id: 'communication',
    name: 'Communication',
    description: 'Clearly conveying information and ideas',
    cards: [],
  },
  {
    id: 'adaptability',
    name: 'Adaptability',
    description: 'Responding positively to change and uncertainty',
    cards: [],
  },
];

const defaultState: AppState = {
  competencies: defaultCompetencies,
  settings: {
    autoSave: true,
  },
};

const LOCAL_STORAGE_KEY = 'behavioral-interview-prep';

interface AppContextType {
  state: AppState;
  addCard: (competencyId: string, title: string, format: CardFormat) => void;
  updateCard: (competencyId: string, card: Card) => void;
  deleteCard: (competencyId: string, cardId: string) => void;
  addCompetency: (name: string, description: string) => void;
  updateCompetency: (id: string, name: string, description: string) => void;
  deleteCompetency: (id: string) => void;
  updateSettings: (settings: AppState['settings']) => void;
  resetData: () => void;
  resetToDefaultCompetencies: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AppState>(defaultState);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data from localStorage - only run on client side
  useEffect(() => {
    // This ensures the code only runs in the browser, not during server-side rendering
    if (typeof window !== 'undefined') {
      try {
        const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedState) {
          setState(JSON.parse(savedState));
        }
      } catch (error) {
        console.error('Failed to load data from localStorage:', error);
      } finally {
        setIsInitialized(true);
      }
    }
  }, []);

  // Save data to localStorage when state changes - only run on client side
  useEffect(() => {
    // Only run when initialized and in browser environment
    if (isInitialized && typeof window !== 'undefined') {
      if (!state.settings.autoSave) return;
      
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save data to localStorage:', error);
      }
    }
  }, [state, isInitialized]);

  const addCard = (competencyId: string, title: string, format: CardFormat) => {
    // Use a safer ID generation method that works on both server and client
    const generateId = () => {
      return Math.random().toString(36).substring(2, 15) + 
             Math.random().toString(36).substring(2, 15);
    };
    
    const newCard: Card = {
      id: generateId(),
      title,
      format,
      content: {},
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setState((prev) => ({
      ...prev,
      competencies: prev.competencies.map((comp) =>
        comp.id === competencyId
          ? { ...comp, cards: [...comp.cards, newCard] }
          : comp
      ),
    }));
  };

  const updateCard = (competencyId: string, updatedCard: Card) => {
    setState((prev) => ({
      ...prev,
      competencies: prev.competencies.map((comp) =>
        comp.id === competencyId
          ? {
              ...comp,
              cards: comp.cards.map((card) =>
                card.id === updatedCard.id
                  ? { ...updatedCard, updatedAt: Date.now() }
                  : card
              ),
            }
          : comp
      ),
    }));
  };

  const deleteCard = (competencyId: string, cardId: string) => {
    setState((prev) => ({
      ...prev,
      competencies: prev.competencies.map((comp) =>
        comp.id === competencyId
          ? { ...comp, cards: comp.cards.filter((card) => card.id !== cardId) }
          : comp
      ),
    }));
  };

  const addCompetency = (name: string, description: string) => {
    // Create a slug-like ID but with a timestamp to ensure uniqueness
    const generateId = () => {
      return name.toLowerCase().replace(/\s+/g, '-') + 
             '-' + Date.now().toString().substring(8);
    };
    
    const newCompetency: Competency = {
      id: generateId(),
      name,
      description,
      cards: [],
    };

    setState((prev) => ({
      ...prev,
      competencies: [...prev.competencies, newCompetency],
    }));
  };

  const updateCompetency = (id: string, name: string, description: string) => {
    setState((prev) => ({
      ...prev,
      competencies: prev.competencies.map((comp) =>
        comp.id === id
          ? { ...comp, name, description }
          : comp
      ),
    }));
  };

  const deleteCompetency = (id: string) => {
    setState((prev) => ({
      ...prev,
      competencies: prev.competencies.filter((comp) => comp.id !== id),
    }));
  };

  const updateSettings = (settings: AppState['settings']) => {
    setState((prev) => ({
      ...prev,
      settings,
    }));
  };

  const resetData = () => {
    setState(defaultState);
  };

  const resetToDefaultCompetencies = () => {
    setState(prev => ({
      ...prev,
      competencies: defaultCompetencies
    }));
  };

  return (
    <AppContext.Provider
      value={{
        state,
        addCard,
        updateCard,
        deleteCard,
        addCompetency,
        updateCompetency,
        deleteCompetency,
        updateSettings,
        resetData,
        resetToDefaultCompetencies,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};