"use client";

import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useApp } from '@/context/AppContext';
import { Competency } from '@/types';

interface CompetencyManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editCompetency?: Competency | null;
}

export default function CompetencyManager({ 
  open, 
  onOpenChange, 
  editCompetency = null 
}: CompetencyManagerProps) {
  const { addCompetency, updateCompetency, deleteCompetency } = useApp();
  const [name, setName] = useState(editCompetency?.name || '');
  const [description, setDescription] = useState(editCompetency?.description || '');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    
    if (!description.trim()) {
      setError('Description is required');
      return;
    }
    
    if (editCompetency) {
      updateCompetency(editCompetency.id, name.trim(), description.trim());
    } else {
      addCompetency(name.trim(), description.trim());
    }
    
    resetForm();
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (editCompetency && confirm('Are you sure you want to delete this competency? All cards within it will be lost.')) {
      deleteCompetency(editCompetency.id);
      resetForm();
      onOpenChange(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setError('');
  };

  // Reset form when dialog opens with a new competency
  useEffect(() => {
    if (open) {
      setName(editCompetency?.name || '');
      setDescription(editCompetency?.description || '');
      setError('');
    }
  }, [open, editCompetency?.id, editCompetency?.name, editCompetency?.description]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 max-w-md w-full shadow-xl border border-gray-200">
          <Dialog.Title className="text-xl font-bold mb-4 text-blue-800 border-b pb-2">
            {editCompetency ? 'Edit Competency' : 'Add New Competency'}
            {editCompetency && defaultCompetencies.some(id => id === editCompetency.id) && (
              <span className="ml-2 text-xs font-normal text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                Default Competency
              </span>
            )}
          </Dialog.Title>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            {editCompetency && defaultCompetencies.some(id => id === editCompetency.id) && (
              <div className="p-3 bg-blue-50 text-blue-700 rounded-md mb-4 text-sm">
                <p className="font-medium">This is a default competency</p>
                <p>You can edit its description but you cannot delete it.</p>
              </div>
            )}
            
            <div>
              <label htmlFor="competencyName" className="block text-sm font-semibold mb-2 text-gray-700">
                Competency Name
              </label>
              <input
                id="competencyName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                placeholder="e.g., Problem Solving, Leadership"
                disabled={(editCompetency && defaultCompetencies.some(id => id === editCompetency.id)) || false}
              />
              {editCompetency && defaultCompetencies.some(id => id === editCompetency.id) && (
                <p className="text-xs text-gray-500 mt-1">Default competency names cannot be changed</p>
              )}
            </div>
            
            <div>
              <label htmlFor="competencyDescription" className="block text-sm font-semibold mb-2 text-gray-700">
                Description
              </label>
              <textarea
                id="competencyDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                placeholder="Briefly describe this competency..."
              />
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <div>
              {editCompetency && !defaultCompetencies.some(id => id === editCompetency.id) && (
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 font-medium transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  resetForm();
                  onOpenChange(false);
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors shadow-sm"
              >
                {editCompetency ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// Default competencies for reference
const defaultCompetencies = [
  'leadership',
  'teamwork',
  'problem-solving',
  'communication',
  'adaptability',
];