import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api'; 

const SetupProfile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    bio: '',
    avatar: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the user's profile on the server
      await API.post('/users/profile', profile);  

      // Redirect to dashboard or monitored page
      navigate('/monitored');
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  return (
    <div className="setup-profile">
      <h2>Set Up Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Bio:</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Avatar URL:</label>
          <input
            type="text"
            name="avatar"
            value={profile.avatar}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default SetupProfile;
