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

export const mockConversations: AIConversation[] = [
  {
    id: 'conv-1',
    title: 'DBMS Normalization',
    date: 'Yesterday',
    courseContext: 'Database Management Systems',
    messages: [
      {
        id: 'm-1',
        sender: 'user',
        text: 'Explain normalization in DBMS and why we use 3NF.',
        timestamp: '10:14 AM'
      },
      {
        id: 'm-2',
        sender: 'ai',
        text: 'Normalization is a database design technique used to reduce data redundancy and eliminate update anomalies (insertion, deletion, modification).\n\nKey Normal Forms:\n• 1NF: Atomic column values (no repeating groups).\n• 2NF: In 1NF and no partial dependencies (non-key attributes depend on the whole primary key).\n• 3NF: In 2NF and no transitive dependencies (non-key attributes do not depend on other non-key attributes).\n\nWhy 3NF matters: It balances minimal redundancy with high query performance for standard relational applications.',
        timestamp: '10:14 AM'
      }
    ]
  },
  {
    id: 'conv-2',
    title: 'Operating Systems Revision',
    date: '2 days ago',
    courseContext: 'Operating Systems',
    messages: [
      {
        id: 'm-3',
        sender: 'user',
        text: 'What is the difference between preemptive and non-preemptive CPU scheduling?',
        timestamp: '03:45 PM'
      },
      {
        id: 'm-4',
        sender: 'ai',
        text: 'In Preemptive Scheduling, the OS can interrupt a running process and assign the CPU to a higher-priority process (e.g., Round Robin, SRTF).\n\nIn Non-Preemptive Scheduling, once a process is allocated the CPU, it keeps running until it finishes or requests I/O (e.g., FCFS, SJF).',
        timestamp: '03:45 PM'
      }
    ]
  },
  {
    id: 'conv-3',
    title: 'AI Exam Preparation',
    date: '5 days ago',
    courseContext: 'Artificial Intelligence',
    messages: [
      {
        id: 'm-5',
        sender: 'user',
        text: 'Give me key topics to review for heuristic search algorithms.',
        timestamp: '06:20 PM'
      },
      {
        id: 'm-6',
        sender: 'ai',
        text: 'Here are the primary heuristic search algorithms to review for AIET assessments:\n1. Best-First Search (Greedy): Evaluation function f(n) = h(n).\n2. A* Search: Evaluation function f(n) = g(n) + h(n). Ensure admissibility (h(n) ≤ actual cost) for optimality.\n3. Alpha-Beta Pruning: Reduces search tree evaluation depth in two-player games.',
        timestamp: '06:21 PM'
      }
    ]
  }
];

export const mockAIAnswers: Record<string, string> = {
  default: `Here is an academic summary based on your query:\n\nKey Concepts:\n1. Understand core definitions and mathematical/theoretical principles.\n2. Review solved examples and past assessment questions.\n3. Practice hands-on implementations in lab exercises.\n\n[Frontend Mock Note: This response is simulated for frontend demonstration purposes.]`,
  explain: `Normalization reduces redundancy by decomposing tables into well-defined relations.\n\n• 1NF: Ensures atomic column values.\n• 2NF: Eliminates partial key dependencies.\n• 3NF: Eliminates transitive dependencies.\n• BCNF: Stricter version of 3NF where every determinant must be a candidate key.`,
  summarize: `Process Synchronization Overview:\n• Critical Section Problem: Ensures mutual exclusion, progress, and bounded waiting.\n• Semaphores: Integer variables accessed via wait() [P] and signal() [V] atomic operations.\n• Mutex: Binary semaphore used for locking resources.`,
  quiz: `Practice Quiz Questions:\n\nQ1. Which OSI layer handles routing between networks?\nA) Data Link  B) Network  C) Transport  D) Application\n[Answer: B - Network Layer]\n\nQ2. What is the default port for HTTP traffic?\nA) 443  B) 80  C) 21  D) 22\n[Answer: B - Port 80]\n\nQ3. TCP is connection-oriented while UDP is connectionless. (True/False)\n[Answer: True]`,
  exam: `15-Minute Exam Revision Cheat-Sheet:\n1. Neural Network Perceptrons: Output y = f(∑ w_i x_i + b).\n2. Activation Functions: Sigmoid, ReLU, Tanh.\n3. Backpropagation: Chain rule derivation for gradient descent weights update.\n4. Overfitting Mitigation: Regularization (L1/L2), Dropout layers.`
};
