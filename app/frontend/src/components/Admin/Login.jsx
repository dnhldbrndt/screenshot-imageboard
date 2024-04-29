import React, { useState } from 'react';
import Header from '../Header/Header';
import "./Admin.css";
import "../assets/styles.css";



const Login = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open,setOpen] = useState(true)
  const url = "http://localhost:5000/";
  const login_url = url +"mod/login";

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
    if (res.status != null && json.message === "Authenticated.") {
        sessionStorage.setItem('username', json.userName);
		console.log("session: " + sessionStorage.getItem('username'));
        setOpen(false);        
    }
    else {
      console.log("The user could not be authenticated.")
    }
};

  if (!open) {
    window.location.href = "/";
  };
  

  return (
    <div>
      <Header/>
    <div>
      <div><div className="page-content">
          <form   onSubmit={login}>
              <div>
              <span className="input_field">Username </span>
              <input type="text"  name="username" placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)}/>
              </div>
              <div>
              <span className="input_field">Password </span>
              <input name="psw" type="password"  placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)}/>            
              </div>
              <div>
              <input className="action_button" type="submit" value="Login"/>
              <input className="action_button" type="button" value="Cancel" onClick={()=>setOpen(false)}/>
              </div>
              <a className="loginlink" href="/register">Register Now</a>
          </form></div>
      </div>
    </div>
    </div>
  );
};

export default Login;
