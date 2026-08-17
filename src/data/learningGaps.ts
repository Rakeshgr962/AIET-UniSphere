export interface MaterialLink {
  id: string;
  title: string;
  type: 'Video' | 'PDF' | 'Quiz' | 'Article';
  duration: string;
  url: string;
}

export interface TopicGapItem {
  id: string;
  courseCode: string;
  courseName: string;
  topicName: string;
  status: 'Needs Practice' | 'Needs Review' | 'Moderate' | 'Strong';
  performancePercent: number;
  recentTrend: 'Improving' | 'Stable' | 'Declining';
  suggestedFocus: string;
  materials: MaterialLink[];
  recommendedActions: string[];
}

export const mockLearningGaps: TopicGapItem[] = [
  {
    id: 'gap-1',
    courseCode: 'CS602',
    courseName: 'Database Management Systems',
    topicName: 'Transactions & ACID Properties',
    status: 'Needs Practice',
    performancePercent: 68.0,
    recentTrend: 'Improving',
    suggestedFocus: 'Focus on Concurrency Control protocols (2PL, Timestamp ordering) and Deadlock handling.',
    materials: [
      { id: 'm-1', title: 'Module 4: Transaction Processing & Recovery', type: 'PDF', duration: '15 mins read', url: '#' },
      { id: 'm-2', title: 'Concurrency Control 2PL Video Lecture', type: 'Video', duration: '22 mins watch', url: '#' },
      { id: 'm-3', title: 'Transactions Self-Assessment Quiz', type: 'Quiz', duration: '10 Qs', url: '#' }
    ],
    recommendedActions: [
      'Review Module 4 lecture notes',
      'Complete Practice Set 03: Schedules & Serializability',
      'Take Transactions & Concurrency Quiz'
    ]
  },
  {
    id: 'gap-2',
    courseCode: 'CS602',
    courseName: 'Database Management Systems',
    topicName: 'Normalization (3NF & BCNF)',
    status: 'Needs Review',
    performancePercent: 74.0,
    recentTrend: 'Improving',
    suggestedFocus: 'Practice functional dependency closure set calculation and minimal cover decomposition.',
    materials: [
      { id: 'm-4', title: 'Guide to 3NF vs BCNF Decomposition', type: 'PDF', duration: '10 mins read', url: '#' },
      { id: 'm-5', title: 'Decomposition Practice Problem Set', type: 'PDF', duration: '5 Problems', url: '#' }
    ],
    recommendedActions: [
      'Solve 3 practice problems on 3NF decomposition',
      'Re-attempt Normalization assessment questions'
    ]
  },
  {
    id: 'gap-3',
    courseCode: 'CS604',
    courseName: 'Computer Networks',
    topicName: 'Routing Algorithms (Distance Vector & Link State)',
    status: 'Needs Practice',
    performancePercent: 65.5,
    recentTrend: 'Declining',
    suggestedFocus: 'Review Dijkstra algorithm step-by-step execution and Bellman-Ford count-to-infinity problem.',
    materials: [
      { id: 'm-6', title: 'Network Routing Algorithms Explained', type: 'Video', duration: '18 mins watch', url: '#' },
      { id: 'm-7', title: 'IP Subnetting & Routing Table Practice', type: 'Quiz', duration: '12 Qs', url: '#' }
    ],
    recommendedActions: [
      'Watch Network Routing walkthrough video',
      'Solve Dijkstra shortest path matrix exercise'
    ]
  },
  {
    id: 'gap-4',
    courseCode: 'CS604',
    courseName: 'Computer Networks',
    topicName: 'Network Security & Cryptography',
    status: 'Needs Review',
    performancePercent: 72.0,
    recentTrend: 'Stable',
    suggestedFocus: 'Understand public-key RSA algorithm, digital signatures, and SSL/TLS handshake steps.',
    materials: [
      { id: 'm-8', title: 'RSA Encryption & Digital Signatures Note', type: 'PDF', duration: '12 mins read', url: '#' }
    ],
    recommendedActions: [
      'Read SSL/TLS handshake protocol summary',
      'Complete cryptography self-check test'
    ]
  },
  {
    id: 'gap-5',
    courseCode: 'CS603',
    courseName: 'Operating Systems',
    topicName: 'Virtual Memory & Page Replacement',
    status: 'Moderate',
    performancePercent: 79.0,
    recentTrend: 'Stable',
    suggestedFocus: 'Compare FIFO, LRU, and Optimal page replacement hit/miss rates.',
    materials: [
      { id: 'm-9', title: 'Page Replacement Algorithms Simulator', type: 'Article', duration: '8 mins read', url: '#' }
    ],
    recommendedActions: [
      'Execute page replacement algorithm calculation worksheet'
    ]
  },
  {
    id: 'gap-6',
    courseCode: 'CS601',
    courseName: 'Artificial Intelligence',
    topicName: 'Search Algorithms & A*',
    status: 'Strong',
    performancePercent: 92.5,
    recentTrend: 'Improving',
    suggestedFocus: 'Master admissible vs consistent heuristic criteria for A* search trees.',
    materials: [
      { id: 'm-10', title: 'Advanced Heuristics in AI', type: 'PDF', duration: '15 mins read', url: '#' }
    ],
    recommendedActions: [
      'Assist peers in AI study group or attempt bonus challenge problems'
    ]
  }
];
