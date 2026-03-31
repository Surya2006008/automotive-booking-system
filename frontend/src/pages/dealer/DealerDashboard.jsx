import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import Navbar from '../../components/Navbar';

const STATUSES = ['Pending', 'Approved', 'In Progress', 'Completed', 'Rejected'];
const statusColor = {
  Pending: 'warning', Approved: 'info',
  'In Progress': 'primary', Completed: 'success', Rejected: 'danger'
};

const DealerDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [msg, setMsg] = useState('');

  const fetchAppointments = async () => {
    const { data } = await axiosInstance.get('/appointments/dealer');
    setAppointments(data);
  };

  useEffect(() => { fetchAppointments(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axiosInstance.patch(`/appointments/${id}/status`, { status });
      setMsg(`Status updated to "${status}"`);
      fetchAppointments();
    } catch (err) {
      setMsg('Update failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h5 className="mb-3">Dealer Dashboard — All Bookings</h5>
        {msg && <div className="alert alert-success">{msg}</div>}
        {appointments.length === 0 ? (
          <p className="text-muted">No bookings yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Customer</th><th>Phone</th><th>Service</th>
                  <th>Vehicle</th><th>Date</th><th>Time</th><th>Status</th><th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(a => (
                  <tr key={a._id}>
                    <td>{a.customer?.name}</td>
                    <td>{a.customer?.phone || '—'}</td>
                    <td>{a.service}</td>
                    <td>{a.vehicle}</td>
                    <td>{a.date}</td>
                    <td>{a.time}</td>
                    <td><span className={`badge bg-${statusColor[a.status]}`}>{a.status}</span></td>
                    <td>
                      <select className="form-select form-select-sm" value={a.status}
                        onChange={e => handleStatusChange(a._id, e.target.value)}>
                        {STATUSES.map(s => <option key={s}>{s}</option>)}
                      </select>
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

export default DealerDashboard;
