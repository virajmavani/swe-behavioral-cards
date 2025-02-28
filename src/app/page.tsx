"use client";

import { useState } from "react";
import * as Accordion from '@radix-ui/react-accordion';
import { useApp } from "@/context/AppContext";
import { Competency } from "@/types";
import CompetencySection from "@/components/CompetencySection";
import CompetencyManager from "@/components/CompetencyManager";
import Settings from "@/components/Settings";

export default function Home() {
  const { state } = useApp();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCompetencyManagerOpen, setIsCompetencyManagerOpen] = useState(false);
  const [editingCompetency, setEditingCompetency] = useState<Competency | null>(null);

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-6 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center">
            <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Behavioral Interview Prep
          </h1>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-md hover:bg-blue-500 bg-blue-600/40 transition-colors"
            aria-label="Settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
        <p className="text-blue-100 max-w-3xl text-lg">
          Prepare your behavioral interview stories using the STAR (Situation, Task, Action, Result) or CURL (Challenge, Understanding, Response, Lesson) formats. Create cards for each competency and organize your stories.
        </p>
        <div className="mt-6 px-4 py-3 bg-white/10 rounded-md text-blue-50 text-sm backdrop-blur-sm border border-white/20">
          <p className="font-semibold flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Pro Tip:
          </p>
          <p>Your stories are automatically saved to your browser's local storage. You can change this in settings.</p>
        </div>
      </header>

      <main>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Competencies</h2>
          <button
            onClick={() => {
              setEditingCompetency(null);
              setIsCompetencyManagerOpen(true);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center font-medium"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M10 4V16M4 10H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Add New Competency
          </button>
        </div>
        
        <Accordion.Root
          type="multiple"
          defaultValue={[state.competencies[0]?.id]}
          className="space-y-4"
        >
          {state.competencies.map((competency) => (
            <CompetencySection 
              key={competency.id} 
              competency={competency} 
              onEdit={() => {
                setEditingCompetency(competency);
                setIsCompetencyManagerOpen(true);
              }}
            />
          ))}
        </Accordion.Root>
        
        {state.competencies.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-700 font-medium mb-4">No competencies available. Add your first competency to get started!</p>
            <button
              onClick={() => {
                setEditingCompetency(null);
                setIsCompetencyManagerOpen(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-flex items-center font-medium"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M10 4V16M4 10H16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Add Competency
            </button>
          </div>
        )}
      </main>

      <footer className="mt-12 text-center text-gray-700 text-sm border-t pt-4">
        <p className="font-medium">
          Behavioral Interview Prep Tool &copy; {new Date().getFullYear()}
        </p>
      </footer>

      <Settings open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
      <CompetencyManager 
        open={isCompetencyManagerOpen} 
        onOpenChange={setIsCompetencyManagerOpen}
        editCompetency={editingCompetency}
      />
    </div>
  );
}
