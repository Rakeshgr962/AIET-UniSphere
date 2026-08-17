import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, MessageSquare, Menu, RotateCcw } from 'lucide-react';
import { AppShell } from '../components/AppShell';
import { LoadingState } from '../components/LoadingState';
import { AIMessage } from '../components/AIMessage';
import { AIInput } from '../components/AIInput';
import { AIQuickAction } from '../components/AIQuickAction';
import { ConversationList } from '../components/ConversationList';
import { CourseContextSelector } from '../components/CourseContextSelector';
import type { AIConversation, QuickActionItem } from '../data/aiConversations';
import { mockCourseContexts } from '../data/aiConversations';
import { 
  getConversations, 
  getQuickActions, 
  sendChatMessage, 
  clearConversation 
} from '../services/aiService';

export const AILearningAssistantPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialPrompt = searchParams.get('prompt');

  const [conversations, setConversations] = useState<AIConversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [activeConv, setActiveConv] = useState<AIConversation | null>(null);
  const [quickActions, setQuickActions] = useState<QuickActionItem[]>([]);
  const [courseContext, setCourseContext] = useState<string>('All Courses');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const [convList, qActions] = await Promise.all([
        getConversations(),
        getQuickActions()
      ]);
      setConversations(convList);
      setQuickActions(qActions);

      if (convList.length > 0) {
        setActiveConvId(convList[0].id);
        setActiveConv(convList[0]);
        setCourseContext(convList[0].courseContext || 'All Courses');
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    // If prompt param is passed via URL navigation (e.g. from recommendation or gap card)
    if (initialPrompt && !isLoading) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages]);

  const handleSelectConversation = (id: string) => {
    setActiveConvId(id);
    const selected = conversations.find(c => c.id === id) || null;
    setActiveConv(selected);
    if (selected) {
      setCourseContext(selected.courseContext || 'All Courses');
    }
    setIsHistoryDrawerOpen(false);
  };

  const handleNewConversation = () => {
    setActiveConvId(null);
    setActiveConv(null);
    setIsHistoryDrawerOpen(false);
  };

  const handleSendMessage = async (text: string) => {
    setIsSending(true);
    const result = await sendChatMessage(activeConvId, text, courseContext);
    
    // Update local list & active conversation state
    setConversations(prev => {
      const exists = prev.some(c => c.id === result.conversation.id);
      if (exists) {
        return prev.map(c => c.id === result.conversation.id ? result.conversation : c);
      }
      return [result.conversation, ...prev];
    });

    setActiveConvId(result.conversation.id);
    setActiveConv(result.conversation);
    setIsSending(false);
  };

  const handleClearConv = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = await clearConversation(id);
    setConversations(updated);
    if (activeConvId === id) {
      if (updated.length > 0) {
        setActiveConvId(updated[0].id);
        setActiveConv(updated[0]);
      } else {
        handleNewConversation();
      }
    }
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="page-header-container" style={{ marginBottom: '1rem' }}>
        <div>
          <div className="breadcrumbs">
            <span>Intelligence</span>
            <span className="breadcrumbs-separator">/</span>
            <span style={{ fontWeight: 600, color: 'var(--brand-black)' }}>AI Learning Assistant</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
            <Sparkles size={24} className="text-orange" />
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>AIET-UniSphere AI</h1>
            <span className="badge badge-active font-mono" style={{ fontSize: '0.7rem' }}>Mock AI Active</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.125rem' }}>
            "How can I help you learn today?" Ask course questions, generate revision quizzes, or explain complex topics.
          </p>
        </div>

        <button 
          className="btn btn-secondary visible-mobile" 
          onClick={() => setIsHistoryDrawerOpen(!isHistoryDrawerOpen)}
          style={{ width: 'auto', padding: '0.5rem 0.75rem' }}
        >
          <MessageSquare size={16} />
          <span>History</span>
        </button>
      </div>

      {isLoading ? (
        <LoadingState message="Connecting to AIET-UniSphere AI assistant..." />
      ) : (
        <div className="ai-interface-grid">
          {/* Left Panel: Conversation History */}
          <div className={`ai-sidebar-column ${isHistoryDrawerOpen ? 'drawer-open' : ''}`}>
            <ConversationList
              conversations={conversations}
              activeConversationId={activeConvId}
              onSelectConversation={handleSelectConversation}
              onNewConversation={handleNewConversation}
              onClearConversation={handleClearConv}
            />
          </div>

          {/* Main Chat Area */}
          <div className="ai-chat-main-column">
            {/* Top Toolbar Bar */}
            <div className="ai-chat-toolbar-bar">
              <CourseContextSelector
                contexts={mockCourseContexts}
                selectedContext={courseContext}
                onSelectContext={setCourseContext}
              />

              {activeConv && (
                <button 
                  className="btn btn-secondary" 
                  style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                  onClick={handleNewConversation}
                >
                  <RotateCcw size={13} />
                  <span>Start Fresh</span>
                </button>
              )}
            </div>

            {/* Chat Body Scroll */}
            <div className="ai-messages-scroll-box">
              {!activeConv || activeConv.messages.length === 0 ? (
                /* Landing Experience */
                <div className="ai-landing-experience">
                  <div className="ai-landing-icon-badge">
                    <Sparkles size={32} className="text-orange" />
                  </div>
                  <h2 className="ai-landing-title font-display">AIET-UniSphere AI</h2>
                  <p className="ai-landing-subtitle">
                    How can I help you learn today? Select a course context or choose a quick action below to start learning.
                  </p>

                  <AIQuickAction
                    quickActions={quickActions}
                    onSelectAction={handleSendMessage}
                  />
                </div>
              ) : (
                /* Conversation Messages */
                <div className="ai-messages-list">
                  {activeConv.messages.map((msg) => (
                    <AIMessage key={msg.id} message={msg} />
                  ))}
                  {isSending && (
                    <div className="ai-typing-indicator font-mono">
                      <Sparkles size={14} className="text-orange animate-spin" />
                      <span>AIET-UniSphere AI is generating response...</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Bottom Fixed AI Prompt Input Bar */}
            <div className="ai-chat-bottom-bar">
              <AIInput
                onSendMessage={handleSendMessage}
                isLoading={isSending}
              />
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
};

export default AILearningAssistantPage;
