import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("testuser");
    const [password, setPassword] = useState("123456");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validUsername = "testuser"
            const validpassword = "123456"

            if (username === validUsername && password === validpassword) {

                localStorage.setItem('username', username)
                localStorage.setItem('password', password)

                navigate("/grammar-check");
            }
        }
        catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};
export default Login;