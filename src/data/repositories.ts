export interface RepositoryInfo {
  id: string;
  name: string;
  owner: string;
  visibility: 'Public' | 'Private';
  currentBranch: string;
  lastCommit: string;
  status: 'Connected' | 'Not Connected' | 'Synced';
  githubConnected: boolean;
  githubUsername: string;
  starsCount: number;
  forksCount: number;
  cloneUrl: string;
}

export interface GitBranchItem {
  id: string;
  name: string;
  lastCommitMessage: string;
  updatedTime: string;
  author: string;
  isDefault?: boolean;
}

export interface GitCommitItem {
  id: string;
  hash: string;
  shortHash: string;
  message: string;
  author: string;
  date: string;
  branch: string;
  avatar?: string;
}

export interface GitFileChange {
  modified: string[];
  added: string[];
  deleted: string[];
}

export const mockRepository: RepositoryInfo = {
  id: 'repo-1',
  name: 'ai-campus-analytics',
  owner: 'student-user',
  visibility: 'Public',
  currentBranch: 'main',
  lastCommit: 'Updated 2 hours ago',
  status: 'Connected',
  githubConnected: true,
  githubUsername: 'student-user',
  starsCount: 14,
  forksCount: 3,
  cloneUrl: 'https://github.com/student-user/ai-campus-analytics.git'
};

export const mockBranches: GitBranchItem[] = [
  {
    id: 'br-1',
    name: 'main',
    lastCommitMessage: 'feat: improve dashboard and chart responsiveness',
    updatedTime: '2 hours ago',
    author: 'Rakesh',
    isDefault: true
  },
  {
    id: 'br-2',
    name: 'development',
    lastCommitMessage: 'refactor: update mock data service layer',
    updatedTime: '5 hours ago',
    author: 'Jane Doe'
  },
  {
    id: 'br-3',
    name: 'feature/authentication',
    lastCommitMessage: 'feat: implement JWT token refresh flow',
    updatedTime: '1 day ago',
    author: 'Jane Doe'
  },
  {
    id: 'br-4',
    name: 'feature/dashboard',
    lastCommitMessage: 'style: enhance stat card grid contrast',
    updatedTime: '2 days ago',
    author: 'Priya Sharma'
  }
];

export const mockCommits: GitCommitItem[] = [
  {
    id: 'cmt-1',
    hash: 'a82f91c94b321e847192834190aaef1234567890',
    shortHash: 'a82f91c',
    message: 'feat: improve dashboard metrics and chart rendering',
    author: 'Rakesh',
    date: '2 hours ago',
    branch: 'main'
  },
  {
    id: 'cmt-2',
    hash: 'f4b109e23a4567890123456789abcdef01234567',
    shortHash: 'f4b109e',
    message: 'fix: resolve navbar dropdown z-index positioning',
    author: 'Jane Doe',
    date: '5 hours ago',
    branch: 'development'
  },
  {
    id: 'cmt-3',
    hash: 'c3d2e1a9876543210987654321fedcba98765432',
    shortHash: 'c3d2e1a',
    message: 'feat: add real-time websocket listener for energy sensors',
    author: 'Rakesh',
    date: 'Yesterday',
    branch: 'main'
  },
  {
    id: 'cmt-4',
    hash: 'e8f7d6c543210987654321098765432109876543',
    shortHash: 'e8f7d6c',
    message: 'docs: update setup guide in README.md',
    author: 'Priya Sharma',
    date: '2 days ago',
    branch: 'main'
  },
  {
    id: 'cmt-5',
    hash: 'b9a8c7d6e5f43210987654321098765432109876',
    shortHash: 'b9a8c7d',
    message: 'initial commit: bootstrap Vite React project structure',
    author: 'Jane Doe',
    date: '1 week ago',
    branch: 'main'
  }
];

