import React, { useEffect, useState } from 'react';
import reactDOM from 'react-dom';
import axios from 'axios';

function Publish(props) {
    const [item, setItem] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:5000/api/items'
        axios.get(url)
            .then(res => {
                setItem(JSON.parse(JSON.stringify(res.data)))
            })
            .catch(err => console.log(`Error: ${err}`))
    }, [])

    return (
        <div className="publish">
                {item.map(item =>
                    <div key={item._id}>
                        <span><h3>{item.title}</h3><p>Data: {item.date.slice(0, 10).replaceAll('-',' ')}</p></span>
                        <p>{item.description}</p>
                        <h5>{item.price} Euro</h5>
                    </div>
                )} 
        </div>
    );
}

export default Publish;