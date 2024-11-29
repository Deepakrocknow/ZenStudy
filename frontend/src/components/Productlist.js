import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Productlist = () => {
    const [pro, setPro] = useState([]);

    useEffect(() => {
        getproduct();
    }, []);

    const getproduct = async () => {
        let res = await fetch('https://zenstudy-doak.onrender.com/products');
        res = await res.json();
        setPro(res);
        console.log(res);
    };

    const deleproduct = async (id) => {
        let res = await fetch(`https://zenstudy-doak.onrender.com/prod/${id}`, {
            method: 'delete',
        });
        res = await res.json();
        if (res) {
            getproduct();
        }
    };

    const searcHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let rest = await fetch(`https://zenstudy-doak.onrender.com/search/${key}`);
            rest = await rest.json();
            if (rest) {
                setPro(rest);
            }
            console.log(rest);
        } else {
            getproduct();
        }
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#f9f9f9',
            fontFamily: 'Arial, sans-serif',
        }}>
            <h3 style={{
                textAlign: 'center',
                marginBottom: '20px',
                fontSize: '24px',
                color: '#333',
            }}>Contact's List</h3>

            <input
                style={{
                    display: 'block',
                    margin: '0 auto 20px',
                    padding: '10px',
                    width: '300px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                }}
                type='text'
                placeholder='Search Contact'
                onChange={searcHandle}
            />

            <ul style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                justifyContent: 'space-around',
                listStyle: 'none',
                padding: '10px 0',
                backgroundColor: '#007bff',
                color: '#fff',
                borderRadius: '4px',
                fontWeight: 'bold',
                textAlign: 'center',
            }}>
                <li>S. No</li>
                <li>Name</li>
                <li>Mobile No</li>
                <li>Email</li>
                <li>Age</li>
                <li>Operation</li>
            </ul>

            {pro.length > 0 ? pro.map((e, item) => (
                <ul key={e._id} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    justifyContent: 'space-around',
                    listStyle: 'none',
                    padding: '10px 0',
                    borderBottom: '1px solid #ccc',
                    textAlign: 'center',
                }}>
                    <li>{item + 1}</li>
                    <li>{e.name}</li>
                    <li>{e.price}</li>
                    <li>{e.category}</li>
                    <li>{e.company}</li>
                    <li>
                        <button
                            onClick={() => deleproduct(e._id)}
                            style={{
                                marginRight: '10px',
                                padding: '5px 10px',
                                backgroundColor: '#ff4d4d',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >Delete</button>

                        <Link
                            to={'/update/' + e._id}
                            style={{
                                padding: '5px 10px',
                                backgroundColor: '#4CAF50',
                                color: '#fff',
                                textDecoration: 'none',
                                borderRadius: '4px',
                            }}
                        >Update</Link>
                    </li>
                </ul>
            )) : (
                <h1 style={{ textAlign: 'center', marginTop: '20px', color: '#999' }}>No results found</h1>
            )}
        </div>
    );
};

export default Productlist;
