export interface SkillEvidenceItem {
  id: string;
  title: string;
  type: 'Project' | 'Assessment' | 'Git Activity' | 'Course';
  date: string;
  description: string;
  scoreOrDetail?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Programming' | 'Web Development' | 'Database' | 'AI / ML' | 'Tools';
  level: 'Advanced' | 'Intermediate' | 'Developing';
  percent: number;
  evidenceList: SkillEvidenceItem[];
  relatedProjects: string[];
  relatedCourses: string[];
}

export interface StudentSkillProfile {
  studentName: string;
  program: string;
  department: string;
  semester: string;
  usn: string;
  cgpa: number;
  totalSkillsCount: number;
  totalVerifiedEvidence: number;
  skillCategories: {
    categoryName: 'Programming' | 'Web Development' | 'Database' | 'AI / ML' | 'Tools';
    skills: SkillItem[];
  }[];
}

export const mockSkillPassport: StudentSkillProfile = {
  studentName: 'Jane Doe',
  program: 'B.E. Computer Science & Engineering',
  department: 'Department of CSE',
  semester: 'Semester 6 (2026)',
  usn: '1AI23CS045',
  cgpa: 8.62,
  totalSkillsCount: 12,
  totalVerifiedEvidence: 24,
  skillCategories: [
    {
      categoryName: 'Programming',
      skills: [
        {
          id: 'sk-1',
          name: 'Python',
          category: 'Programming',
          level: 'Advanced',
          percent: 88,
          relatedProjects: ['AI Campus Analytics', 'Customer Churn Predictor'],
          relatedCourses: ['CS601 Artificial Intelligence'],
          evidenceList: [
            { id: 'ev-1', title: 'AI Campus Analytics ML Pipeline', type: 'Project', date: 'Aug 2026', description: 'Implemented pandas data preprocessing and scikit-learn models.' },
            { id: 'ev-2', title: 'Python Programming Assessment', type: 'Assessment', date: 'Jul 2026', description: 'Scored 94/100 in Python Data Structures Test.' },
            { id: 'ev-3', title: '38 Commits in Python Repositories', type: 'Git Activity', date: 'Jul 2026', description: 'Recorded on GitHub repository main branch.' }
          ]
        },
        {
          id: 'sk-2',
          name: 'C / C++',
          category: 'Programming',
          level: 'Intermediate',
          percent: 75,
          relatedProjects: ['OS Process Scheduler Simulator'],
          relatedCourses: ['CS603 Operating Systems'],
          evidenceList: [
            { id: 'ev-4', title: 'Pthread Synchronization Lab', type: 'Course', date: 'Jun 2026', description: 'Completed OS Lab Exercise on Mutexes.' }
          ]
        }
      ]
    },
    {
      categoryName: 'Web Development',
      skills: [
        {
          id: 'sk-3',
          name: 'JavaScript / TypeScript',
          category: 'Web Development',
          level: 'Advanced',
          percent: 85,
          relatedProjects: ['AIET-UniSphere Student Portal', 'Real-Time Sensor Dashboard'],
          relatedCourses: ['CS605 Web Engineering'],
          evidenceList: [
            { id: 'ev-5', title: 'Student Portal Phase 4 Frontend', type: 'Project', date: 'Aug 2026', description: 'Built React IDE and GitHub integration components.' },
            { id: 'ev-6', title: 'JavaScript ES6+ Quiz', type: 'Assessment', date: 'Jul 2026', description: 'Scored 90/100 in Web Engineering test.' }
          ]
        },
        {
          id: 'sk-4',
          name: 'React.js',
          category: 'Web Development',
          level: 'Intermediate',
          percent: 78,
          relatedProjects: ['AIET-UniSphere Student Portal'],
          relatedCourses: ['CS605 Web Engineering'],
          evidenceList: [
            { id: 'ev-7', title: 'React Hooks & State Management Lab', type: 'Project', date: 'Aug 2026', description: 'Created modular reusable card and state handlers.' }
          ]
        }
      ]
    },
    {
      categoryName: 'Database',
      skills: [
        {
          id: 'sk-5',
          name: 'SQL & Database Design',
          category: 'Database',
          level: 'Advanced',
          percent: 86,
          relatedProjects: ['Smart Campus Library DB'],
          relatedCourses: ['CS602 Database Management Systems'],
          evidenceList: [
            { id: 'ev-8', title: 'DBMS 3NF Normalization Project', type: 'Project', date: 'Jul 2026', description: 'Designed ER diagram and normalized SQL tables.' },
            { id: 'ev-9', title: 'Internal Assessment 2 SQL Queries', type: 'Assessment', date: 'Jul 2026', description: 'Scored 25.2/30 in DBMS Assessment.' }
          ]
        }
      ]
    },
    {
      categoryName: 'AI / ML',
      skills: [
        {
          id: 'sk-6',
          name: 'Machine Learning (Scikit-Learn)',
          category: 'AI / ML',
          level: 'Developing',
          percent: 68,
          relatedProjects: ['AI Campus Analytics'],
          relatedCourses: ['CS601 Artificial Intelligence'],
          evidenceList: [
            { id: 'ev-10', title: 'Neural Networks Lab Exercise', type: 'Course', date: 'Aug 2026', description: 'Trained multi-layer perceptron model.' }
          ]
        }
      ]
    },
    {
      categoryName: 'Tools',
      skills: [
        {
          id: 'sk-7',
          name: 'Git & GitHub',
          category: 'Tools',
          level: 'Advanced',
          percent: 84,
          relatedProjects: ['AI Campus Analytics', 'AIET-UniSphere'],
          relatedCourses: ['CS605 Web Engineering'],
          evidenceList: [
            { id: 'ev-11', title: 'GitHub Version Control Certification', type: 'Git Activity', date: 'Aug 2026', description: 'Maintained clean commit history & branch PRs.' }
          ]
        }
      ]
    }
  ]
};
