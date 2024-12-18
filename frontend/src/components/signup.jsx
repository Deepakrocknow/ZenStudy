import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  });

  const collectData = async () => {
    console.log(name, email, pass);
    let result = await fetch('https://zenstudy-doak.onrender.com/register', {
      method: 'post',
      body: JSON.stringify({ name, email, pass }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result.res));
    if (result) {
      navigate('/');
    }
  };

  const formStyle = {
    marginLeft: "35%",
    marginTop: "5%",
    padding: "50px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "60%",
    maxWidth: "400px",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "15px",
    color: "#007bff"
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px"
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.3s ease"
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3"
  };

  return (
    <div style={formStyle}>
      <h1 style={headingStyle}>Register</h1>
      <input
        style={inputStyle}
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Enter Name'
      />
      <input
        style={inputStyle}
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter Email'
      />
      <input
        style={inputStyle}
        type='password'
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder='Enter Password'
      />
      <button
        style={buttonStyle}
        onClick={collectData}
        onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
      >
        Signup
      </button>
    </div>
  );
};

export default Signup;
