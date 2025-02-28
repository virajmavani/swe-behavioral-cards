"use client";

import { useState, useEffect } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { Card, CardFormat } from '@/types';
import { useApp } from '@/context/AppContext';

interface CardEditorProps {
  competencyId: string;
  card: Card;
  onClose: () => void;
}

export default function CardEditor({ competencyId, card, onClose }: CardEditorProps) {
  const { updateCard } = useApp();
  const [title, setTitle] = useState(card.title);
  const [format, setFormat] = useState<CardFormat>(card.format);
  const [content, setContent] = useState(card.content);

  useEffect(() => {
    setTitle(card.title);
    setFormat(card.format);
    setContent(card.content);
  }, [card]);

  const handleSave = () => {
    updateCard(competencyId, {
      ...card,
      title,
      format,
      content,
    });
    onClose();
  };

  const handleContentChange = (field: keyof Card['content'], value: string) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-5 max-w-full sm:max-w-3xl border border-gray-200">
      <div className="flex justify-between items-center mb-5 border-b pb-4">
        <h3 className="text-xl font-bold text-blue-800">Edit Card</h3>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors shadow-sm"
          >
            Save
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold mb-2 text-gray-700">
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Enter a descriptive title for this story"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Format</label>
          <div className="flex gap-6 bg-gray-50 p-4 rounded-md">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                checked={format === 'STAR'}
                onChange={() => setFormat('STAR')}
                className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-800 font-medium">STAR</span>
              <span className="text-xs text-gray-600 ml-1">(Situation, Task, Action, Result)</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                checked={format === 'CURL'}
                onChange={() => setFormat('CURL')}
                className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-800 font-medium">CURL</span>
              <span className="text-xs text-gray-600 ml-1">(Challenge, Understanding, Response, Lesson)</span>
            </label>
          </div>
        </div>

        <Tabs.Root
          defaultValue={format}
          value={format}
          onValueChange={(value) => setFormat(value as CardFormat)}
          className="w-full"
        >
          <Tabs.List className="flex border-b mb-4 bg-gray-50 rounded-t-md" aria-label="Format tabs">
            <Tabs.Trigger
              value="STAR"
              className="px-4 py-3 flex-1 text-center border-r border-gray-200 data-[state=active]:bg-purple-50 data-[state=active]:border-b-2 data-[state=active]:border-b-purple-500 data-[state=active]:font-semibold text-gray-800 transition-colors"
            >
              <span className="text-purple-700 font-bold mr-1">STAR</span> Format
            </Tabs.Trigger>
            <Tabs.Trigger
              value="CURL"
              className="px-4 py-3 flex-1 text-center data-[state=active]:bg-green-50 data-[state=active]:border-b-2 data-[state=active]:border-b-green-500 data-[state=active]:font-semibold text-gray-800 transition-colors"
            >
              <span className="text-green-700 font-bold mr-1">CURL</span> Format
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="STAR" className="space-y-4">
            <div>
              <label htmlFor="situation" className="block text-sm font-semibold mb-2 text-gray-700">
                <span className="text-purple-700 font-bold">S</span>ituation
              </label>
              <textarea
                id="situation"
                value={content.situation || ''}
                onChange={(e) => handleContentChange('situation', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                placeholder="Describe the situation or context..."
              />
            </div>
            <div>
              <label htmlFor="task" className="block text-sm font-semibold mb-2 text-gray-700">
                <span className="text-purple-700 font-bold">T</span>ask
              </label>
              <textarea
                id="task"
                value={content.task || ''}
                onChange={(e) => handleContentChange('task', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                placeholder="What was your responsibility or goal?"
              />
            </div>
            <div>
              <label htmlFor="action" className="block text-sm font-semibold mb-2 text-gray-700">
                <span className="text-purple-700 font-bold">A</span>ction
              </label>
              <textarea
                id="action"
                value={content.action || ''}
                onChange={(e) => handleContentChange('action', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                placeholder="What steps did you take?"
              />
            </div>
            <div>
              <label htmlFor="result" className="block text-sm font-semibold mb-2 text-gray-700">
                <span className="text-purple-700 font-bold">R</span>esult
              </label>
              <textarea
                id="result"
                value={content.result || ''}
                onChange={(e) => handleContentChange('result', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                placeholder="What was the outcome of your actions?"
              />
            </div>
          </Tabs.Content>

          <Tabs.Content value="CURL" className="space-y-4">
            <div>
              <label htmlFor="challenge" className="block text-sm font-semibold mb-2 text-gray-700">
                <span className="text-green-700 font-bold">C</span>hallenge
              </label>
              <textarea
                id="challenge"
                value={content.challenge || ''}
                onChange={(e) => handleContentChange('challenge', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
                placeholder="What challenge did you face?"
              />
            </div>
            <div>
              <label htmlFor="understanding" className="block text-sm font-semibold mb-2 text-gray-700">
                <span className="text-green-700 font-bold">U</span>nderstanding
              </label>
              <textarea
                id="understanding"
                value={content.understanding || ''}
                onChange={(e) => handleContentChange('understanding', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
                placeholder="How did you analyze or understand the challenge?"
              />
            </div>
            <div>
              <label htmlFor="response" className="block text-sm font-semibold mb-2 text-gray-700">
                <span className="text-green-700 font-bold">R</span>esponse
              </label>
              <textarea
                id="response"
                value={content.response || ''}
                onChange={(e) => handleContentChange('response', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
                placeholder="How did you respond to the challenge?"
              />
            </div>
            <div>
              <label htmlFor="lesson" className="block text-sm font-semibold mb-2 text-gray-700">
                <span className="text-green-700 font-bold">L</span>esson
              </label>
              <textarea
                id="lesson"
                value={content.lesson || ''}
                onChange={(e) => handleContentChange('lesson', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
                placeholder="What did you learn from this experience?"
              />
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}