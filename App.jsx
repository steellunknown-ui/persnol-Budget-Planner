import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tracker from './pages/Tracker';
import BudgetPlanner from './pages/BudgetPlanner';
import EmiPlanner from './pages/EmiPlanner';
import Reports from './pages/Reports';
import Settings from './pages/Settings';


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('budgetpro_user') !== null;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Authenticated Layout Routes */}
        <Route path="/app" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          {/* Index route for /app goes to dashboard */}
          <Route index element={<Dashboard />} />
          <Route path="tracker" element={<Tracker />} />
          <Route path="budget-planner" element={<BudgetPlanner />} />
          <Route path="emi-planner" element={<EmiPlanner />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch-all redirect to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
