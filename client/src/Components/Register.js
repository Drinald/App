import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Register() {

    //Registration data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    //Login data
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    //Registration: The onchange event storing each value in the state;
    const onChange = (e) => {
        e.preventDefault()
        switch (e.target.id) {
            case 'name':
                setName(e.target.value)
                break;
            case 'email':
                setEmail(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            case 'confirm':
                setConfirm(e.target.value)
                break;
            case 'loginEmail':
                setLoginEmail(e.target.value)
                break;
            case 'loginPassword':
                setLoginPassword(e.target.value)
                break;
            default:
                return;
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== confirm) alert('Make sure the passwords match');
        const newUser = {
            "name": name,
            "email": email,
            "password": password
        }

        axios.post('http://localhost:5000/api/user', newUser)
            .then(res => console.log(res))
            .catch(err => console.log(`Error: ${err}`))
        setName('');
        setEmail('');
        setPassword('');
        setConfirm('');
        document.getElementById('checkbox').checked = false;
    }

    // Login: Checking whether the user exists or not so that we can login
    const login = (e) => {
        e.preventDefault()

        const loginUser = {
            "email": loginEmail,
            "password": loginPassword
        }


        axios.post('http://localhost:5000/api/user/login', loginUser)
            .then(user => {
                console.log(user.data.token)
            })
            .catch(err => console.log(`Error: ${err}`))
    }


    return (
        <div>
            <form id="register" className="form" onSubmit={onSubmit}>
                <input
                    id="name"
                    type="text"
                    placeholder="Perdoruesi"
                    value={name}
                    onChange={onChange}
                    required
                />
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={onChange}
                    required
                />
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChange}
                    required
                />
                <input
                    id="confirm"
                    type="password"
                    placeholder="Konfirmo password"
                    value={confirm}
                    onChange={onChange}
                    required
                />
                <label>
                    <input
                        id="checkbox"
                        type="checkbox"
                        required
                    />I lexova dhe i pranoj te gjitha <a href="#">Rregullat dhe Kushtet</a></label>
                <input
                    className="btn btn-primary"
                    type="submit"
                    value="Rregjistrohu"
                />
            </form>
            <form id="login" onSubmit={login}>
                <input
                    type="email"
                    id="loginEmail"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={onChange}
                    required
                />
                <input
                    type="password"
                    id="loginPassword"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={onChange}
                    required
                />
                <input
                    className="btn btn-danger"
                    type="submit"
                    value="Log In"
                />
            </form>
        </div>
    )
}

export default Register