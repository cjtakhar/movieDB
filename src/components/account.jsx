import { useState } from 'react';
const Account = () => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return(
        <div className="container">
            <div className="account-container">
            <form className="form-account">
            <h1 className="account-title">Create Account</h1>
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
                <button className="login-btn" type="submit" onClick={handleSubmit}>Join</button>
            </form>
            </div>
        </div>
    )
}

export default Account;