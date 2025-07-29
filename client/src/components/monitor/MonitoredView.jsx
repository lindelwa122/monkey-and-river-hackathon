import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api';

export default function MonitoredView() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await API.get(`/monitored-destination/get/${id}`);
        setDestination(res.data);
      } catch (err) {
        console.error('Error fetching destination:', err);
      }
    };
    fetchDestination();
  }, [id]);

  if (!destination) return <p>Loading...</p>;

  return (
    <div>
      <h2>🔍 Monitored Destination Details</h2>
      <p><strong>Location:</strong> {destination.location}</p>
      <p><strong>Risk Level:</strong> {destination.risk_level}</p>
      <p><strong>Checked:</strong> {destination.hasChecked ? 'Yes' : 'No'}</p>
    </div>
  );
}
