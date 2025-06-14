
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
  getMessagesByProject: (projectId?: string) => ChatMessage[];
  deleteMessage: (messageId: string) => void;
}

const initialMessage: ChatMessage = {
  id: 'welcome-message',
  content: 'Hello! I\'m your AI assistant. How can I help you with your project today?',
  type: 'ai',
  timestamp: new Date()
};

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [initialMessage],
  isTyping: false,
  error: null,

  addMessage: (messageData) => {
    try {
      const message: ChatMessage = {
        ...messageData,
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date()
      };
      
      console.log('Adding message:', message.id, message.type);
      
      set((state) => ({
        messages: [...state.messages, message],
        error: null
      }));
    } catch (error) {
      console.error('Error adding message:', error);
      set({ error: 'Failed to add message' });
    }
  },

  sendMessage: async (content, projectId) => {
    try {
      if (!content?.trim()) {
        throw new Error('Message content cannot be empty');
      }

      const { addMessage } = get();
      
      console.log('Sending message:', content.substring(0, 50) + '...', projectId);
      
      // Add user message
      addMessage({
        content: content.trim(),
        type: 'user',
        projectId
      });
      
      set({ isTyping: true, error: null });
      
      // Simulate AI thinking time with randomness
      const thinkingTime = 1000 + Math.random() * 2000;
      await new Promise(resolve => setTimeout(resolve, thinkingTime));
      
      try {
        const aiResponse = await generateAIResponse(content, projectId);
        
        if (!aiResponse?.trim()) {
          throw new Error('Empty AI response received');
        }
        
        addMessage({
          content: aiResponse,
          type: 'ai',
          projectId
        });
        
        console.log('AI response added successfully');
      } catch (aiError) {
        console.error('AI response error:', aiError);
        
        // Add error message from AI
        addMessage({
          content: 'I apologize, but I encountered an error while processing your request. Please try again.',
          type: 'ai',
          projectId
        });
      }
      
      set({ isTyping: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error sending message:', errorMessage);
      
      set({ 
        error: `Failed to send message: ${errorMessage}`,
        isTyping: false 
      });
    }
  },

  clearMessages: () => {
    console.log('Clearing chat messages');
    set({ 
      messages: [initialMessage],
      error: null,
      isTyping: false
    });
  },

  setTyping: (typing) => {
    console.log('Setting typing state:', typing);
    set({ isTyping: typing });
  },
  
  setError: (error) => {
    console.log('Setting chat error:', error);
    set({ error });
  },

  getMessagesByProject: (projectId) => {
    try {
      const { messages } = get();
      
      if (!projectId) {
        return messages.filter(msg => !msg.projectId);
      }
      
      const projectMessages = messages.filter(msg => msg.projectId === projectId);
      console.log('Getting messages for project:', projectId, projectMessages.length);
      
      return projectMessages;
    } catch (error) {
      console.error('Error getting messages by project:', error);
      return [];
    }
  },

  deleteMessage: (messageId) => {
    try {
      if (!messageId?.trim()) {
        throw new Error('Invalid message ID');
      }

      console.log('Deleting message:', messageId);
      
      set((state) => ({
        messages: state.messages.filter(msg => msg.id !== messageId),
        error: null
      }));
    } catch (error) {
      console.error('Error deleting message:', error);
      set({ error: 'Failed to delete message' });
    }
  }
}));
