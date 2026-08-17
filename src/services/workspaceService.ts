import type { ProjectTaskItem } from '../data/projectTasks';
import type { ProjectMilestoneItem } from '../data/projectMilestones';
import { mockProjectTasks } from '../data/projectTasks';
import { mockProjectMilestones } from '../data/projectMilestones';
import { mockWorkspaceFiles } from '../data/repositories';

let localTasks: ProjectTaskItem[] = [...mockProjectTasks];
let localMilestones: ProjectMilestoneItem[] = [...mockProjectMilestones];

export const getProjectWorkspaceFiles = async (_projectId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWorkspaceFiles);
    }, 100);
  });
};

export const getProjectTasks = async (projectId: string): Promise<ProjectTaskItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = localTasks.filter(t => t.projectId === projectId || t.projectId === 'proj-1');
      resolve(filtered);
    }, 100);
  });
};

export const getProjectMilestones = async (projectId: string): Promise<ProjectMilestoneItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = localMilestones.filter(m => m.projectId === projectId || m.projectId === 'proj-1');
      resolve(filtered);
    }, 100);
  });
};

export const toggleTaskStatus = async (taskId: string): Promise<ProjectTaskItem[]> => {
  localTasks = localTasks.map(t => {
    if (t.id === taskId) {
      const nextStatus = t.status === 'Completed' ? 'In Progress' : 'Completed';
      return { ...t, status: nextStatus };
    }
    return t;
  });
  return localTasks;
};
