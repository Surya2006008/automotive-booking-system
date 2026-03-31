import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Navbar from '../../components/Navbar';

const statusColor = {
  Pending: 'warning', Approved: 'info',
  'In Progress': 'primary', Completed: 'success', Rejected: 'danger'
};

const CustomerDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [msg, setMsg] = useState('');

  const fetchAppointments = async () => {
    const { data } = await axiosInstance.get('/appointments/my');
    setAppointments(data);
  };

  useEffect(() => { fetchAppointments(); }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return;
    try {
      await axiosInstance.delete(`/appointments/${id}`);
      setMsg('Appointment cancelled.');
      fetchAppointments();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error cancelling');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>My Appointments</h5>
          <Link to="/customer/book" className="btn btn-dark btn-sm">+ Book Appointment</Link>
        </div>
        {msg && <div className="alert alert-info">{msg}</div>}
        {appointments.length === 0 ? (
          <div className="text-center mt-5">
            <p className="text-muted">No appointments yet.</p>
            <Link to="/customer/book" className="btn btn-dark">Book your first appointment</Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Dealer</th><th>Service</th><th>Vehicle</th>
                  <th>Date</th><th>Time</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(a => (
                  <tr key={a._id}>
                    <td>{a.dealer?.name}</td>
                    <td>{a.service}</td>
                    <td>{a.vehicle}</td>
                    <td>{a.date}</td>
                    <td>{a.time}</td>
                    <td><span className={`badge bg-${statusColor[a.status]}`}>{a.status}</span></td>
                    <td>
                      {a.status === 'Pending' && (
                        <>
                          <Link to={`/customer/edit/${a._id}`}
                            className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
                          <button className="btn btn-sm btn-outline-danger"
                            onClick={() => handleCancel(a._id)}>Cancel</button>
                        </>
                      )}
                    </td>
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

export default CustomerDashboard;
