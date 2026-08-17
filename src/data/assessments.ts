export interface AssessmentQuestion {
  id: number;
  text: string;
  options: string[];
  correctOptionIndex: number;
  marks: number;
}

export interface Assessment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  date: string;
  time: string;
  duration: number; // in minutes
  status: 'Upcoming' | 'Completed';
  questionsCount: number;
  instructions: string;
  questions?: AssessmentQuestion[];
  result?: {
    score: number;
    percentage: number;
    correctCount: number;
    incorrectCount: number;
    topicPerformance: { topic: string; score: number }[];
  };
}

export const mockAssessments: Assessment[] = [
  {
    id: "assess-dbms-ut2",
    title: "Database Systems — Unit Test 2",
    courseId: "cse-601",
    courseName: "Database Management Systems",
    date: "2026-08-18", // Tomorrow
    time: "10:00 AM",
    duration: 60,
    status: "Upcoming",
    questionsCount: 20,
    instructions: "This test covers Normalization (1NF, 2NF, 3NF, BCNF) and Transaction properties (ACID, Concurrency anomalies, 2PL). Once started, the timer cannot be paused. Ensure you have a stable internet connection. All questions are multiple choice. Marks will be instantly displayed upon submission.",
    questions: [
      {
        id: 1,
        text: "Which normal form deals with removing transitive dependencies on candidate keys?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctOptionIndex: 2,
        marks: 1
      },
      {
        id: 2,
        text: "If every non-prime attribute is fully functionally dependent on the primary key, the relation is in which normal form?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctOptionIndex: 1,
        marks: 1
      },
      {
        id: 3,
        text: "Under ACID properties, which property ensures that all transactions are fully saved or fully aborted (all-or-nothing)?",
        options: ["Atomicity", "Consistency", "Isolation", "Durability"],
        correctOptionIndex: 0,
        marks: 1
      },
      {
        id: 4,
        text: "Which of the following database isolation levels completely prevents dirty reads, non-repeatable reads, and phantom reads?",
        options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
        correctOptionIndex: 3,
        marks: 2
      },
      {
        id: 5,
        text: "What does the 2PL (Two-Phase Locking) protocol prevent?",
        options: ["Deadlocks", "Cascading Rollbacks", "Non-Serializable Schedules", "Phantom Reads"],
        correctOptionIndex: 2,
        marks: 2
      }
    ]
  },
  {
    id: "assess-os-ia",
    title: "Operating Systems — Internal Assessment",
    courseId: "cse-602",
    courseName: "Operating Systems",
    date: "2026-08-21",
    time: "02:00 PM",
    duration: 45,
    status: "Upcoming",
    questionsCount: 15,
    instructions: "Covers CPU Scheduling algorithms, Process Synchronization barriers, and Deadlock detection schemes (Banker's Algorithm). Consists of MCQ questions and true/false statements. There is no negative marking.",
    questions: [
      {
        id: 1,
        text: "Which CPU scheduling algorithm can lead to starvation?",
        options: ["First-Come First-Served", "Round Robin", "Shortest Job First (SJF) / Shortest Remaining Time First", "Multilevel Queue with Feedbacks"],
        correctOptionIndex: 2,
        marks: 1
      },
      {
        id: 2,
        text: "A semaphore initialized to 1 is commonly called as:",
        options: ["Counting Semaphore", "Mutex / Binary Semaphore", "Barrier Synchronizer", "Condition Signal"],
        correctOptionIndex: 1,
        marks: 1
      }
    ]
  },
  {
    id: "assess-dbms-ut1",
    title: "Database Systems — Unit Test 1",
    courseId: "cse-601",
    courseName: "Database Management Systems",
    date: "2026-08-01",
    time: "10:00 AM",
    duration: 60,
    status: "Completed",
    questionsCount: 20,
    instructions: "Covers Database Basics, ER Models, and basic SQL commands.",
    result: {
      score: 16,
      percentage: 80,
      correctCount: 16,
      incorrectCount: 4,
      topicPerformance: [
        { topic: "Database Architecture", score: 90 },
        { topic: "ER Diagram Schemas", score: 70 },
        { topic: "SQL Basics", score: 82 }
      ]
    }
  },
  {
    id: "assess-net-ut1",
    title: "Computer Networks — Unit Test 1",
    courseId: "cse-603",
    courseName: "Computer Networks",
    date: "2026-07-25",
    time: "11:30 AM",
    duration: 50,
    status: "Completed",
    questionsCount: 15,
    instructions: "Covers OSI/TCP-IP reference architectures, Physical Layer wiring, and MAC Layer protocols.",
    result: {
      score: 12,
      percentage: 80,
      correctCount: 12,
      incorrectCount: 3,
      topicPerformance: [
        { topic: "OSI Layer Models", score: 85 },
        { topic: "Physical Layer Specs", score: 75 },
        { topic: "CSMA/CD & MAC Protocol", score: 80 }
      ]
    }
  }
];
