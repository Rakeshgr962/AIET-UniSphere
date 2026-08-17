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
  lastCommit: 'Initialized repository',
  status: 'Connected',
  githubConnected: true,
  githubUsername: 'student-user',
  starsCount: 0,
  forksCount: 0,
  cloneUrl: 'https://github.com/student-user/ai-campus-analytics.git'
};

export const mockBranches: GitBranchItem[] = [
  {
    id: 'br-1',
    name: 'main',
    lastCommitMessage: 'initial commit',
    updatedTime: 'Just now',
    author: 'Student',
    isDefault: true
  }
];

export const mockCommits: GitCommitItem[] = [];

export const mockGitChanges: GitFileChange = {
  modified: [],
  added: [],
  deleted: []
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
