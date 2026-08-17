export type ProjectType = 'Course Project' | 'Capstone' | 'Research' | 'Personal';
export type ProjectCategory = 'Assigned Projects' | 'My Projects' | 'Team Projects' | 'Completed Projects';
export type ProjectStatus = 'Active' | 'Completed' | 'Pending Review' | 'Upcoming';

export interface ProjectTeamMember {
  name: string;
  role: string;
  contribution: string;
  avatar?: string;
  isOwner?: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  course: string;
  projectType: ProjectType;
  category: ProjectCategory;
  faculty: string;
  team: ProjectTeamMember[];
  progress: number;
  currentMilestone: string;
  deadline: string;
  status: ProjectStatus;
  technology: string[];
  repository: string;
  lastUpdated: string;
  owner: string;
  startDate: string;
  requirementsCount: {
    total: number;
    completed: number;
  };
}

export const mockProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    name: 'Smart Campus Analytics',
    description: 'Real-time Internet of Things sensor data pipeline and web analytics dashboard for campus energy, water, and student foot-traffic optimization.',
    course: 'Data Analytics (CS-601)',
    projectType: 'Course Project',
    category: 'Assigned Projects',
    faculty: 'Dr. Faculty Name',
    team: [
      { name: 'Jane Doe', role: 'Frontend & UI Lead', contribution: 'React Dashboard & Charting', isOwner: true },
      { name: 'Rakesh G R', role: 'Full Stack Engineer', contribution: 'API & Data Ingestion Pipeline' },
      { name: 'Priya Sharma', role: 'Data Scientist', contribution: 'ML Prediction Models' }
    ],
    progress: 68,
    currentMilestone: 'API Integration',
    deadline: '28 Aug 2026',
    status: 'Active',
    technology: ['React', 'TypeScript', 'Node.js', 'Python', 'TailwindCSS'],
    repository: 'ai-campus-analytics',
    lastUpdated: '2 hours ago',
    owner: 'Jane Doe',
    startDate: '01 Jul 2026',
    requirementsCount: { total: 10, completed: 7 }
  },
  {
    id: 'proj-2',
    name: 'AI-Based Waste Classification',
    description: 'Convolutional Neural Network model for automated vision-based waste segregation at source with real-time web camera feedback.',
    course: 'Artificial Intelligence (CS-603)',
    projectType: 'Personal',
    category: 'My Projects',
    faculty: 'Prof. AI Instructor',
    team: [
      { name: 'Jane Doe', role: 'ML Engineer', contribution: 'Model Training & UI', isOwner: true },
      { name: 'Anish Kumar', role: 'Embedded Developer', contribution: 'Camera Hardware Integration' }
    ],
    progress: 74,
    currentMilestone: 'Model Quantization',
    deadline: '15 Sep 2026',
    status: 'Active',
    technology: ['Python', 'TensorFlow', 'React', 'OpenCV', 'FastAPI'],
    repository: 'ai-waste-classifier',
    lastUpdated: 'Today',
    owner: 'Jane Doe',
    startDate: '10 Jun 2026',
    requirementsCount: { total: 8, completed: 6 }
  },
  {
    id: 'proj-3',
    name: 'Blockchain Land Registry System',
    description: 'Decentralized smart-contract based land title registry guaranteeing immutable ownership tracking and instant peer-to-peer property transfer.',
    course: 'Distributed Systems (CS-604)',
    projectType: 'Capstone',
    category: 'Team Projects',
    faculty: 'Dr. Blockchain Specialist',
    team: [
      { name: 'Rahul Mehta', role: 'Smart Contract Dev', contribution: 'Solidity Contracts' },
      { name: 'Jane Doe', role: 'Frontend Engineer', contribution: 'Web3 Integration & UI', isOwner: false },
      { name: 'Sneha Patel', role: 'Security Auditor', contribution: 'Vulnerability Analysis' }
    ],
    progress: 45,
    currentMilestone: 'Testnet Deployment',
    deadline: '10 Oct 2026',
    status: 'Pending Review',
    technology: ['Solidity', 'Ethereum', 'React', 'Ethers.js', 'Hardhat'],
    repository: 'land-registry-dapp',
    lastUpdated: '3 days ago',
    owner: 'Rahul Mehta',
    startDate: '15 May 2026',
    requirementsCount: { total: 12, completed: 5 }
  },
  {
    id: 'proj-4',
    name: 'Autonomous Drone Navigation System',
    description: 'ROS2-based computer vision obstacle avoidance system for GPS-denied indoor quadcopter navigation.',
    course: 'Robotics & Computer Vision (CS-605)',
    projectType: 'Research',
    category: 'Assigned Projects',
    faculty: 'Dr. Robotics Lead',
    team: [
      { name: 'Karthik V', role: 'Robotics Lead', contribution: 'ROS2 Node Architecture' },
      { name: 'Jane Doe', role: 'Vision Developer', contribution: 'Depth Estimation Pipeline' }
    ],
    progress: 90,
    currentMilestone: 'Final Field Testing',
    deadline: '30 Aug 2026',
    status: 'Pending Review',
    technology: ['C++', 'ROS2', 'Python', 'OpenCV', 'Gazebo'],
    repository: 'indoor-drone-nav',
    lastUpdated: 'Yesterday',
    owner: 'Karthik V',
    startDate: '01 May 2026',
    requirementsCount: { total: 10, completed: 9 }
  },
  {
    id: 'proj-5',
    name: 'AIET Student Attendance Automation',
    description: 'Facial recognition student attendance recording mobile app with automated faculty reporting.',
    course: 'Software Engineering (CS-502)',
    projectType: 'Course Project',
    category: 'Completed Projects',
    faculty: 'Prof. Software Architect',
    team: [
      { name: 'Jane Doe', role: 'Team Lead', contribution: 'Architecture & UI', isOwner: true },
      { name: 'Rakesh G R', role: 'Backend Engineer', contribution: 'Facial Recognition API' }
    ],
    progress: 100,
    currentMilestone: 'Project Published',
    deadline: '10 Jun 2026',
    status: 'Completed',
    technology: ['React Native', 'Python', 'FaceNet', 'SQLite'],
    repository: 'student-attendance-aiet',
    lastUpdated: '12 Jun 2026',
    owner: 'Jane Doe',
    startDate: '15 Jan 2026',
    requirementsCount: { total: 10, completed: 10 }
  },
  {
    id: 'proj-6',
    name: 'Neural Network Optimizer Toolkit',
    description: 'Custom Python framework implementing adaptive gradient descent algorithms with visual convergence metrics.',
    course: 'Deep Learning (CS-608)',
    projectType: 'Personal',
    category: 'My Projects',
    faculty: 'Dr. ML Faculty',
    team: [
      { name: 'Jane Doe', role: 'Sole Developer', contribution: 'Core Math & UI Visualization', isOwner: true }
    ],
    progress: 20,
    currentMilestone: 'Benchmark Setup',
    deadline: '15 Nov 2026',
    status: 'Upcoming',
    technology: ['Python', 'PyTorch', 'NumPy', 'Matplotlib'],
    repository: 'nn-optimizer-toolkit',
    lastUpdated: '1 week ago',
    owner: 'Jane Doe',
    startDate: '01 Aug 2026',
    requirementsCount: { total: 6, completed: 1 }
  }
];