export const mockGitChanges: GitFileChange = {
  modified: [
    'src/pages/Dashboard.tsx',
    'src/components/AppShell.tsx',
    'src/index.css'
  ],
  added: [
    'src/components/ProjectCard.tsx',
    'src/data/projects.ts'
  ],
  deleted: [
    'src/legacy/OldNavigation.tsx'
  ]
};

export const mockWorkspaceFiles = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'components',
        type: 'folder',
        children: [
          { name: 'ProjectCard.tsx', type: 'file', language: 'typescript', content: `import React from 'react';\nimport { ProjectItem } from '../data/projects';\n\ninterface ProjectCardProps {\n  project: ProjectItem;\n}\n\nexport const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {\n  return (\n    <div className="project-card">\n      <h3>{project.name}</h3>\n      <p>{project.description}</p>\n      <div className="progress-bar">\n        <div style={{ width: \`\${project.progress}%\` }}></div>\n      </div>\n    </div>\n  );\n};` },
          { name: 'AppShell.tsx', type: 'file', language: 'typescript', content: `// AppShell application container component\nimport React from 'react';\n\nexport const AppShell: React.FC = ({ children }) => {\n  return <div className="app-shell">{children}</div>;\n};` },
          { name: 'ProgressBar.tsx', type: 'file', language: 'typescript', content: `export const ProgressBar = ({ progress }: { progress: number }) => (\n  <div className="progress-bar-track">\n    <div className="progress-bar-fill" style={{ width: \`\${progress}%\` }} />\n  </div>\n);` }
        ]
      },
      {
        name: 'pages',
        type: 'folder',
        children: [
          { name: 'Dashboard.tsx', type: 'file', language: 'typescript', content: `import React from 'react';\n\nexport const Dashboard = () => {\n  return <div>Student Dashboard Portal</div>;\n};` },
          { name: 'ProjectWorkspace.tsx', type: 'file', language: 'typescript', content: `// Integrated Developer Workspace\nexport const ProjectWorkspace = () => {\n  return <div>Developer Workspace IDE</div>;\n};` }
        ]
      },
      {
        name: 'services',
        type: 'folder',
        children: [
          { name: 'projectService.ts', type: 'file', language: 'typescript', content: `export const getProjects = async () => {\n  return mockProjects;\n};` }
        ]
      },
      {
        name: 'utils',
        type: 'folder',
        children: [
          { name: 'helpers.ts', type: 'file', language: 'typescript', content: `export const formatDate = (date: string) => {\n  return new Date(date).toLocaleDateString();\n};` }
        ]
      },
      { name: 'App.tsx', type: 'file', language: 'typescript', content: `import React from 'react';\nimport { Routes, Route } from 'react-router-dom';\n\nexport default function App() {\n  return <Routes />;\n}` },
      { name: 'index.css', type: 'file', language: 'css', content: `:root {\n  --brand-orange: #ff4f18;\n  --brand-blue: #0b53a0;\n}` }
    ]
  },
  {
    name: 'public',
    type: 'folder',
    children: [
      { name: 'favicon.ico', type: 'file', language: 'text', content: '[Binary Icon File]' },
      { name: 'logo.svg', type: 'file', language: 'xml', content: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#ff4f18"/></svg>' }
    ]
  },
  {
    name: 'README.md',
    type: 'file',
    language: 'markdown',
    content: `# Smart Campus Analytics — AIET UniSphere Project

An integrated IoT sensor telemetry pipeline and analytics platform designed for AIET-UniSphere campus resource management.

## Tech Stack
- Frontend: React 19, TypeScript, Vite
- Backend: Node.js, Express, Python FastAPI
- Database: PostgreSQL, Redis TimeSeries

## Setup Instructions
\`\`\`bash
npm install
npm run dev
\`\`\`
`
  },
  {
    name: 'package.json',
    type: 'file',
    language: 'json',
    content: `{\n  "name": "ai-campus-analytics",\n  "version": "1.0.0",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build"\n  }\n}`
  }
];
