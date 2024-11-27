import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Addproduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const navigate = useNavigate();

    const [err, setErr] = useState(false);

    const addpro = async () => {
        if (!name || !price || !category || !company) {
            setErr(true);
            return false;
        }
        console.log(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        let res = await fetch('http://localhost:4500/addpro', {
            method: 'post',
            body: JSON.stringify({ name, price, category, userId, company }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        res = await res.json();
        console.log(res);
        navigate('/');
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            height: '60vh',
        }}>
            <h1 style={{
                marginBottom: '20px',
                fontSize: '24px',
                color: '#333',
            }}>Add Contact</h1>

            <input
                style={{
                    marginBottom: '10px',
                    padding: '10px',
                    width: '300px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                }}
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Contact Name'
            />
            {err && !name && <span style={{ color: 'red', marginBottom: '10px' }}>*** Enter valid name</span>}

            <input
                style={{
                    marginBottom: '10px',
                    padding: '10px',
                    width: '300px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                }}
                type='text'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder='Contact Mobile No'
            />
            {err && !price && <span style={{ color: 'red', marginBottom: '10px' }}>*** Enter valid price</span>}

            <input
                style={{
                    marginBottom: '10px',
                    padding: '10px',
                    width: '300px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                }}
                type='text'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder='Contact Email'
            />
            {err && !category && <span style={{ color: 'red', marginBottom: '10px' }}>*** Enter valid category</span>}

            <input
                style={{
                    marginBottom: '10px',
                    padding: '10px',
                    width: '300px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                }}
                type='text'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder='Contact Age'
            />
            {err && !company && <span style={{ color: 'red', marginBottom: '10px' }}>*** Enter valid company</span>}

            <button
                onClick={addpro}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}>
                Add Contact
            </button>
        </div>
    );
};

export default Addproduct;