import type { DepartmentItem } from '../../shared/types/department';

export const mockDepartmentsList: DepartmentItem[] = [
  {
    id: "dept-ds",
    code: "CSE-DS",
    name: "CSE — Data Science",
    hodName: "Dr. Sneha Reddy",
    hodEmail: "hod001@example.test",
    facultyCount: 8,
    studentCount: 220,
    sections: [
      { semester: 4, section: "Sec A", studentCount: 54 },
      { semester: 4, section: "Sec B", studentCount: 50 },
      { semester: 6, section: "Sec A", studentCount: 62 },
      { semester: 6, section: "Sec B", studentCount: 54 }
    ],
    status: "Active"
  },
  {
    id: "dept-cs",
    code: "CSE",
    name: "Computer Science & Engineering",
    hodName: "Dr. Ramesh Babu",
    hodEmail: "hod002@example.test",
    facultyCount: 9,
    studentCount: 240,
    sections: [
      { semester: 4, section: "Sec A", studentCount: 60 },
      { semester: 4, section: "Sec B", studentCount: 60 },
      { semester: 6, section: "Sec A", studentCount: 60 },
      { semester: 6, section: "Sec B", studentCount: 60 }
    ],
    status: "Active"
  },
  {
    id: "dept-ise",
    code: "ISE",
    name: "Information Science & Engineering",
    hodName: "Dr. Kavita Nair",
    hodEmail: "hod.ise@example.test",
    facultyCount: 6,
    studentCount: 160,
    sections: [
      { semester: 4, section: "Sec A", studentCount: 40 },
      { semester: 6, section: "Sec A", studentCount: 40 }
    ],
    status: "Active"
  },
  {
    id: "dept-ece",
    code: "ECE",
    name: "Electronics & Communication",
    hodName: "Dr. M. K. Rao",
    hodEmail: "hod.ece@example.test",
    facultyCount: 7,
    studentCount: 180,
    sections: [
      { semester: 4, section: "Sec A", studentCount: 45 },
      { semester: 6, section: "Sec A", studentCount: 45 }
    ],
    status: "Active"
  }
];
