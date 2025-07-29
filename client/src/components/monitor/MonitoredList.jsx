import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api';

export default function MonitoredList() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/monitored-destination/get/all');
        setDestinations(res.data);
      } catch (err) {
        console.error('Error fetching destinations:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>📍 Monitored Destinations</h2>
      <Link to="/monitored/create">➕ Add New Destination</Link>
      <ul>
        {destinations.map(dest => (
          <li key={dest._id}>
            <strong>{dest.location}</strong> - Risk: {dest.risk_level}
            <br />
            <Link to={`/monitored/view/${dest._id}`}>🔍 View</Link> |{" "}
            <Link to={`/monitored/edit/${dest._id}`}>✏️ Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
