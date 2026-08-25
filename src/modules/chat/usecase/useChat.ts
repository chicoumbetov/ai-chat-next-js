import { useEffect, useState } from 'react';
import { Message } from '../domain/chat.entity';

const API_URL = 'http://127.0.0.1:8000'; // process.env.NEXT_PUBLIC_API_URL || 

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load history of chat on chat open
  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch(`${API_URL}/api/v1/chat`);
        if (res.ok) {
          const data = await res.json();
          // Map data for Message instance
          const loadedMessages: Message[] = data.map((item: any) => ({
            id: item.id.toString(),
            content: item.content,
            sender: item.role, // 'user' or 'assistant'
            createdAt: new Date(item.created_at),
          }));
          setMessages(loadedMessages);
        }
      } catch (e) {
        console.error('Failed to load history', e);
      }
    }
    fetchHistory();
  }, []);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const response = await fetch(`${API_URL}/api/v1/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: content }),
    }).catch(() => null);

    if (response && response.ok) {
      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply,
        sender: 'assistant',
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } else {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Connection error with the backend.',
        sender: 'assistant',
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  return { messages, isLoading, sendMessage };
}
