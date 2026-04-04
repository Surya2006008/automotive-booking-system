import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import Navbar from '../../components/Navbar';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [pendingDealers, setPendingDealers] = useState([]);
  const [view, setView] = useState('users');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axiosInstance.get('/admin/stats').then(({ data }) => setStats(data));
    axiosInstance.get('/admin/users').then(({ data }) => setUsers(data));
    axiosInstance.get('/admin/appointments').then(({ data }) => setAppointments(data));
    axiosInstance.get('/admin/dealers/pending').then(({ data }) => setPendingDealers(data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    await axiosInstance.delete(`/admin/users/${id}`);
    setUsers(users.filter(u => u._id !== id));
    setMsg('User deleted.');
  };

  const handleApprove = async (dealer) => {
    await axiosInstance.put(`/admin/dealers/${dealer._id}/approve`);
    setPendingDealers(pendingDealers.filter(d => d._id !== dealer._id));
    setMsg(`${dealer.name} approved!`);
  };

  const handleReject = async (dealer) => {
    await axiosInstance.put(`/admin/dealers/${dealer._id}/reject`);
    setPendingDealers(pendingDealers.filter(d => d._id !== dealer._id));
    setMsg(`${dealer.name} rejected.`);
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
          <button className={`btn btn-sm ${view === 'dealers' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setView('dealers')}>
            Dealer Requests{pendingDealers.length > 0 &&
              <span className="badge bg-danger ms-1">{pendingDealers.length}</span>}
          </button>
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

        {view === 'dealers' && (
          <div>
            {pendingDealers.length === 0 ? (
              <div className="alert alert-secondary">No pending dealer requests.</div>
            ) : (
              pendingDealers.map(dealer => (
                <div key={dealer._id} className="card mb-3 p-3 border-warning">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="mb-0 fw-bold">{dealer.shopName}</h6>
                      <small className="text-muted">Owner: {dealer.name}</small>
                    </div>
                    <span className="badge bg-warning text-dark">Pending</span>
                  </div>
                  <p className="text-muted small mb-1">📧 {dealer.email} &nbsp;|&nbsp; 📞 {dealer.phone}</p>
                  <p className="text-muted small mb-2">📍 {dealer.shopAddress}</p>
                  {dealer.shopImages?.length > 0 && (
                    <div className="d-flex gap-2 flex-wrap mb-3">
                      {dealer.shopImages.map((img, i) => (
                        <img key={i} src={img} alt="shop"
                          style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #dee2e6' }} />
                      ))}
                    </div>
                  )}
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-success"
                      onClick={() => handleApprove(dealer)}>✅ Approve</button>
                    <button className="btn btn-sm btn-danger"
                      onClick={() => handleReject(dealer)}>❌ Reject</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;