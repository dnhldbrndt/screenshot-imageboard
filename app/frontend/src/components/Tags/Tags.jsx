import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import "./Tags.css";
import "../assets/styles.css";


  
const Home = () => {  

 const [tags, setTags] = React.useState([]);
 const url = "http://localhost:5000/";


 const get_tags = async () => {
	const res = await fetch(url+"image/fetchAllTags", { method: "GET" });
	const retobj = await res.json();
	
	setTags(retobj);
	console.log("retobj: " + retobj); 	
 }
	 
  useEffect(() => {
    get_tags();
  }, [ ]);


  return (
    <div>
      <Header/>
     <div className="page-content">	<div><h4> Tags Page </h4></div>
	 <div className="tags-layout"> {
		 tags.map ( (tag, index) => ( 
		 <div className="tag-button" key={index}><a href={'/tags/'+tags[index]}> {tag} </a></div> 
		 ))} </div>
	 </div>
    </div>
  )
}

export default Home;
