import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Updatecom = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getdetail();
    }, []);

    const getdetail = async () => {
        let resp = await fetch(`https://zenstudy-doak.onrender.com/prod/${params.id}`);
        resp = await resp.json();
        setName(resp.name);
        setPrice(resp.price);
        setCompany(resp.company);
        setCategory(resp.category);
        console.log(resp);
    };

    const updatePro = async () => {
        let rest = await fetch(`https://zenstudy-doak.onrender.com/prod/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        rest = await rest.json();
        console.log(rest);
        navigate('/');
    };

    return (
        <div style={{
            maxWidth: '500px',
            margin: '50px auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        }}>
            <h1 style={{
                textAlign: 'center',
                marginBottom: '20px',
                color: '#333',
                fontSize: '24px',
            }}>Update Product</h1>
            <input
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px',
                    marginBottom: '15px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                }}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
            />
            <input
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px',
                    marginBottom: '15px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                }}
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Product Price"
            />
            <input
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px',
                    marginBottom: '15px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                }}
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Product Category"
            />
            <input
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px',
                    marginBottom: '15px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                }}
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Product Company"
            />
            <button
                onClick={updatePro}
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                }}
            >
                Update Product
            </button>
        </div>
    );
};

export default Updatecom;
