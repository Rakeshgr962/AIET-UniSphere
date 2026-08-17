export interface CourseModule {
  id: number;
  title: string;
  completion: number; // percentage
  materialsCount: number;
  assignmentsCount: number;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  faculty: string;
  progress: number;
  attendance: number;
  description: string;
  nextActivity: string;
  semester: number;
  modules: CourseModule[];
}

export const mockCourses: Course[] = [
  {
    id: "cse-601",
    code: "CSE-601",
    name: "Database Management Systems",
    faculty: "Dr. Rajesh Kumar",
    progress: 72,
    attendance: 88,
    description: "This course introduces fundamental database concepts including relational database models, entity-relationship diagrams, SQL query optimization, normal forms, transaction management, and concurrency control mechanism. Practical sessions focus on PostgreSQL database design and query writing.",
    nextActivity: "Module 5 — Transactions & Concurrency Control",
    semester: 6,
    modules: [
      { id: 1, title: "Introduction & Relational Database Model", completion: 100, materialsCount: 4, assignmentsCount: 1 },
      { id: 2, title: "Entity-Relationship (ER) Design", completion: 100, materialsCount: 6, assignmentsCount: 1 },
      { id: 3, title: "Structured Query Language (SQL) Basics & Joins", completion: 100, materialsCount: 8, assignmentsCount: 1 },
      { id: 4, title: "Normalization Forms (1NF, 2NF, 3NF, BCNF)", completion: 60, materialsCount: 5, assignmentsCount: 1 },
      { id: 5, title: "Transactions & Concurrency Control Protocols", completion: 0, materialsCount: 3, assignmentsCount: 0 }
    ]
  },
  {
    id: "cse-602",
    code: "CSE-602",
    name: "Operating Systems",
    faculty: "Prof. Sunita Sharma",
    progress: 64,
    attendance: 81,
    description: "Concepts of modern operating systems including process management, threads, cpu scheduling, synchronization barriers, deadlocks, virtual memory allocation, paging, disk scheduling algorithm, and filesystem architectures.",
    nextActivity: "Module 4 — Virtual Memory & Paging",
    semester: 6,
    modules: [
      { id: 1, title: "OS Overview & System Calls", completion: 100, materialsCount: 5, assignmentsCount: 1 },
      { id: 2, title: "Process Scheduling & Threads", completion: 100, materialsCount: 7, assignmentsCount: 1 },
      { id: 3, title: "Process Synchronization & Deadlocks", completion: 80, materialsCount: 6, assignmentsCount: 1 },
      { id: 4, title: "Memory Management & Paging", completion: 20, materialsCount: 4, assignmentsCount: 0 },
      { id: 5, title: "Storage & File Systems Architecture", completion: 0, materialsCount: 3, assignmentsCount: 0 }
    ]
  },
  {
    id: "cse-603",
    code: "CSE-603",
    name: "Computer Networks",
    faculty: "Dr. Amit Patel",
    progress: 81,
    attendance: 76,
    description: "Comprehensive study of computer network protocols and topologies. Covers ISO/OSI standard layer stack, routing protocols, TCP congestion control, DNS, HTTP, socket programming paradigms, and cryptographic security extensions.",
    nextActivity: "Module 5 — Cryptography and Network Security",
    semester: 6,
    modules: [
      { id: 1, title: "Physical Layer & Media Access Control", completion: 100, materialsCount: 6, assignmentsCount: 1 },
      { id: 2, title: "Data Link Layer Protocols & Ethernet", completion: 100, materialsCount: 5, assignmentsCount: 1 },
      { id: 3, title: "Network Layer Routing (IP, OSPF, BGP)", completion: 100, materialsCount: 8, assignmentsCount: 2 },
      { id: 4, title: "Transport Layer Protocols (TCP, UDP)", completion: 90, materialsCount: 6, assignmentsCount: 1 },
      { id: 5, title: "Application Protocols & Network Security", completion: 10, materialsCount: 4, assignmentsCount: 0 }
    ]
  },
  {
    id: "cse-604",
    code: "CSE-604",
    name: "Artificial Intelligence",
    faculty: "Dr. Lakshmi Prasad",
    progress: 58,
    attendance: 91,
    description: "An overview of search methodologies, state spaces, heuristics, game playing, logical agents, expert engines, machine learning algorithms, and deep neural models with Python based examples.",
    nextActivity: "Module 3 — Constraint Satisfaction Problems",
    semester: 6,
    modules: [
      { id: 1, title: "Heuristic State Space Searches", completion: 100, materialsCount: 4, assignmentsCount: 1 },
      { id: 2, title: "Knowledge Representation & Propositional Logic", completion: 80, materialsCount: 5, assignmentsCount: 1 },
      { id: 3, title: "Constraint Satisfaction Problems", completion: 10, materialsCount: 4, assignmentsCount: 0 },
      { id: 4, title: "Introduction to Machine Learning", completion: 0, materialsCount: 6, assignmentsCount: 0 },
      { id: 5, title: "Artificial Neural Networks & NLP", completion: 0, materialsCount: 3, assignmentsCount: 0 }
    ]
  },
  {
    id: "cse-605",
    code: "CSE-605",
    name: "Design & Analysis of Algorithms",
    faculty: "Prof. Anil Verma",
    progress: 75,
    attendance: 84,
    description: "Algorithmic analysis paradigms including asymptotic notation (Big O), divide and conquer divide-and-solve systems, greedy selection policies, dynamic programming, graph traversals (BFS, DFS, Dijkstra, Prim), and NP-completeness bounds.",
    nextActivity: "Module 4 — Graph Algorithms",
    semester: 6,
    modules: [
      { id: 1, title: "Mathematical Foundations & Asymptotic Complexity", completion: 100, materialsCount: 5, assignmentsCount: 1 },
      { id: 2, title: "Divide-and-Conquer Paradigm", completion: 100, materialsCount: 6, assignmentsCount: 1 },
      { id: 3, title: "Greedy Algorithms vs Dynamic Programming", completion: 90, materialsCount: 8, assignmentsCount: 2 },
      { id: 4, title: "Graph Layouts and Flow Networks", completion: 30, materialsCount: 7, assignmentsCount: 1 },
      { id: 5, title: "NP-Completeness and Approximations", completion: 0, materialsCount: 4, assignmentsCount: 0 }
    ]
  },
  {
    id: "cse-606",
    code: "CSE-606",
    name: "Software Engineering",
    faculty: "Dr. Sneha Reddy",
    progress: 90,
    attendance: 89,
    description: "Introduction to SDLC architectures (Agile, Scrum, Waterfall). Covers UML schema drawings, modular layout standards, software quality metrics, testing configurations (Unit, Integration, System tests), and DevOps automation pipelines.",
    nextActivity: "Module 5 — Automated Code Testing & CI/CD",
    semester: 6,
    modules: [
      { id: 1, title: "Agile SDLC Principles & User Stories", completion: 100, materialsCount: 4, assignmentsCount: 1 },
      { id: 2, title: "UML Architecture Diagrams & Object Design", completion: 100, materialsCount: 5, assignmentsCount: 1 },
      { id: 3, title: "Design Patterns (Singleton, MVC, Factory)", completion: 100, materialsCount: 6, assignmentsCount: 1 },
      { id: 4, title: "Quality Assurance & Unit Test Frameworks", completion: 80, materialsCount: 4, assignmentsCount: 1 },
      { id: 5, title: "CI/CD Deployment pipelines & Maintenance", completion: 30, materialsCount: 5, assignmentsCount: 0 }
    ]
  }
];
