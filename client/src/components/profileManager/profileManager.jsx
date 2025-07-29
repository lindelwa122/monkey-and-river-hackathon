import React, { useEffect, useState } from 'react';
import styles from './ProfileManager.module.css';

const ProfileManager = () => {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(profile)
      });
      const updated = await res.json();
      setProfile(updated);
      setEditing(false);
      alert('Profile updated!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Update failed.');
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className={styles.container}>
      <h2>User Profile</h2>
      {!editing ? (
        <div>
          <p><strong>First Name:</strong> {profile.first_name}</p>
          <p><strong>Last Name:</strong> {profile.last_name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Password:</strong> ******</p>
          <div className={styles.buttonGroup}>
            <button onClick={() => setEditing(true)} className={styles.button}>Edit Profile</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
          <div className={styles.field}>
            <label>First Name</label>
            <input
              name="first_name"
              value={profile.first_name}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
          </div>
          <div className={styles.field}>
            <label>Last Name</label>
            <input
              name="last_name"
              value={profile.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={profile.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.button}>Save</button>
            <button type="button" onClick={() => setEditing(false)} className={styles.button}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileManager;