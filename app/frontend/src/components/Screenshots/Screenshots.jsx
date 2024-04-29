import React, { useState, useEffect } from 'react';
import "./Screenshots.css";
import "../assets/styles.css";
import Header from '../Header/Header';
 
const Screenshots = () => {
  
 const [screenshots, setScreens] = React.useState([]);
 const url = "http://localhost:5000/";
 
 const [sortIDChange, setIDChange] = React.useState(0);
 const [sortTitleChange, setTitleChange] = React.useState(0);
 const [sortFilmChange, setFilmChange] = React.useState(0);
 
 
 const get_screens = async () => {
	const res = await fetch(url+"image/fetchAllScreenshots", { method: "GET" });
	const retobj = await res.json();
		   
	const scr_data = await Array.from(retobj);
	setScreens(scr_data);
	console.log("retobj: " + retobj);
	console.log("screen data: " + scr_data);	 	
 }
	 
  useEffect(() => {
    get_screens();
  }, [ ]);

 const sort_screens = async () => {
	  
	let sorted = await Array.from(screenshots);
	
	if (sortIDChange == 0) { 
		sorted.sort((a, b) => b.id - a.id); 
		setIDChange(1);
	} else { 
		sorted.sort((a, b) => a.id - b.id) 
		setIDChange(0);
	}
	setScreens(sorted);	
 }
 const sort_screens_film = async () => {
	  
	let sorted = await Array.from(screenshots);
	
	if (sortFilmChange == 0) { 
		sorted.sort((a, b) => a.film.localeCompare(b.film));
		setFilmChange(1);
	} else { 
		sorted.sort((a, b) => b.film.localeCompare(a.film));
		setFilmChange(0);
	}
	setScreens(sorted);
 }
 const sort_screens_title = async () => {
	  
	let sorted = await Array.from(screenshots);
	
	if (sortTitleChange == 0) { 
		sorted.sort((a, b) => a.title.localeCompare(b.title));
		setTitleChange(1);
	} else { 
		sorted.sort((a, b) => b.title.localeCompare(a.title));
		setTitleChange(0);
	}
	setScreens(sorted);
 }
  const deletepost = async (id) => {
	 console.log("hold it" + id); 
	 
	 window.location.href = "/screenshots";
  }
  
  
  let isLoggedIn = sessionStorage.getItem("username") != null ? true : false; 
  
return(
  <div>
      <Header/>
		<div className="page-content">
			Screenshots here...
			{ sessionStorage.getItem("username")}
			 <table>
			 <thead>
				  <tr>
				  <th onClick={sort_screens_title} className="click-th"> Title </th>
				  <th onClick={sort_screens_film} className="click-th">Film </th>
				  <th onClick={sort_screens} className="click-th">IMG</th>
				  </tr>
			  </thead>
			  <tbody>
			{
				!screenshots && !screenshots.length ? null : 
					screenshots.map( (screen, index) => ( 
						<tr key={index}>					
						 <td><a href={'/screenshot/'+screen['id']}>{screen['title']}</a></td>
						 <td>{screen['film']}</td> 
						 <td><img src={url + screen['imgsrc']} alt={screen['title']} /></td>
						 				  {isLoggedIn ? (
						<td><a onClick={ () => deletepost(screen['id'])}>DEL</a> | <a href={'/edit/'+screen['id']}> EDT </a></td>
											):<></>
											}
						</tr> )) 
						 
			}
			</tbody>
			</table>
		</div>
  </div>
)
}

export default Screenshots
