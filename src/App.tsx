import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RoleSelection } from './pages/RoleSelection';
import { StudentLogin } from './pages/StudentLogin';
import { StudentSignup } from './pages/StudentSignup';
import { FacultyLogin } from './pages/FacultyLogin';
import { AdminLogin } from './pages/AdminLogin';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Entry / Role Selection Page */}
        <Route path="/" element={<RoleSelection />} />

        {/* Student Routes */}
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/signup/student" element={<StudentSignup />} />

        {/* Faculty & HOD Route */}
        <Route path="/login/faculty" element={<FacultyLogin />} />

        {/* Admin Route */}
        <Route path="/login/admin" element={<AdminLogin />} />

        {/* Fallback to Role Selection */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
