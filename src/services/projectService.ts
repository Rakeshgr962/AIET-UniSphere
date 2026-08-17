import type { ProjectItem } from '../data/projects';
import { mockProjects } from '../data/projects';

let localProjects: ProjectItem[] = [...mockProjects];

export interface CreateProjectPayload {
  name: string;
  description: string;
  projectType: ProjectItem['projectType'];
  course: string;
  technology: string[];
  teamMembers: string;
  deadline: string;
  faculty?: string;
}

export const getProjects = async (): Promise<ProjectItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...localProjects]);
    }, 150);
  });
};

export const getPersonalProjects = async (): Promise<ProjectItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const personal = localProjects.filter(
        p => p.category === 'My Projects' || p.owner === 'Jane Doe'
      );
      resolve(personal);
    }, 150);
  });
};

export const getProjectById = async (id: string): Promise<ProjectItem | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const project = localProjects.find(p => p.id === id);
      resolve(project ? { ...project } : undefined);
    }, 100);
  });
};

export const createProject = async (payload: CreateProjectPayload): Promise<ProjectItem> => {
  return new Promise((resolve) => {
    const techArray = Array.isArray(payload.technology) 
      ? payload.technology 
      : (payload.technology as string).split(',').map((t: string) => t.trim()).filter(Boolean);

    const teamNames = payload.teamMembers
      ? payload.teamMembers.split(',').map(n => n.trim()).filter(Boolean)
      : [];

    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: payload.name,
      description: payload.description,
      course: payload.course || 'General Computer Science',
      projectType: payload.projectType || 'Personal',
      category: 'My Projects',
      faculty: payload.faculty || 'Dr. Faculty Mentor',
      team: [
        { name: 'Jane Doe', role: 'Project Owner', contribution: 'Project Lead', isOwner: true },
        ...teamNames.map(name => ({
          name,
          role: 'Team Collaborator',
          contribution: 'Module Developer'
        }))
      ],
      progress: 5,
      currentMilestone: 'Project Initialization',
      deadline: payload.deadline || '30 Nov 2026',
      status: 'Active',
      technology: techArray.length > 0 ? techArray : ['React', 'TypeScript'],
      repository: payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      lastUpdated: 'Just now',
      owner: 'Jane Doe',
      startDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      requirementsCount: { total: 5, completed: 0 }
    };

    localProjects = [newProject, ...localProjects];
    resolve(newProject);
  });
};

export const getProjectStats = async () => {
  const projects = await getProjects();
  const activeCount = projects.filter(p => p.status === 'Active').length;
  const completedCount = projects.filter(p => p.status === 'Completed').length;
  const pendingReviewCount = projects.filter(p => p.status === 'Pending Review').length;
  const upcomingCount = projects.filter(p => p.status === 'Upcoming').length;

  return {
    active: activeCount,
    completed: completedCount,
    pendingReview: pendingReviewCount,
    upcoming: upcomingCount,
    total: projects.length
  };
};
