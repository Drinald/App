import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from './Home'
import Register from './Register';
import Post from './Post';

function Header() {
    return (
        <Router >
            <nav className="navBar darkgrey whitegrey">
                <h3>Logo</h3>
                <ul className="box">
                    <li ><Link className="listStyle" to="/">Home</Link></li>
                    <li ><Link className="listStyle" to="/register">Rregjistrohu</Link></li>
                    <li ><Link className="listStyle" to="/post">Publiko</Link></li>
                </ul>
            </nav>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/post" component={Post} />
            </Switch>
        </Router >
    )
}

export default Header