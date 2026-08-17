import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RoleSelection } from './pages/RoleSelection';
import { StudentLogin } from './pages/StudentLogin';
import { StudentSignup } from './pages/StudentSignup';
import { FacultyLogin } from './pages/FacultyLogin';
import { AdminLogin } from './pages/AdminLogin';

// Existing Student Portal Features
import { StudentDashboard } from './pages/StudentDashboard';
import { CoursesList } from './pages/CoursesList';
import { CourseDetail } from './pages/CourseDetail';
import { AssignmentsList } from './pages/AssignmentsList';
import { AssignmentDetail } from './pages/AssignmentDetail';
import { AssessmentsList } from './pages/AssessmentsList';
import { AssessmentDetail } from './pages/AssessmentDetail';
import { AssessmentAttempt } from './pages/AssessmentAttempt';
import { AttendanceDetail } from './pages/AttendanceDetail';

// Extended Academic & Communication Pages
import { LeaveRequestsPage } from './pages/LeaveRequestsPage';
import { TimetablePage } from './pages/TimetablePage';
import { AcademicCalendarPage } from './pages/AcademicCalendarPage';
import { ResultsPage } from './pages/ResultsPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';

// Phase 4 Feature Pages
import { NotificationsPage } from './pages/NotificationsPage';
import { ProjectsList } from './pages/ProjectsList';
import { MyProjectsList } from './pages/MyProjectsList';
import { ProjectDetail } from './pages/ProjectDetail';
import { ProjectWorkspace } from './pages/ProjectWorkspace';
import { GitGithubPage } from './pages/GitGithubPage';

// Phase 5 Feature Pages
import { AILearningAssistantPage } from './pages/AILearningAssistantPage';
import { AnalyticsPerformancePage } from './pages/AnalyticsPerformancePage';
import { LearningGapsPage } from './pages/LearningGapsPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { SkillPassportPage } from './pages/SkillPassportPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { StudentServicesPage } from './pages/StudentServicesPage';
import { ServiceRequestsPage } from './pages/ServiceRequestsPage';
import { ServiceRequestDetailPage } from './pages/ServiceRequestDetailPage';

// Phase 6 Faculty Feature Pages
import { FacultyDashboard } from './faculty/pages/FacultyDashboard';
import { FacultyCoursesList } from './faculty/pages/FacultyCoursesList';
import { FacultyCourseDetail } from './faculty/pages/FacultyCourseDetail';
import { FacultyStudentList } from './faculty/pages/FacultyStudentList';
import { FacultyStudentDetail } from './faculty/pages/FacultyStudentDetail';
import { FacultyAttendancePage } from './faculty/pages/FacultyAttendancePage';
import { FacultyAssignmentList } from './faculty/pages/FacultyAssignmentList';
import { FacultyAssignmentDetail } from './faculty/pages/FacultyAssignmentDetail';

// Phase 7 & 8 HOD Portal Pages & Role Guard
import { RoleGuard } from './app/guards/RoleGuard';
import { HODDashboard } from './hod/pages/HODDashboard';
import { HODFacultyList } from './hod/pages/HODFacultyList';
import { HODFacultyDetail } from './hod/pages/HODFacultyDetail';
import { HODStudentList } from './hod/pages/HODStudentList';
import { HODStudentDetail } from './hod/pages/HODStudentDetail';
import { HODCourseList } from './hod/pages/HODCourseList';
import { HODCourseDetail } from './hod/pages/HODCourseDetail';
import { HODAttendancePage } from './hod/pages/HODAttendancePage';

// Phase 8 HOD Portal Batch 2 Pages
import { HODLeaveList } from './hod/pages/HODLeaveList';
import { HODLeaveDetail } from './hod/pages/HODLeaveDetail';
import { HODAssessmentList } from './hod/pages/HODAssessmentList';
import { HODAssessmentDetail } from './hod/pages/HODAssessmentDetail';
import { HODResultsPage } from './hod/pages/HODResultsPage';
import { HODTimetablePage } from './hod/pages/HODTimetablePage';
import { HODAnnouncementPage } from './hod/pages/HODAnnouncementPage';
import { HODAnalyticsPage } from './hod/pages/HODAnalyticsPage';

