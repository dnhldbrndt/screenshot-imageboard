import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Screenshots.css";
import "../assets/styles.css";
import Header from '../Header/Header';


const PostComment = () => {
  
  const [screenshot, setScreenshot] = useState({});
  const [comment, setComment] = useState([]);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const url = "http://localhost:5000/";
  
  

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0,curr_url.indexOf("postcomment"));
  let params = useParams();
  let id = params.id;
  let screenpost_url = url + `image/fetchScreenshot/${id}`;
  let comment_url = url + `image/add_comment`;
  
  
  const postcomment = async ()=>{
 
    if(comment === "" || date === "" || name === "") {
      alert("All fields are mandatory")
      return;
    }

    let jsoninput = JSON.stringify({
      "name": name,
      "screenshotid": id,
      "comment": comment,
      "comment_date": date,
    });

    console.log(jsoninput);
    const res = await fetch(comment_url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: jsoninput,
  });

  const json = await res.json();
  
  window.location.href = window.location.origin+"/screenshot/"+id;
  
  }
  const get_screen = async () => {
    const res = await fetch(screenpost_url, {
      method: "GET"
    });
    const retobj = await res.json();
	setScreenshot(retobj[0]);
	console.log(screenshot['title']);
  }
  
   useEffect(() => {
    get_screen();
  },[]);

  
  return (
    <div>
      <Header/>
	  	<div className="page-content">
      <div className="form-margin" style={{margin:"5%"}}>
		<h1 style={{color:"#ebebeb"}}>{screenshot.title}</h1>
			  <hr style={{backgroundColor: "#404757", width:"250px"}}/>
			  <div style={{fontSize: "small" }}> Post a comment. </div>
      <div className="form-content">
	    <div className="form-title"> Comment: </div>
		<textarea id='comment' cols='50' rows='7' onChange={(e) => setComment(e.target.value)} style={{borderRadius:"1px"}}></textarea>
	  </div>
      <div className="form-content">
	    <div className="form-title"> Date: </div>
		<input type="date" onChange={(e) => setDate(e.target.value)}/>
      </div>


      <div className="form-content">
	    <div className="form-title"> Name: </div>
		<input type="text" onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
      <button className='postcomment' onClick={postcomment}>Post Comment</button>
      </div>
 
 
 
      </div>
	  </div>
    </div>
  )
}
export default PostComment
