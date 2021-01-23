import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Post = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('')

    const onChange = (e) => {
        e.preventDefault()
        switch (e.target.id) {
            case 'title':
                setTitle(e.target.value)
                break;
            case 'price':
                setPrice(e.target.value)
                break;
            case 'description':
                setDescription(e.target.value)
                break;
            default:
                return;
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            "title": title,
            "price": price,
            "description": description
        }
        console.log(newUser)
        axios.post('http://localhost:5000/api/items/add', newUser)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setTitle('');
        setPrice('');
        setDescription('');
    }
    return (
        <div class="postContainer">
            <form class="post" onSubmit={onSubmit}>
                <input
                    className="item-a"
                    id="title" type="text"
                    placeholder="Titulli"
                    value={title}
                    onChange={onChange}
                    required
                />
                <input
                    className="item-b"
                    id="price"
                    type="text"
                    placeholder="Cmimi"
                    value={price}
                    onChange={onChange}
                    required
                />
                <textarea
                    className="item-c"
                    id="description"
                    placeholder="Pershkrimi"
                    value={description}
                    onChange={onChange}
                    required
                />
                <input
                    className="item-d"
                    type="submit"
                    value="Publiko"
                />
            </form>
        </div>
    )
}

export default Post