
import { create } from 'zustand';
import { ChatMessage } from '../types';
import { generateAIResponse } from '../services/aiService';

interface ChatStore {
  messages: ChatMessage[];
  isTyping: boolean;
  error: string | null;
  
  // Actions
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  sendMessage: (content: string, projectId?: string) => Promise<void>;
  clearMessages: () => void;
  setTyping: (typing: boolean) => void;
  setError: (error: string | null) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. How can I help you with your project today?',
      type: 'ai',
      timestamp: new Date()
    }
  ],
  isTyping: false,
  error: null,

  addMessage: (messageData) => {
    const message: ChatMessage = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    
    set((state) => ({
      messages: [...state.messages, message]
    }));
  },

  sendMessage: async (content, projectId) => {
    const { addMessage } = get();
    
    // Add user message
    addMessage({
      content,
      type: 'user',
      projectId
    });
    
    set({ isTyping: true, error: null });
    
    try {
      // Simulate AI thinking time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const aiResponse = await generateAIResponse(content, projectId);
      
      addMessage({
        content: aiResponse,
        type: 'ai',
        projectId
      });
      
      set({ isTyping: false });
    } catch (error) {
      set({ 
        error: 'Failed to get AI response',
        isTyping: false 
      });
    }
  },

  clearMessages: () => {
    set({ 
      messages: [{
        id: '1',
        content: 'Hello! I\'m your AI assistant. How can I help you with your project today?',
        type: 'ai',
        timestamp: new Date()
      }] 
    });
  },

  setTyping: (typing) => set({ isTyping: typing }),
  
  setError: (error) => set({ error })
}));
