import React, { useState,useEffect } from 'react';
import "../assets/styles.css";
import aperture from "../assets/aperture.png";

const Header = () => {
    
	const [searchTerm, setSearchTerm] = useState(""); 
	
    return (
        <div >
			<nav className="navbar navbar-expand-lg bg-custom"><img src={aperture} alt=""/>
		  <a className="navbar-brand " href="/">Movie Screenshots</a>
		  <button className="navbar-toggler" type="button" data-toggle="collapse" 
		    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
			aria-expanded="false" aria-label="Toggle navigation"> ...
			
		  </button>

		  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav mr-auto">
			  <li className="nav-item active">
				<a className="nav-link" href="/random">Random </a>
			  </li>
			  <li className="nav-item">
				<a className="nav-link" href="/screenshots">All</a>
			  </li>
			  <li className="nav-item">
				<a className="nav-link" href="/tags">Tags</a>
			  </li>
			  	<li className="nav-item">
				<a className="nav-link" href="/upload">Upload</a>
			  </li>
			</ul>
			<form className="form-inline my-2 my-lg-0">
			  <input className="form-control mr-sm-2" 
			  type="search" id="search-form" placeholder="Search" aria-label="Search" 
				onChange={(e) => setSearchTerm(e.target.value)}/>
			  <a className="btn btn-primary my-2 my-sm-0" 
				id="btn-search" type="submit" href={'/search/'+searchTerm}>Search</a>
			</form>
		  </div>
		</nav>
			   
        </div>
    )
}

export default Header
