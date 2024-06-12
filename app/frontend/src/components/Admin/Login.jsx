import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import "./Admin.css";
import "../assets/styles.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const url = "http://localhost:5000/";
  const login_url = url + "mod/login";

  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
      setOpen(false);
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(login_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "username": userName,
        "password": password
      }),
    });

    const json = await res.json();
    console.log(json.message + res.status);
    if (res.status === 200 && json.message === "Authenticated.") {
      sessionStorage.setItem('username', userName);
      sessionStorage.setItem('authToken', json.token); // Store the token
      console.log("session: " + sessionStorage.getItem('username'));
      setIsLoggedIn(true);
      setOpen(false);        
    } else {
      console.log("The user could not be authenticated.");
    }
  };

  const logout = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setOpen(true);
  };

 

  return (
    <div>
      <Header />
      <div className="page-content">
        {isLoggedIn ? (
          <div>
            <h2>Welcome, {sessionStorage.getItem('username')}</h2>
            <button className="action_button" onClick={logout}>Logout</button>
          </div>
        ) : (
          <form onSubmit={login}>
            <div>
              <span className="input_field">Username </span>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="input_field"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <span className="input_field">Password </span>
              <input
                name="psw"
                type="password"
                placeholder="Password"
                className="input_field"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input className="action_button" type="submit" value="Login" />
              <input className="action_button" type="button" value="Cancel" onClick={() => setOpen(false)} />
            </div>
            <a className="loginlink" href="/register">Register Now</a>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;