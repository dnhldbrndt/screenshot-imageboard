import React, {  useEffect,useState } from "react";
import "./Random.css";
import Header from '../Header/Header';

const Random = () => {
 
 const [data, setData] = React.useState([]);
 const [screenshots, setScreens] = React.useState([]);
  const [screenshot, setScreen] = React.useState([]);
 const [randomScreen, setRandomScreen] = React.useState(0);
 
 const url = "http://localhost:5000/";
 
 
 const get_data = async () => {
		const res = await fetch(url+"test", { method: "GET" });
		const retobj = await res.json();
		   
		setData(retobj);
		console.log("retobj: " + retobj);
		console.log("data: " + data);
		 
			
 }
 const get_screens = async () => {
		const res = await fetch(url+"image/fetchAllScreenshots", { method: "GET" });
		const retobj = await res.json();
		   
		const scr_data = await Array.from(retobj);
		setScreens(scr_data);
		console.log("retobj: " + retobj);
		console.log("screen data: " + scr_data);
		const size = scr_data.length;
 
		
	 if (size > 0) {
		 let rand = Math.floor(Math.random() * size);
 
		 console.log(scr_data[rand]);
		 setScreen(scr_data[rand]);
		 setRandomScreen(rand);
 
	 }
 }
	 
  useEffect(() => {
    get_data();
    get_screens();
 
	
  }, [ ]);




return (
    <div>
      <Header/>
		<div className="page-content">


					
					
		<div>
		<div>
		<div class=""> 
			<div><h1> {screenshot['title']}</h1></div>
			<div><h6> Film: {screenshot['film']}</h6></div>
			<div><img src={url + screenshot['imgsrc']} alt={screenshot['title']} /></div>
			<div style={{marginTop: "20px"}}><a href={"/screenshot/" + screenshot['id']}>View </a></div>
		</div>
		</div>
 
       <div className="reviews_panel">
		   
		</div> 
		</div>			
					
					
					
		
		</div>
	</div>
  )
}

export default Random;