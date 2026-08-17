export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  deadline: string;
  marks: number;
  status: 'Pending' | 'Submitted' | 'Graded' | 'Overdue';
  instructions: string;
  resources: string[];
  rubric: string[];
  submittedFile?: {
    name: string;
    submittedAt: string;
  };
  grade?: {
    score: number;
    feedback: string;
    gradedBy: string;
  };
}

export const mockAssignments: Assignment[] = [
  {
    id: "assign-dbms-04",
    title: "DBMS Assignment 04 — Indexing and SQL Query Optimization",
    courseId: "cse-601",
    courseName: "Database Management Systems",
    deadline: "2026-08-17T18:00:00", // Due Today
    marks: 20,
    status: "Pending",
    instructions: "Write optimized SQL queries for the provided schema. Analyze query execution plans using EXPLAIN ANALYZE. Design appropriate B-Tree index definitions to speed up filter and join clauses. Submit a single PDF file containing SQL source definitions and screenshots of execution plan trees.",
    resources: [
      "DBMS_Assignment_Schema_Specs.pdf",
      "Query_Optimization_Sample_Cheatsheet.md"
    ],
    rubric: [
      "SQL Correctness & Formatting (5 Marks)",
      "Explain Plan Diagnostics & Analysis (5 Marks)",
      "Indexing Strategy Justification (5 Marks)",
      "Performance Benchmark comparison (5 Marks)"
    ]
  },
  {
    id: "assign-os-02",
    title: "Operating Systems Assignment 02 — CPU Scheduling Simulations",
    courseId: "cse-602",
    courseName: "Operating Systems",
    deadline: "2026-08-18T23:59:00", // Due Tomorrow
    marks: 25,
    status: "Pending",
    instructions: "Implement a C program simulating FCFS, Round Robin (Quantum=2ms), and Priority scheduling engines. Calculate average waiting times and turnaround times. Discuss the convoy effect and priority inversion problems.",
    resources: [
      "CPU_Scheduling_Simulation_Template.c",
      "Scheduling_Assignment_Instructions.pdf"
    ],
    rubric: [
      "Code Compiles and executes (10 Marks)",
      "Simulation Calculations correctness (10 Marks)",
      "Convoy & Inversion Analysis Essay (5 Marks)"
    ]
  },
  {
    id: "assign-net-03",
    title: "Computer Networks Assignment 03 — TCP socket programming",
    courseId: "cse-603",
    courseName: "Computer Networks",
    deadline: "2026-08-25T11:59:00",
    marks: 30,
    status: "Pending",
    instructions: "Develop a basic client-server chat console using TCP Sockets in Python. Support concurrent messaging threads using the select or threading library. Document message formatting protocols.",
    resources: [
      "Socket_Programming_Getting_Started.py"
    ],
    rubric: [
      "Client-Server Connection stability (10 Marks)",
      "Concurrent Message delivery (10 Marks)",
      "Protocol documentation (10 Marks)"
    ]
  },
  {
    id: "assign-da-02",
    title: "Algorithms Assignment 02 — Dynamic Programming Exercises",
    courseId: "cse-605",
    courseName: "Design & Analysis of Algorithms",
    deadline: "2026-08-12T23:59:00",
    marks: 20,
    status: "Submitted",
    instructions: "Write optimal algorithms solving the Knapsack Problem (0/1) and Longest Common Subsequence (LCS). Prove time complexity using Recurrence Equations.",
    resources: [
      "DP_Workout_Questions.pdf"
    ],
    rubric: [
      "LCS formulation correctness (10 Marks)",
      "0/1 Knapsack optimization (10 Marks)"
    ],
    submittedFile: {
      name: "1AB20CS002_Algorithms_DP.pdf",
      submittedAt: "2026-08-11T21:40:00"
    }
  },
  {
    id: "assign-se-01",
    title: "Software Engineering Assignment 01 — UML System Designs",
    courseId: "cse-606",
    courseName: "Software Engineering",
    deadline: "2026-08-05T23:59:00",
    marks: 15,
    status: "Graded",
    instructions: "Design UML Use Case, Class, and Sequence drawings for a proposed College Hostel Allocation platform.",
    resources: [
      "Hostel_Management_Case_Study.pdf"
    ],
    rubric: [
      "Use Case completeness (5 Marks)",
      "Class relations accuracy (5 Marks)",
      "Sequence workflow timeline (5 Marks)"
    ],
    submittedFile: {
      name: "1AB20CS002_SE_Hostel_UML.pdf",
      submittedAt: "2026-08-04T15:30:00"
    },
    grade: {
      score: 13,
      feedback: "Great object relations in the Class diagram. The Sequence diagram was missing the database entity lifecycle step, but otherwise very well done.",
      gradedBy: "Dr. Sneha Reddy"
    }
  },
  {
    id: "assign-ai-01",
    title: "AI Assignment 01 — Search Algorithms & State Spaces",
    courseId: "cse-604",
    courseName: "Artificial Intelligence",
    deadline: "2026-08-01T23:59:00",
    marks: 20,
    status: "Overdue",
    instructions: "Implement A* search and BFS searches to navigate a standard maze grid. Graph heuristic efficiency compared to raw traversal paths.",
    resources: [],
    rubric: [
      "A* Search optimization accuracy (10 Marks)",
      "Heuristic analysis graph (10 Marks)"
    ]
  }
];