// Phase 9 Admin Portal Batch 1 Pages
import { AdminDashboard } from './admin/pages/AdminDashboard';
import { UserList } from './admin/pages/UserList';
import { UserDetail } from './admin/pages/UserDetail';
import { UserForm } from './admin/pages/UserForm';
import { OrganizationPage } from './admin/pages/OrganizationPage';
import { DepartmentDetail } from './admin/pages/DepartmentDetail';
import { SecurityPage } from './admin/pages/SecurityPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Entry / Role Selection Page */}
        <Route path="/" element={<RoleSelection />} />

        {/* Auth Student Routes */}
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/signup/student" element={<StudentSignup />} />

        {/* Auth Faculty & Admin Routes */}
        <Route path="/login/faculty" element={<FacultyLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />

        {/* Existing Academic Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/courses" element={<CoursesList />} />
        <Route path="/student/courses/:id" element={<CourseDetail />} />
        <Route path="/student/assignments" element={<AssignmentsList />} />
        <Route path="/student/assignments/:id" element={<AssignmentDetail />} />
        <Route path="/student/assessments" element={<AssessmentsList />} />
        <Route path="/student/assessments/:id" element={<AssessmentDetail />} />
        <Route path="/student/assessments/:id/attempt" element={<AssessmentAttempt />} />
        <Route path="/student/attendance" element={<AttendanceDetail />} />

        {/* Extended Academic & Communication Routes */}
        <Route path="/student/leave-requests" element={<LeaveRequestsPage />} />
        <Route path="/student/timetable" element={<TimetablePage />} />
        <Route path="/student/calendar" element={<AcademicCalendarPage />} />
        <Route path="/student/results" element={<ResultsPage />} />
        <Route path="/student/announcements" element={<AnnouncementsPage />} />

        {/* Phase 4 Required Feature Routes */}
        <Route path="/student/notifications" element={<NotificationsPage />} />
        <Route path="/student/projects" element={<ProjectsList />} />
        <Route path="/student/projects/my" element={<MyProjectsList />} />
        <Route path="/student/projects/:id" element={<ProjectDetail />} />
        <Route path="/student/projects/:id/workspace" element={<ProjectWorkspace />} />
        <Route path="/student/github" element={<GitGithubPage />} />

        {/* Phase 5 Required Feature Routes */}
        <Route path="/student/ai" element={<AILearningAssistantPage />} />
        <Route path="/student/analytics" element={<AnalyticsPerformancePage />} />
        <Route path="/student/learning-gaps" element={<LearningGapsPage />} />
        <Route path="/student/recommendations" element={<RecommendationsPage />} />
        <Route path="/student/skills" element={<SkillPassportPage />} />
        <Route path="/student/achievements" element={<AchievementsPage />} />
        <Route path="/student/services" element={<StudentServicesPage />} />
        <Route path="/student/services/requests" element={<ServiceRequestsPage />} />
        <Route path="/student/services/requests/:id" element={<ServiceRequestDetailPage />} />

        {/* Phase 6 Faculty Portal Routes */}
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/faculty/courses" element={<FacultyCoursesList />} />
        <Route path="/faculty/courses/:id" element={<FacultyCourseDetail />} />
        <Route path="/faculty/students" element={<FacultyStudentList />} />
        <Route path="/faculty/students/:id" element={<FacultyStudentDetail />} />
        <Route path="/faculty/attendance" element={<FacultyAttendancePage />} />
        <Route path="/faculty/assignments" element={<FacultyAssignmentList />} />
        <Route path="/faculty/assignments/:id" element={<FacultyAssignmentDetail />} />

        {/* Phase 7 HOD Portal Routes */}
        <Route path="/hod/dashboard" element={<RoleGuard allowedRoles={['HOD', 'ADMIN']}><HODDashboard /></RoleGuard>} />
        <Route path="/hod/faculty" element={<RoleGuard allowedRoles={['HOD', 'ADMIN']}><HODFacultyList /></RoleGuard>} />
        <Route path="/hod/faculty/:id" element={<RoleGuard allowedRoles={['HOD', 'ADMIN']}><HODFacultyDetail /></RoleGuard>} />
        <Route path="/hod/students" element={<RoleGuard allowedRoles={['HOD', 'ADMIN']}><HODStudentList /></RoleGuard>} />
        <Route path="/hod/students/:id" element={<RoleGuard allowedRoles={['HOD', 'ADMIN']}><HODStudentDetail /></RoleGuard>} />
        <Route path="/hod/courses" element={<RoleGuard allowedRoles={['HOD', 'ADMIN']}><HODCourseList /></RoleGuard>} />
        <Route path="/hod/courses/:id" element={<RoleGuard allowedRoles={['HOD', 'ADMIN']}><HODCourseDetail /></RoleGuard>} />
        <Route path="/hod/attendance" element={<RoleGuard allowedRoles={['HOD', 'ADMIN']}><HODAttendancePage /></RoleGuard>} />

        {/* Phase 8 HOD Portal Batch 2 Routes */}
        <Route path="/hod/leave" element={<RoleGuard allowedRoles={['HOD', 'ADMIN']}><HODLeaveList /></RoleGuard>} />
        <Route path="/hod/leave/:id" element={<RoleGuard allowedRoles={['HOD', 'ADMIN']}><HODLeaveDetail /></RoleGuard>} />
        <Route path="/hod/assessments" element={<RoleGuard allowedRoles={['HOD', 'ADMIN']}><HODAssessmentList /></RoleGuard>} />
        <Route path="/hod/assessments/:id" element={<RoleGuard allowedRoles={['HOD', 'ADMIN']}><HODAssessmentDetail /></RoleGuard>} />
        <Route path="/hod/results" element={<RoleGuard allowedRoles={['HOD', 'ADMIN']}><HODResultsPage /></RoleGuard>} />
        <Route path="/hod/timetable" element={<RoleGuard allowedRoles={['HOD', 'ADMIN']}><HODTimetablePage /></RoleGuard>} />
        <Route path="/hod/announcements" element={<RoleGuard allowedRoles={['HOD', 'ADMIN']}><HODAnnouncementPage /></RoleGuard>} />
        <Route path="/hod/analytics" element={<RoleGuard allowedRoles={['HOD', 'ADMIN']}><HODAnalyticsPage /></RoleGuard>} />

        {/* Phase 9 Admin Portal Batch 1 Routes */}
        <Route path="/admin/dashboard" element={<RoleGuard allowedRoles={['ADMIN']}><AdminDashboard /></RoleGuard>} />
        <Route path="/admin/users" element={<RoleGuard allowedRoles={['ADMIN']}><UserList /></RoleGuard>} />
        <Route path="/admin/users/create" element={<RoleGuard allowedRoles={['ADMIN']}><UserForm /></RoleGuard>} />
        <Route path="/admin/users/:id" element={<RoleGuard allowedRoles={['ADMIN']}><UserDetail /></RoleGuard>} />
        <Route path="/admin/users/:id/edit" element={<RoleGuard allowedRoles={['ADMIN']}><UserForm /></RoleGuard>} />
        <Route path="/admin/organization" element={<RoleGuard allowedRoles={['ADMIN']}><OrganizationPage /></RoleGuard>} />
        <Route path="/admin/organization/departments/:id" element={<RoleGuard allowedRoles={['ADMIN']}><DepartmentDetail /></RoleGuard>} />
        <Route path="/admin/security" element={<RoleGuard allowedRoles={['ADMIN']}><SecurityPage /></RoleGuard>} />

        {/* Fallback to Role Selection */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
