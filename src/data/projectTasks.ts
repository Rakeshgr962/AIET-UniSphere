export interface ProjectTaskItem {
  id: string;
  projectId: string;
  title: string;
  status: 'Todo' | 'In Progress' | 'Completed';
  assignee: string;
  dueDate: string;
  category?: string;
}

export const mockProjectTasks: ProjectTaskItem[] = [
  {
    id: 'task-1',
    projectId: 'proj-1',
    title: 'Create database schema & migrations',
    status: 'Completed',
    assignee: 'Rakesh G R',
    dueDate: '10 Jul 2026',
    category: 'Backend'
  },
  {
    id: 'task-2',
    projectId: 'proj-1',
    title: 'Build authentication & JWT tokens',
    status: 'Completed',
    assignee: 'Jane Doe',
    dueDate: '20 Jul 2026',
    category: 'Security'
  },
  {
    id: 'task-3',
    projectId: 'proj-1',
    title: 'Integrate API endpoints with React state',
    status: 'In Progress',
    assignee: 'Jane Doe',
    dueDate: '24 Aug 2026',
    category: 'Frontend'
  },
  {
    id: 'task-4',
    projectId: 'proj-1',
    title: 'Write end-to-end integration tests',
    status: 'Todo',
    assignee: 'Priya Sharma',
    dueDate: '27 Aug 2026',
    category: 'Testing'
  },
  {
    id: 'task-5',
    projectId: 'proj-1',
    title: 'Deploy microservice to staging container',
    status: 'Todo',
    assignee: 'Rakesh G R',
    dueDate: '28 Aug 2026',
    category: 'DevOps'
  },
  // Tasks for proj-2 (AI Waste Classification)
  {
    id: 'task-6',
    projectId: 'proj-2',
    title: 'Dataset collection & augmentation (5000 images)',
    status: 'Completed',
    assignee: 'Jane Doe',
    dueDate: '15 Jun 2026'
  },
  {
    id: 'task-7',
    projectId: 'proj-2',
    title: 'Train MobileNetV3 baseline model',
    status: 'Completed',
    assignee: 'Jane Doe',
    dueDate: '01 Jul 2026'
  },
  {
    id: 'task-8',
    projectId: 'proj-2',
    title: 'Build OpenCV web camera streaming feed',
    status: 'In Progress',
    assignee: 'Anish Kumar',
    dueDate: '30 Aug 2026'
  },
  {
    id: 'task-9',
    projectId: 'proj-2',
    title: 'Model Quantization for TFLite edge deployment',
    status: 'Todo',
    assignee: 'Jane Doe',
    dueDate: '10 Sep 2026'
  }
];
