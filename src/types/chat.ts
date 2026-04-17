export interface ChatMessage {
  id: string;
  taskId: string;
  text: string;
  role: 'user' | 'assistant';
  timestamp: string;
}
