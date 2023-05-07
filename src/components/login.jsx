import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        Navigate('/lounge');
    };
    return(
        <div className="container">
            <div className="info-container">
                <h1 className="info-title">join the lounge.</h1>
                <p className="info-text">Please enter your username and password to login.</p>
                <Link to="/account">
                <button className="ca-btn">Create an Account</button>
                </Link>
            </div>
            <div className="form-container">
            <form className="form-login">
                <input
                className="input-username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input
                className="input-password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-btn" type="submit" onClick={handleSubmit}>Login</button>
            </form>
            </div>
        </div>
    )
}

export default Login;