import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import "./Admin.css";
import "../assets/styles.css";



const Edit = () => {

  const [screenshot, setScreenshot] = useState({});
  const [comments, setComments] = useState([]);
  const [film, setFilm] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [nocomment, setNoComment] = useState(false);
  const [postComment, setPostComment] = useState(<></>)
  const url = "http://localhost:5000/";
  
  let curr_url = window.location.href;
  let root_url = curr_url.substring(0,curr_url.indexOf("screenshot"));
  let params = useParams();
  let id = params.id;
  let screenpost_url = url + `image/fetchScreenshot/${id}`;
  let comments_url = url + `image/fetchAllComments/screenshot/${id}`;
  let post_comment = root_url + `postcomment/${id}`;
  let editurl = url + `mod/auth/${id}`
  const get_screen = async () => {
    const res = await fetch(screenpost_url, {
      method: "GET"
    });
    const retobj = await res.json();
	setScreenshot(retobj[0]);
	console.log(screenshot['title']);
  }

  const get_comments = async () => {
    const res = await fetch(comments_url, {
      method: "GET"
    });
    const retobj = await res.json();
	
 
      if( retobj.length > 0 ){
        setComments(retobj)
      } else {
        setNoComment(true);
      }
     
  }

 const editpost =  async () => {
	 const form = document.getElementById("editform");
	 const formData = new FormData(form);
	 
	  
	const res = await fetch(editurl, {
      method: "PUT",
      body: formData
	});
	 
 }
  const deletepost = async (id) => {
	 console.log("hold it " + id); 
	 
	 window.location.href = "/screenshots";
  }
  


  useEffect(() => {
    get_screen();
    get_comments();
  },[]);  


  let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;


return(
  <div>      
	<Header/>
	<div className="page-content">
	  <div>
		<div>
			<h1> {screenshot['title']}</h1>
			<img src={url + screenshot['imgsrc']} alt={screenshot['title']} />
		</div>
		<div >
			<form id="editform">
			<div>Title: </div><input type="text"  name="title" placeholder={screenshot['title']} onChange={(e) => setTitle(e.target.value)}/>
			<div>Film: </div><input type="text"  name="film" placeholder={screenshot['film']} onChange={(e) => setFilm(e.target.value)}/>
			<div>Tags: </div><input type="text"  name="tags" placeholder={screenshot['tags']} onChange={(e) => setTags(e.target.value)}/>
			<button type="submit" className="m-2" onClick={editpost}  >Edit</button>
			</form>
		
		</div>
				  		{isLoggedIn ? (
						<div><a onClick={() => deletepost(screenshot['id'])}>DELETE Post</a></div>
				   ):<></>
				 }
		 
       <div className="reviews_panel">
		  {comments.length === 0 && nocomment === false ? (
			<p>Loading Comments....</p>
		  ):  nocomment === true? <div>No comments yet! </div> :
		  comments.map((comment, index) => (
		  
			<div className='review_panel' key={index}>
				<div className="d-flex mt-2 ms-2">
				  <div className='reviwer me-2'>{comment.name} </div>			  
				  <div className='review-date'>[{comment.comment_date}]</div>
				</div>
				<div className="review m-2">{comment.comment}
				</div>
			</div>
			
		  ))}

		</div> 
		</div>
	</div>
  </div>
)
}

export default Edit;
