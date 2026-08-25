'use client';
import { ThemeToggle } from '@/modules/core/components/ThemeToggle';
import { useState } from 'react';
import { useChat } from '../usecase/useChat';
import { ChatSkeleton } from './ChatSkeleton';

export function ChatWindow() {
  const { messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold">AI Chat n!</h1>
        <ThemeToggle />
      </header>

      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-3">
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
              💬
            </div>
            <p className="text-sm font-medium">Начните диалог с искусственным интеллектом</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {['Расскажи шутку', 'Помоги написать код', 'Что такое Clean Architecture?'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  className="text-xs px-3 py-1.5 border rounded-full border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md p-3 rounded-lg text-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                }`}
              >
                <p>{msg.content}</p>
                <span className="block text-[10px] opacity-70 mt-1">
                  {msg.createdAt.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
        {isLoading && <ChatSkeleton />}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите сообщение..."
          className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
