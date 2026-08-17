export interface ProjectMilestoneItem {
  id: string;
  projectId: string;
  title: string;
  dueDate: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  description: string;
  completedDate?: string;
}

export const mockProjectMilestones: ProjectMilestoneItem[] = [
  {
    id: 'ms-1',
    projectId: 'proj-1',
    title: 'Requirements & Architecture Design',
    dueDate: '15 Jul 2026',
    status: 'Completed',
    description: 'System specifications, database ER diagram, and component architecture approved by mentor.',
    completedDate: '14 Jul 2026'
  },
  {
    id: 'ms-2',
    projectId: 'proj-1',
    title: 'API Integration',
    dueDate: '24 Aug 2026',
    status: 'In Progress',
    description: 'Connect REST endpoints with real-time analytics UI, chart components, and websocket feeds.'
  },
  {
    id: 'ms-3',
    projectId: 'proj-1',
    title: 'Performance Testing & Optimization',
    dueDate: '26 Aug 2026',
    status: 'Pending',
    description: 'Load test API endpoints up to 1000 requests/sec and optimize bundle size.'
  },
  {
    id: 'ms-4',
    projectId: 'proj-1',
    title: 'Final Project Defense & Documentation',
    dueDate: '28 Aug 2026',
    status: 'Pending',
    description: 'Submit final report, live demo video, and code review presentation.'
  },
  // Milestones for proj-2
  {
    id: 'ms-5',
    projectId: 'proj-2',
    title: 'Data Ingestion & Augmentation',
    dueDate: '20 Jun 2026',
    status: 'Completed',
    description: 'Curate dataset of 5,000 labelled images across 4 waste categories.'
  },
  {
    id: 'ms-6',
    projectId: 'proj-2',
    title: 'Model Quantization',
    dueDate: '05 Sep 2026',
    status: 'In Progress',
    description: 'Convert TensorFlow FP32 model to INT8 TFLite for edge devices.'
  }
];
