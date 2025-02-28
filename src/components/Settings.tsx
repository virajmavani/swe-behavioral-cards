"use client";

import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';
import { useApp } from '@/context/AppContext';

interface SettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function Settings({ open, onOpenChange }: SettingsProps) {
  const { state, updateSettings, resetData, resetToDefaultCompetencies } = useApp();
  // Track client-side rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);
  
  // Set client-side flag after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAutoSaveChange = (checked: boolean) => {
    updateSettings({ ...state.settings, autoSave: checked });
  };

  const handleResetData = () => {
    if (
      confirm(
        'Are you sure you want to reset all data? This action cannot be undone.'
      )
    ) {
      resetData();
      onOpenChange(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 max-w-md w-full">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Settings
          </Dialog.Title>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Auto-save to Local Storage</h3>
                <p className="text-sm text-gray-700">
                  Save your changes automatically to browser storage
                </p>
              </div>
              {isClient && (
                <Switch.Root
                  checked={state.settings.autoSave}
                  onCheckedChange={handleAutoSaveChange}
                  className="w-[42px] h-[25px] bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600"
                >
                  <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                </Switch.Root>
              )}
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Data Management</h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleResetData}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Reset All Data
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset to default competencies? This will delete any custom competencies and reset the defaults.')) {
                      resetToDefaultCompetencies();
                    }
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Reset to Default Competencies
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Competency Management</h3>
              <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md space-y-2">
                <p>You can now add, edit, or delete any competencies using the main interface.</p>
                <p>Use the "Reset to Default Competencies" button to restore the original set.</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">About</h3>
              <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                <p className="font-medium">Behavioral Interview Prep Tool</p>
                <p>Version 1.0.0</p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-800 mb-2">Format Guide</h3>
              <div className="text-sm text-gray-800">
                <div className="mb-3 bg-purple-50 p-3 rounded-md border-l-4 border-purple-300">
                  <strong className="text-purple-800 font-semibold block mb-1">STAR Format:</strong>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li><span className="font-medium text-purple-700">S</span>ituation: Set the scene and context</li>
                    <li><span className="font-medium text-purple-700">T</span>ask: Explain your responsibility</li>
                    <li><span className="font-medium text-purple-700">A</span>ction: Describe how you completed the task</li>
                    <li><span className="font-medium text-purple-700">R</span>esult: Share the outcomes of your actions</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-3 rounded-md border-l-4 border-green-300">
                  <strong className="text-green-800 font-semibold block mb-1">CURL Format:</strong>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li><span className="font-medium text-green-700">C</span>hallenge: Describe the challenge or problem</li>
                    <li><span className="font-medium text-green-700">U</span>nderstanding: How you analyzed it</li>
                    <li><span className="font-medium text-green-700">R</span>esponse: What you did</li>
                    <li><span className="font-medium text-green-700">L</span>esson: What you learned</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}