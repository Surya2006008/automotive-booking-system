import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import Navbar from '../../components/Navbar';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [view, setView] = useState('users');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axiosInstance.get('/admin/stats').then(({ data }) => setStats(data));
    axiosInstance.get('/admin/users').then(({ data }) => setUsers(data));
    axiosInstance.get('/admin/appointments').then(({ data }) => setAppointments(data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    await axiosInstance.delete(`/admin/users/${id}`);
    setUsers(users.filter(u => u._id !== id));
    setMsg('User deleted.');
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h5 className="mb-3">Admin Panel</h5>

        <div className="row g-3 mb-4">
          {[
            { label: 'Total Users', value: stats.totalUsers, color: 'primary' },
            { label: 'Total Appointments', value: stats.totalAppointments, color: 'dark' },
            { label: 'Pending', value: stats.pending, color: 'warning' },
            { label: 'Completed', value: stats.completed, color: 'success' },
          ].map(s => (
            <div className="col-6 col-md-3" key={s.label}>
              <div className={`card text-center p-3 border-${s.color}`}>
                <div className="fs-3 fw-bold">{s.value ?? '—'}</div>
                <div className="text-muted small">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="btn-group mb-3">
          <button className={`btn btn-sm ${view === 'users' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setView('users')}>Users</button>
          <button className={`btn btn-sm ${view === 'appointments' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setView('appointments')}>Appointments</button>
        </div>

        {msg && <div className="alert alert-info">{msg}</div>}

        {view === 'users' && (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr><th>Name</th><th>Email</th><th>Role</th><th>Phone</th><th>Action</th></tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className="badge bg-secondary">{u.role}</span></td>
                    <td>{u.phone || '—'}</td>
                    <td>
                      {u.role !== 'admin' && (
                        <button className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(u._id)}>Delete</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === 'appointments' && (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr><th>Customer</th><th>Dealer</th><th>Service</th><th>Vehicle</th><th>Date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {appointments.map(a => (
                  <tr key={a._id}>
                    <td>{a.customer?.name}</td>
                    <td>{a.dealer?.name}</td>
                    <td>{a.service}</td>
                    <td>{a.vehicle}</td>
                    <td>{a.date}</td>
                    <td><span className="badge bg-secondary">{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
