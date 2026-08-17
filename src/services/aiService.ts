import type { AIConversation, AIMessageItem, QuickActionItem } from '../data/aiConversations';
import { mockConversations, mockQuickActions, mockAIAnswers } from '../data/aiConversations';

let conversationsState: AIConversation[] = [...mockConversations];

export const getConversations = async (): Promise<AIConversation[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...conversationsState]);
    }, 100);
  });
};

export const getConversationById = async (id: string): Promise<AIConversation | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const conv = conversationsState.find(c => c.id === id) || null;
      resolve(conv);
    }, 100);
  });
};

export const getQuickActions = async (): Promise<QuickActionItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockQuickActions);
    }, 100);
  });
};

export const sendChatMessage = async (
  conversationId: string | null,
  text: string,
  courseContext: string
): Promise<{ conversation: AIConversation; reply: AIMessageItem }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      let targetConv: AIConversation;
      if (conversationId && conversationsState.some(c => c.id === conversationId)) {
        targetConv = conversationsState.find(c => c.id === conversationId)!;
      } else {
        const titleSnippet = text.length > 25 ? text.substring(0, 25) + '...' : text;
        targetConv = {
          id: `conv-${Date.now()}`,
          title: titleSnippet,
          date: 'Just now',
          courseContext: courseContext || 'All Courses',
          messages: []
        };
        conversationsState = [targetConv, ...conversationsState];
      }

      const userMsg: AIMessageItem = {
        id: `m-u-${Date.now()}`,
        sender: 'user',
        text,
        timestamp: timeStr
      };

      // Determine mock AI answer based on keyword matching
      let aiText = mockAIAnswers.default;
      const lower = text.toLowerCase();
      if (lower.includes('normal') || lower.includes('dbms') || lower.includes('3nf')) {
        aiText = mockAIAnswers.explain;
      } else if (lower.includes('synchronization') || lower.includes('os') || lower.includes('semaphore')) {
        aiText = mockAIAnswers.summarize;
      } else if (lower.includes('quiz') || lower.includes('tcp') || lower.includes('network')) {
        aiText = mockAIAnswers.quiz;
      } else if (lower.includes('exam') || lower.includes('neural') || lower.includes('ai')) {
        aiText = mockAIAnswers.exam;
      }

      const aiMsg: AIMessageItem = {
        id: `m-ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        timestamp: timeStr
      };

      targetConv.messages.push(userMsg, aiMsg);

      resolve({
        conversation: { ...targetConv },
        reply: aiMsg
      });
    }, 400);
  });
};

export const clearConversation = async (conversationId: string): Promise<AIConversation[]> => {
  return new Promise((resolve) => {
    conversationsState = conversationsState.filter(c => c.id !== conversationId);
    resolve([...conversationsState]);
  });
};
