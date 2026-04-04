import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import PendingApproval from './pages/PendingApproval';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import BookAppointment from './pages/customer/BookAppointment';
import EditAppointment from './pages/customer/EditAppointment';
import DealerDashboard from './pages/dealer/DealerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/pending-approval" element={<PendingApproval />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/customer/dashboard" element={
            <PrivateRoute role="customer"><CustomerDashboard /></PrivateRoute>} />
          <Route path="/customer/book" element={
            <PrivateRoute role="customer"><BookAppointment /></PrivateRoute>} />
          <Route path="/customer/edit/:id" element={
            <PrivateRoute role="customer"><EditAppointment /></PrivateRoute>} />

          <Route path="/dealer/dashboard" element={
            <PrivateRoute role="dealer"><DealerDashboard /></PrivateRoute>} />

          <Route path="/admin/dashboard" element={
            <PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;