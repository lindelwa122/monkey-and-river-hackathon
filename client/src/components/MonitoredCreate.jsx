import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function MonitoredCreate() {
  const [form, setForm] = useState({ location: '', risk_level: 'low', hasChecked: false });
  const navigate = useNavigate();

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
      await API.post('/monitored-destination/create', form);
      navigate('/monitored');
    } catch (err) {
      console.error('Error creating destination:', err);
    }
  };

  return (
    <div>
      <h2>➕ Create Monitored Destination</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Location:
          <input name="location" value={form.location} onChange={handleChange} required />
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
