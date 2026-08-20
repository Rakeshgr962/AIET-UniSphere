import { supabase } from '../lib/supabase';

export interface ProjectFileNode {
  id: string;
  project_id: string;
  parent_id: string | null;
  name: string;
  type: 'file' | 'folder';
  path: string;
  content: string | null;
  language?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProject {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  project_type: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// PROJECT CRUD (Supabase-backed with localStorage fallback)
// ============================================================================

const PROJECTS_LS_KEY = 'unisphere_projects';
const FILES_LS_KEY = 'unisphere_project_files';

const getStoredProjects = (): UserProject[] => {
  try {
    return JSON.parse(localStorage.getItem(PROJECTS_LS_KEY) || '[]');
  } catch {
    return [];
  }
};

const saveStoredProjects = (projects: UserProject[]) => {
  localStorage.setItem(PROJECTS_LS_KEY, JSON.stringify(projects));
};

const getStoredFiles = (): ProjectFileNode[] => {
  try {
    return JSON.parse(localStorage.getItem(FILES_LS_KEY) || '[]');
  } catch {
    return [];
  }
};

const saveStoredFiles = (files: ProjectFileNode[]) => {
  localStorage.setItem(FILES_LS_KEY, JSON.stringify(files));
};

const generateId = () => crypto.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// ============================================================================
// PROJECTS
// ============================================================================

export const getUserProjects = async (ownerId: string): Promise<UserProject[]> => {
  // Try Supabase first
  try {
    const { data, error } = await (supabase as any)
      .from('user_projects')
      .select('*')
      .eq('owner_id', ownerId)
      .order('updated_at', { ascending: false });

    if (!error && data) {
      return data;
    }
  } catch {}

  // Fallback to localStorage
  return getStoredProjects().filter(p => p.owner_id === ownerId);
};

export const createUserProject = async (ownerId: string, name: string, description: string): Promise<UserProject> => {
  const now = new Date().toISOString();
  const newProject: UserProject = {
    id: generateId(),
    owner_id: ownerId,
    name,
    description,
    project_type: 'Personal',
    created_at: now,
    updated_at: now
  };

  // Try Supabase
  try {
    const { data, error } = await (supabase as any)
      .from('user_projects')
      .insert(newProject)
      .select()
      .single();

    if (!error && data) return data;
  } catch {}

  // Fallback to localStorage
  const projects = getStoredProjects();
  projects.unshift(newProject);
  saveStoredProjects(projects);

  // Create default folder structure
  await createDefaultProjectStructure(newProject.id);

  return newProject;
};

export const getProjectByIdPersistent = async (projectId: string): Promise<UserProject | null> => {
  try {
    const { data, error } = await (supabase as any)
      .from('user_projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (!error && data) return data;
  } catch {}

  return getStoredProjects().find(p => p.id === projectId) || null;
};

// ============================================================================
// PROJECT FILES
// ============================================================================

export const getProjectFiles = async (projectId: string): Promise<ProjectFileNode[]> => {
  try {
    const { data, error } = await (supabase as any)
      .from('project_files')
      .select('*')
      .eq('project_id', projectId)
      .order('type', { ascending: true })
      .order('name', { ascending: true });

    if (!error && data) return data;
  } catch {}

  return getStoredFiles().filter(f => f.project_id === projectId);
};

export const createProjectFile = async (
  projectId: string,
  parentId: string | null,
  name: string,
  type: 'file' | 'folder',
  parentPath: string
): Promise<ProjectFileNode> => {
  const now = new Date().toISOString();
  const path = parentPath ? `${parentPath}/${name}` : name;
  const lang = type === 'file' ? detectLanguage(name) : undefined;

  const newFile: ProjectFileNode = {
    id: generateId(),
    project_id: projectId,
    parent_id: parentId,
    name,
    type,
    path,
    content: type === 'file' ? '' : null,
    language: lang,
    created_at: now,
    updated_at: now
  };

  try {
    const { data, error } = await (supabase as any)
      .from('project_files')
      .insert(newFile)
      .select()
      .single();

    if (!error && data) return data;
  } catch {}

  const files = getStoredFiles();
  files.push(newFile);
  saveStoredFiles(files);
  return newFile;
};

export const updateFileContent = async (fileId: string, content: string): Promise<void> => {
  const now = new Date().toISOString();

  try {
    const { error } = await (supabase as any)
      .from('project_files')
      .update({ content, updated_at: now })
      .eq('id', fileId);

    if (!error) return;
  } catch {}

  const files = getStoredFiles();
  const idx = files.findIndex(f => f.id === fileId);
  if (idx >= 0) {
    files[idx].content = content;
    files[idx].updated_at = now;
    saveStoredFiles(files);
  }
};

export const renameProjectFile = async (fileId: string, newName: string): Promise<void> => {
  const now = new Date().toISOString();

  try {
    const { error } = await (supabase as any)
      .from('project_files')
      .update({ name: newName, updated_at: now })
      .eq('id', fileId);

    if (!error) return;
  } catch {}

  const files = getStoredFiles();
  const idx = files.findIndex(f => f.id === fileId);
  if (idx >= 0) {
    files[idx].name = newName;
    files[idx].updated_at = now;
    saveStoredFiles(files);
  }
};

export const deleteProjectFile = async (fileId: string, projectId: string): Promise<void> => {
  // Delete the file and all children if it's a folder
  try {
    // Get the file to check if it's a folder
    const allFiles = await getProjectFiles(projectId);
    const target = allFiles.find(f => f.id === fileId);
    if (!target) return;

    const idsToDelete = [fileId];
    if (target.type === 'folder') {
      // Find all descendants
      const findDescendants = (parentId: string) => {
        allFiles.filter(f => f.parent_id === parentId).forEach(child => {
          idsToDelete.push(child.id);
          if (child.type === 'folder') findDescendants(child.id);
        });
      };
      findDescendants(fileId);
    }

    // Try Supabase
    try {
      await (supabase as any)
        .from('project_files')
        .delete()
        .in('id', idsToDelete);
      return;
    } catch {}

    // Fallback localStorage
    const files = getStoredFiles().filter(f => !idsToDelete.includes(f.id));
    saveStoredFiles(files);
  } catch {}
};

// ============================================================================
// HELPERS
// ============================================================================

const detectLanguage = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const map: Record<string, string> = {
    'ts': 'typescript', 'tsx': 'typescript', 'js': 'javascript', 'jsx': 'javascript',
    'css': 'css', 'html': 'html', 'json': 'json', 'md': 'markdown',
    'py': 'python', 'java': 'java', 'cpp': 'cpp', 'c': 'c',
    'rs': 'rust', 'go': 'go', 'rb': 'ruby', 'php': 'php',
    'sql': 'sql', 'yaml': 'yaml', 'yml': 'yaml', 'xml': 'xml',
    'txt': 'text', 'sh': 'shell', 'bash': 'shell'
  };
  return map[ext] || 'text';
};

const createDefaultProjectStructure = async (projectId: string): Promise<void> => {
  const now = new Date().toISOString();
  const files: ProjectFileNode[] = [
    { id: generateId(), project_id: projectId, parent_id: null, name: 'src', type: 'folder', path: 'src', content: null, created_at: now, updated_at: now },
    { id: generateId(), project_id: projectId, parent_id: null, name: 'README.md', type: 'file', path: 'README.md', content: '# New Project\n\nWelcome to your new AIET-UniSphere project!\n\n## Getting Started\n\nEdit this file to add your project documentation.\n', language: 'markdown', created_at: now, updated_at: now },
    { id: generateId(), project_id: projectId, parent_id: null, name: 'package.json', type: 'file', path: 'package.json', content: '{\n  "name": "my-project",\n  "version": "1.0.0",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build"\n  }\n}\n', language: 'json', created_at: now, updated_at: now }
  ];

  // Set src folder's id for children
  const srcId = files[0].id;
  files.push(
    { id: generateId(), project_id: projectId, parent_id: srcId, name: 'index.ts', type: 'file', path: 'src/index.ts', content: '// Entry point\nconsole.log("Hello from AIET-UniSphere Project!");\n', language: 'typescript', created_at: now, updated_at: now },
    { id: generateId(), project_id: projectId, parent_id: srcId, name: 'styles.css', type: 'file', path: 'src/styles.css', content: '/* Project Styles */\n:root {\n  --brand-orange: #ff4f18;\n  --brand-blue: #0b53a0;\n}\n', language: 'css', created_at: now, updated_at: now }
  );

  // Try Supabase
  try {
    await (supabase as any).from('project_files').insert(files);
    return;
  } catch {}

  // Fallback localStorage
  const existing = getStoredFiles();
  saveStoredFiles([...existing, ...files]);
};

// Build a nested tree from flat file list
export const buildFileTree = (flatFiles: ProjectFileNode[]): ProjectFileNode[] => {
  const map = new Map<string, ProjectFileNode & { children?: ProjectFileNode[] }>();
  const roots: (ProjectFileNode & { children?: ProjectFileNode[] })[] = [];

  // First pass: create map
  flatFiles.forEach(f => {
    map.set(f.id, { ...f, children: f.type === 'folder' ? [] : undefined });
  });

  // Second pass: link parents
  flatFiles.forEach(f => {
    const node = map.get(f.id)!;
    if (f.parent_id && map.has(f.parent_id)) {
      const parent = map.get(f.parent_id)!;
      if (!parent.children) parent.children = [];
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  });

  // Sort: folders first, then alphabetically
  const sortNodes = (nodes: (ProjectFileNode & { children?: ProjectFileNode[] })[]) => {
    nodes.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    nodes.forEach(n => {
      if (n.children) sortNodes(n.children);
    });
  };
  sortNodes(roots);

  return roots as any;
};

// Ensure a user has at least one project
export const ensureDefaultProject = async (ownerId: string): Promise<UserProject> => {
  const projects = await getUserProjects(ownerId);
  if (projects.length > 0) return projects[0];
  return createUserProject(ownerId, 'My First Project', 'Default AIET-UniSphere workspace project');
};
