import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./auth.css";

const Auth = () => {
  const [mode, setMode] = useState(true);

  return (
    <div className="auth">
        {mode && <Login setMode={setMode} />}
        {mode || <Register setMode={setMode} />}
    </div>
  );
};

const Login = ({setMode}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const handlePClick = () => {
    setMode(prev => !prev);
}

// Add functionality for wrong username and passwprd
const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3001/api/v1/users/login", {
        name: username,
        password
    })

    setCookies("token", response.data.token);
    window.localStorage.setItem("userId", response.data.user._id);
    navigate("/");
}
  
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username : </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p onClick={handlePClick}>Don't have an account? Register here</p>
    </div>
  );
};

const Register = ({setMode}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [_, setCookies] = useCookies(["token"]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:3001/api/v1/users/login", {
            name: username,
            password
        })
    
        setCookies("token", response.data.token);
        window.localStorage.setItem("userId", response.data.user._id);
        navigate("/");
    }

    const handlePClick = () => {
        setMode(prev => !prev);
    }

    return (
      <div className="register">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username : </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <p onClick={handlePClick}>Already have an account? Login here</p>
      </div>
    );
  };

export default Auth;
