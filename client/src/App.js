import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import CreateQuiz from './pages/CreateQuiz';
import SubjectDetails from './pages/SubjectDetails';
import QuizPage from './pages/QuizPage';
import Analytics from './pages/Analytics';


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user === undefined) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/subjects" element={
  <ProtectedRoute>
    <Subjects />
  </ProtectedRoute>
} />
        <Route
  path="/subjects/:id"
  element={
    <ProtectedRoute>
      <SubjectDetails />
    </ProtectedRoute>
  }
/>
<Route
  path="/subjects/:id/create-quiz"
  element={
    <ProtectedRoute>
      <CreateQuiz />
    </ProtectedRoute>
  }
/>
<Route
  path="/quiz/:id"
  element={
    <ProtectedRoute>
      <QuizPage />
    </ProtectedRoute>
  }
/>
<Route path="/analytics" element={<Analytics />
} 
/>
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;