import { useState } from 'react'
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const login = async () => {
        console.log(username)
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/token/",
                { username: username, password: password },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            const myData = response.data;
            localStorage.setItem('token', JSON.stringify(myData));
        } catch (error) {
            console.error("Error during authentication:", error);
        }
    }
    return (
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend">Login</legend>

            <label className="fieldset-label">Username</label>
            <input type="text" className="input" placeholder="Username" onChange={e => setUsername(e.target.value)} />

            <label className="fieldset-label">Password</label>
            <input type="password" className="input" placeholder="Password" onChange={e => setPassword(e.target.value)} />

            <button className="btn btn-neutral mt-4" onClick={login}>Login</button>
        </fieldset>
    )
} export default Login