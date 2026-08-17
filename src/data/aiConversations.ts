export interface AIMessageItem {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  quickActionLabel?: string;
}

export interface AIConversation {
  id: string;
  title: string;
  date: string;
  courseContext: string;
  messages: AIMessageItem[];
}

export interface QuickActionItem {
  id: string;
  label: string;
  prompt: string;
  iconName: string;
}

export const mockCourseContexts = [
  'All Courses',
  'Database Management Systems',
  'Operating Systems',
  'Computer Networks',
  'Artificial Intelligence'
];

export const mockQuickActions: QuickActionItem[] = [
  {
    id: 'qa-1',
    label: 'Explain a topic',
    prompt: 'Explain normal forms (1NF, 2NF, 3NF, BCNF) with clear examples.',
    iconName: 'BookOpen'
  },
  {
    id: 'qa-2',
    label: 'Summarize material',
    prompt: 'Summarize the key concepts of Process Synchronization and Semaphores in OS.',
    iconName: 'FileText'
  },
  {
    id: 'qa-3',
    label: 'Generate practice questions',
    prompt: 'Generate 3 multiple-choice practice questions on TCP vs UDP protocols.',
    iconName: 'HelpCircle'
  },
  {
    id: 'qa-4',
    label: 'Prepare for an exam',
    prompt: 'Give me a 15-minute quick revision guide for the upcoming AI & Neural Networks assessment.',
    iconName: 'Award'
  }
];

export const mockConversations: AIConversation[] = [];

export const mockAIAnswers: Record<string, string> = {
  default: `Here is an academic summary based on your query:\n\nKey Concepts:\n1. Understand core definitions and mathematical/theoretical principles.\n2. Review solved examples and past assessment questions.\n3. Practice hands-on implementations in lab exercises.\n\n[Frontend Mock Note: This response is simulated for frontend demonstration purposes.]`,
  explain: `Normalization reduces redundancy by decomposing tables into well-defined relations.\n\n• 1NF: Ensures atomic column values.\n• 2NF: Eliminates partial key dependencies.\n• 3NF: Eliminates transitive dependencies.\n• BCNF: Stricter version of 3NF where every determinant must be a candidate key.`,
  summarize: `Process Synchronization Overview:\n• Critical Section Problem: Ensures mutual exclusion, progress, and bounded waiting.\n• Semaphores: Integer variables accessed via wait() [P] and signal() [V] atomic operations.\n• Mutex: Binary semaphore used for locking resources.`,
  quiz: `Practice Quiz Questions:\n\nQ1. Which OSI layer handles routing between networks?\nA) Data Link  B) Network  C) Transport  D) Application\n[Answer: B - Network Layer]\n\nQ2. What is the default port for HTTP traffic?\nA) 443  B) 80  C) 21  D) 22\n[Answer: B - Port 80]\n\nQ3. TCP is connection-oriented while UDP is connectionless. (True/False)\n[Answer: True]`,
  exam: `15-Minute Exam Revision Cheat-Sheet:\n1. Neural Network Perceptrons: Output y = f(∑ w_i x_i + b).\n2. Activation Functions: Sigmoid, ReLU, Tanh.\n3. Backpropagation: Chain rule derivation for gradient descent weights update.\n4. Overfitting Mitigation: Regularization (L1/L2), Dropout layers.`
};
