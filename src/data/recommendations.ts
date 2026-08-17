export interface RecommendationItem {
  id: string;
  title: string;
  reason: string;
  courseCode: string;
  courseName: string;
  category: 'Courses' | 'Topics' | 'Practice' | 'Assessments' | 'Materials';
  estimatedTime: string;
  priority: 'high' | 'medium' | 'low';
  actionLabel: string;
  targetRoute: string;
}

export const mockRecommendations: RecommendationItem[] = [
  {
    id: 'rec-1',
    title: 'Review DBMS Transactions & ACID Properties',
    reason: 'Based on 68% score in recent Internal Assessment 2 topic breakdown',
    courseCode: 'CS602',
    courseName: 'Database Management Systems',
    category: 'Topics',
    estimatedTime: '20 mins',
    priority: 'high',
    actionLabel: 'Review Topic',
    targetRoute: '/student/learning-gaps?topic=gap-1'
  },
  {
    id: 'rec-2',
    title: 'Complete Network Routing Practice Set',
    reason: 'Based on 65.5% performance in Computer Networks Unit Test',
    courseCode: 'CS604',
    courseName: 'Computer Networks',
    category: 'Practice',
    estimatedTime: '30 mins',
    priority: 'high',
    actionLabel: 'Start Practice',
    targetRoute: '/student/learning-gaps?topic=gap-3'
  },
  {
    id: 'rec-3',
    title: 'Attempt AI Neural Networks Prep Quiz',
    reason: 'Recommended prior to upcoming Unit Test 3 next week',
    courseCode: 'CS601',
    courseName: 'Artificial Intelligence',
    category: 'Assessments',
    estimatedTime: '15 mins',
    priority: 'medium',
    actionLabel: 'Take Practice Quiz',
    targetRoute: '/student/ai?prompt=Generate%20AI%20quiz'
  },
  {
    id: 'rec-4',
    title: 'Read Cryptography & Network Security Notes',
    reason: 'Identified as a review topic in learning gap analytics',
    courseCode: 'CS604',
    courseName: 'Computer Networks',
    category: 'Materials',
    estimatedTime: '12 mins',
    priority: 'medium',
    actionLabel: 'Read Notes',
    targetRoute: '/student/learning-gaps?topic=gap-4'
  },
  {
    id: 'rec-5',
    title: 'Submit Outstanding OS Lab Assignment',
    reason: '1 pending assignment remaining for 100% submission rate',
    courseCode: 'CS603',
    courseName: 'Operating Systems',
    category: 'Courses',
    estimatedTime: '45 mins',
    priority: 'medium',
    actionLabel: 'Go to Assignments',
    targetRoute: '/student/assignments'
  },
  {
    id: 'rec-6',
    title: 'Ask AI Assistant regarding BCNF Decomposition',
    reason: 'Quick clarification on transitive dependency closure',
    courseCode: 'CS602',
    courseName: 'Database Management Systems',
    category: 'Topics',
    estimatedTime: '5 mins',
    priority: 'low',
    actionLabel: 'Ask AI Assistant',
    targetRoute: '/student/ai?prompt=Explain%20BCNF%20Decomposition'
  }
];
