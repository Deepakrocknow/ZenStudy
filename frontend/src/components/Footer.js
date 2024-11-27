import React from 'react';

const Footer = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#333',
      color: '#fff',
      padding: '10px 0',
      position: 'fixed',
      bottom: '0',
      width: '100%',
    }}>
      <h3 style={{
        margin: '0',
        fontSize: '16px',
      }}>© 2024 Zenstudy Pvt Ltd. All rights reserved.</h3>
    </div>
  );
};

export default Footer;
