import type { 
  RepositoryInfo, 
  GitBranchItem, 
  GitCommitItem, 
  GitFileChange 
} from '../data/repositories';
import { 
  mockRepository, 
  mockBranches, 
  mockCommits, 
  mockGitChanges 
} from '../data/repositories';

let currentRepoState: RepositoryInfo = { ...mockRepository };
let localBranches: GitBranchItem[] = [...mockBranches];
let localCommits: GitCommitItem[] = [...mockCommits];
let localChanges: GitFileChange = { ...mockGitChanges };

export const getRepositoryInfo = async (): Promise<RepositoryInfo> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...currentRepoState });
    }, 100);
  });
};

export const getBranches = async (): Promise<GitBranchItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...localBranches]);
    }, 100);
  });
};

export const getCommits = async (): Promise<GitCommitItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...localCommits]);
    }, 100);
  });
};

export const getGitChanges = async (): Promise<GitFileChange> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...localChanges });
    }, 100);
  });
};

export const addCommit = async (message: string): Promise<GitCommitItem> => {
  return new Promise((resolve) => {
    const randomHash = Math.random().toString(36).substring(2, 9);
    const newCommit: GitCommitItem = {
      id: `cmt-${Date.now()}`,
      hash: randomHash + '1234567890abcdef',
      shortHash: randomHash,
      message,
      author: 'Jane Doe',
      date: 'Just now',
      branch: currentRepoState.currentBranch
    };

    localCommits = [newCommit, ...localCommits];
    currentRepoState.lastCommit = 'Updated Just now';
    
    // Clear staged changes upon commit
    localChanges = {
      modified: [],
      added: [],
      deleted: []
    };

    resolve(newCommit);
  });
};

export const switchBranch = async (branchName: string): Promise<RepositoryInfo> => {
  currentRepoState.currentBranch = branchName;
  return getRepositoryInfo();
};

export const toggleGitHubConnection = async (connect: boolean): Promise<RepositoryInfo> => {
  currentRepoState = {
    ...currentRepoState,
    githubConnected: connect,
    status: connect ? 'Connected' : 'Not Connected'
  };
  return getRepositoryInfo();
};
