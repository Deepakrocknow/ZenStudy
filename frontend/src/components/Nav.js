import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover effect
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  };

  // Inline styles for the navigation bar and logout button
  const navStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: '10px 20px',
    color: '#fff',
  };

  const imgStyles = {
    height: '50px',
    borderRadius: '5px',
  };

  const ulStyles = {
    listStyle: 'none',
    display: 'flex',
    gap: '15px',
    margin: '0',
    padding: '0',
  };

  const linkStyles = {
    color: '#fff',
    textDecoration: 'none',
  };

  // Dynamic styles for the logout link when hovered
  const logoutLinkStyles = {
    ...linkStyles,
    padding: '5px',
    color: isHovered ? 'red' : '#fff', // Change color to red on hover
  };

  return (
    <div style={navStyles}>
      <img
        style={imgStyles}
        src="https://t4.ftcdn.net/jpg/04/83/17/69/360_F_483176984_NkRE4YCDBZQnMrOpm7ROQvLgxX6NBG8h.jpg"
        alt="logo"
      />
      {auth ? (
        <ul style={ulStyles}>
          <li>
            <Link style={linkStyles} to="/">
            Contacts
            </Link>
          </li>
          <li>
            <Link style={linkStyles} to="/add">
              Add Contact
            </Link>
          </li>
          <li>
            <Link style={linkStyles} to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link
              style={logoutLinkStyles}
              onClick={logout}
              to="/signup"
              onMouseEnter={() => setIsHovered(true)} // Set hover state to true
              onMouseLeave={() => setIsHovered(false)} // Set hover state to false
            >
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul style={ulStyles}>
          <li>
            <Link style={linkStyles} to="/signup">
              Signup
            </Link>
          </li>
          <li>
            <Link style={linkStyles} to="/login">
              Login
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
