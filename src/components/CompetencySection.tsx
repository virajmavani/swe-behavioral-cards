"use client";

import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import * as Dialog from '@radix-ui/react-dialog';
import { Card, Competency, CardFormat } from '@/types';
import { useApp } from '@/context/AppContext';
import CardEditor from './CardEditor';

interface CompetencySectionProps {
  competency: Competency;
  onEdit?: () => void;
}

export default function CompetencySection({ competency, onEdit }: CompetencySectionProps) {
  const { addCard, deleteCard } = useApp();
  const [isNewCardDialogOpen, setIsNewCardDialogOpen] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardFormat, setNewCardFormat] = useState<CardFormat>('STAR');
  const [editingCard, setEditingCard] = useState<Card | null>(null);

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      addCard(competency.id, newCardTitle.trim(), newCardFormat);
      setNewCardTitle('');
      setNewCardFormat('STAR');
      setIsNewCardDialogOpen(false);
    }
  };

  return (
    <Accordion.Item
      value={competency.id}
      className="border rounded-lg overflow-hidden mb-4"
    >
      <Accordion.Header className="w-full">
        <Accordion.Trigger className="flex justify-between items-center w-full p-4 bg-blue-50 hover:bg-blue-100 text-left border-l-4 border-blue-500 shadow-sm">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-800">{competency.name}</h3>
            <p className="text-sm text-gray-800 font-medium">{competency.description}</p>
          </div>
          <div className="flex items-center space-x-3">
            {onEdit && (
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded-full"
                aria-label="Edit competency"
                title="Edit competency"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </div>
            )}
            <span className="text-sm font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              {competency.cards.length} {competency.cards.length === 1 ? 'card' : 'cards'}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform transition-transform data-[state=open]:rotate-180 text-blue-700"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="p-4 bg-white data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
        <div className="mb-4">
          <button
            onClick={() => setIsNewCardDialogOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
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
            Add New Card
          </button>
        </div>

        {competency.cards.length === 0 ? (
          <p className="text-gray-700 text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300 font-medium">
            No cards yet. Add your first card to get started!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {competency.cards.map((card) => (
              <div
                key={card.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer bg-white hover:border-blue-300"
                onClick={() => setEditingCard(card)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-gray-800">{card.title}</h4>
                  <div className="flex space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      card.format === 'STAR' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {card.format}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Are you sure you want to delete this card?')) {
                          deleteCard(competency.id, card.id);
                        }
                      }}
                      className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-full"
                      aria-label="Delete card"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 6H17M7 6V4C7 3.46957 7.21071 2.96086 7.58579 2.58579C7.96086 2.21071 8.46957 2 9 2H11C11.5304 2 12.0391 2.21071 12.4142 2.58579C12.7893 2.96086 13 3.46957 13 4V6M8 10V16M12 10V16M4 6V17C4 17.5304 4.21071 18.0391 4.58579 18.4142C4.96086 18.7893 5.46957 19 6 19H14C14.5304 19 15.0391 18.7893 15.4142 18.4142C15.7893 18.0391 16 17.5304 16 17V6H4Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className={`text-sm border-l-2 pl-3 py-1 mb-3 
                  ${card.format === 'STAR' ? 'border-purple-300' : 'border-green-300'}`}>
                  {card.format === 'STAR' ? (
                    <div>
                      {card.content.situation && (
                        <p className="truncate">
                          <span className="font-medium text-purple-700">S:</span>{" "}
                          {card.content.situation.substring(0, 60)}
                          {card.content.situation.length > 60 ? "..." : ""}
                        </p>
                      )}
                      {!card.content.situation && 
                        !card.content.task && 
                        !card.content.action && 
                        !card.content.result && (
                          <p className="italic text-gray-700 font-medium">Click to add details</p>
                        )}
                    </div>
                  ) : (
                    <div>
                      {card.content.challenge && (
                        <p className="truncate">
                          <span className="font-medium text-green-700">C:</span>{" "}
                          {card.content.challenge.substring(0, 60)}
                          {card.content.challenge.length > 60 ? "..." : ""}
                        </p>
                      )}
                      {!card.content.challenge && 
                        !card.content.understanding && 
                        !card.content.response && 
                        !card.content.lesson && (
                          <p className="italic text-gray-700 font-medium">Click to add details</p>
                        )}
                    </div>
                  )}
                </div>
                
                <div className="text-xs text-gray-600 mt-2 flex items-center">
                  <svg className="w-3 h-3 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="font-medium">Last updated:</span> <span className="ml-1">{new Date(card.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Card Dialog */}
        <Dialog.Root
          open={isNewCardDialogOpen}
          onOpenChange={setIsNewCardDialogOpen}
        >
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 max-w-md w-full max-h-[85vh] overflow-auto shadow-xl border border-gray-200">
              <Dialog.Title className="text-xl font-bold mb-4 text-blue-800 border-b pb-2">
                Add New Card
              </Dialog.Title>
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardTitle" className="block text-sm font-semibold mb-1 text-gray-700">
                    Card Title
                  </label>
                  <input
                    id="cardTitle"
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:text-gray-800 shadow-sm"
                    placeholder="e.g., Leading a cross-functional team"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Format</label>
                  <div className="flex gap-6 bg-gray-50 p-3 rounded-md">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        checked={newCardFormat === 'STAR'}
                        onChange={() => setNewCardFormat('STAR')}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-800 font-medium">STAR</span>
                      <span className="text-xs text-gray-500 ml-1">(Situation, Task, Action, Result)</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        checked={newCardFormat === 'CURL'}
                        onChange={() => setNewCardFormat('CURL')}
                        className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-gray-800 font-medium">CURL</span>
                      <span className="text-xs text-gray-500 ml-1">(Challenge, Understanding, Response, Lesson)</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setIsNewCardDialogOpen(false)}
                  className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCard}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
                  disabled={!newCardTitle.trim()}
                >
                  Add Card
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        {/* Edit Card Dialog */}
        <Dialog.Root open={!!editingCard} onOpenChange={(open) => !open && setEditingCard(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg max-w-4xl w-full max-h-[85vh] overflow-auto">
              {editingCard && (
                <CardEditor
                  competencyId={competency.id}
                  card={editingCard}
                  onClose={() => setEditingCard(null)}
                />
              )}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Accordion.Content>
    </Accordion.Item>
  );
}