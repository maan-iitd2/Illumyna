import { create } from 'zustand';
import type { ChatMessage } from '../types';

interface ChatState {
  messagesByTaskId: Record<string, ChatMessage[]>;
  addMessage: (taskId: string, message: ChatMessage) => void;
  clearChat: (taskId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messagesByTaskId: {},
  addMessage: (taskId, message) => set((state) => {
    const existing = state.messagesByTaskId[taskId] || [];
    return {
      messagesByTaskId: {
        ...state.messagesByTaskId,
        [taskId]: [...existing, message]
      }
    };
  }),
  clearChat: (taskId) => set((state) => {
    const next = { ...state.messagesByTaskId };
    delete next[taskId];
    return { messagesByTaskId: next };
  }),
}));
