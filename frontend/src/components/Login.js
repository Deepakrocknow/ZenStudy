import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState('');
  const navigate = useNavigate();


  const handlelogin =async()=>{
    console.log(email,pass);
    let result = await fetch( 'http://localhost:4500/login',{
          method:'post',
          body:JSON.stringify({email,pass}),
          headers:{
              'Content-Type':'application/json'
          }
    });
    result = await result.json();
    console.log(result)
        localStorage.setItem('user',JSON.stringify(result.ans));
        navigate('/');
}


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
      <h1 style={headingStyle}>Login</h1>
      <input
        style={inputStyle}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        style={inputStyle}
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="Enter Password"
      />
      <button
        style={buttonStyle}
        onClick={handlelogin}
        onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
      >
        Log-in
      </button>
    </div>
  );
};

export default Login;
