import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Navbar from '../../components/Navbar';

const SERVICES = ['Oil Change', 'Tyre Rotation', 'Brake Inspection', 'Engine Tune-up', 'AC Service', 'Full Service'];
const TIMES = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

const EditAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ service: '', vehicle: '', date: '', time: '', notes: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    axiosInstance.get('/appointments/my').then(({ data }) => {
      const appt = data.find(a => a._id === id);
      if (appt) setForm({
        service: appt.service, vehicle: appt.vehicle,
        date: appt.date, time: appt.time, notes: appt.notes || ''
      });
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/appointments/${id}`, form);
      navigate('/customer/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4" style={{ maxWidth: '540px' }}>
        <h5 className="mb-3">Edit Appointment</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Service</label>
            <select className="form-select" value={form.service}
              onChange={e => setForm({ ...form, service: e.target.value })} required>
              {SERVICES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Vehicle</label>
            <input className="form-control" value={form.vehicle}
              onChange={e => setForm({ ...form, vehicle: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Time</label>
            <select className="form-select" value={form.time}
              onChange={e => setForm({ ...form, time: e.target.value })} required>
              {TIMES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Notes</label>
            <textarea className="form-control" rows={2} value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-dark w-100">Update Appointment</button>
        </form>
      </div>
    </>
  );
};

export default EditAppointment;
