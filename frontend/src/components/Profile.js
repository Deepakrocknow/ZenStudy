import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('user'))._id;

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      const result = await fetch(`https://zenstudy-doak.onrender.com/user/${userId}`);
      const data = await result.json();
      if (data) {
        setUserDetails({
          name: data.name,
          email: data.email,
          password: '',  // We don't display the password
        });
      } else {
        navigate('/login');
      }
    };

    fetchUserDetails();
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { name, email, password } = userDetails;

    // Form validation to check if all fields are filled
    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;  // Prevent form submission if any field is empty
    }

    const response = await fetch(`https://zenstudy-doak.onrender.com/updateProfile/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();

    if (result.updatedUser) {
      alert('Profile updated successfully!');
      localStorage.setItem('user', JSON.stringify(result.updatedUser));  // Update localStorage with new data
    } else {
      alert('Error updating profile');
    }
  };

  return (
    <div style={formStyle}>
      <h1 style={headingStyle}>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="text"
          name="name"
          value={userDetails.name}
          onChange={handleChange}
          placeholder="New Name"
        />
        <input
          style={inputStyle}
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
          placeholder="New Email"
        />
        <input
          style={inputStyle}
          type="password"
          name="password"
          value={userDetails.password}
          onChange={handleChange}
          placeholder="New Password"
        />
        <button type="submit" style={buttonStyle}>
          Update Profile [ && Refresh Page]
        </button>
      </form>
    </div>
  );
};

const formStyle = {
  marginLeft: '35%',
  marginTop: '5%',
  padding: '50px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '60%',
  maxWidth: '400px',
};

const headingStyle = {
  textAlign: 'center',
  marginBottom: '15px',
  color: '#007bff',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '14px',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '14px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

export default Profile;
