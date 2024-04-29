import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import "./Tags.css";
import "../assets/styles.css";



const Home = () => {  

 const [screenshots, setScreens] = React.useState([]);
 const url = "http://localhost:5000/";
 let params = useParams();
 let id = params.id;
 let tags_url  = url + `image/fetchScreenshots/tag/${id}`;


 const [sortIDChange, setIDChange] = React.useState(0);
 const [sortTitleChange, setTitleChange] = React.useState(0);
 const [sortFilmChange, setFilmChange] = React.useState(0);

 const get_screens = async () => {
	const res = await fetch(tags_url, { method: "GET" });
	const retobj = await res.json();
	
	setScreens(retobj);
	console.log("retobj: " + retobj); 	
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


  return (
  <div>
      <Header/>
		<div className="page-content">
			Screenshots here...
 
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
						</tr> )) 
						 
			}
			</tbody>
			</table>
		</div>
  </div>
  );
};

export default Home;
