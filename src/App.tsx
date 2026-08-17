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

        {/* Fallback to Role Selection */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
