import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import "./Admin.css";
import "../assets/styles.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const url = "http://localhost:5000/";
  const reg_url = url + "mod/user/create";

  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
      setOpen(false);
    }
  }, []);

  const register = async (e) => {
    e.preventDefault();  // Prevent the default form submission

    const res = await fetch(reg_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "usernamesignup": userName,
        "passwordsignup": password
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

  return (
    <div>
      <Header />
      <div className="page-content">
        {isLoggedIn ? (
          <div>
            <h2>Welcome, {sessionStorage.getItem('username')}</h2>
          </div>
        ) : (
          <form onSubmit={register}>
            <div>
              <span className="input_field">Username </span>
              <input
                type="text"
                name="usernamesignup"
                placeholder="Username"
                className="input_field"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <span className="input_field">Password </span>
              <input
                name="passwordsignup"
                type="password"
                placeholder="Password"
                className="input_field"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input className="action_button" type="submit" value="Register" />
              <input className="action_button" type="button" value="Cancel" onClick={() => setOpen(false)} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;