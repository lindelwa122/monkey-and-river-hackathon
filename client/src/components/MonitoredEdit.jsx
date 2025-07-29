import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';

export default function MonitoredEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({ location: '', risk_level: 'low', hasChecked: false });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await API.get(`/monitored-destination/get/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error('Error fetching destination:', err);
      }
    };
    fetchDestination();
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.put(`/monitored-destination/update/${id}`, form);
      navigate('/monitored');
    } catch (err) {
      console.error('Error updating destination:', err);
    }
  };

  return (
    <div>
      <h2>✏️ Edit Destination</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Location:
          <input name="location" value={form.location} onChange={handleChange} />
        </label>
        <br />
        <label>
          Risk Level:
          <select name="risk_level" value={form.risk_level} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <br />
        <label>
          Has Checked:
          <input
            name="hasChecked"
            type="checkbox"
            checked={form.hasChecked}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
