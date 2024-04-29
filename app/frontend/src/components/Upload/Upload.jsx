import React, {  useEffect,useState } from "react";
import "./Upload.css";
import Header from '../Header/Header';
import axios from "axios";

const Random = () => {
 
 const [film, setFilm] = React.useState("");
 const [title, setTitle] = React.useState("");
 const [tags, setTags] = React.useState("");
 const [image, setImage] = React.useState("");
 const [file, setFile] = useState();
  
 const url = "http://localhost:5000/";
 const uploadurl = url + "image/upload";
 

 
	 
  useEffect(() => {
  
 
  }, [ ]);

const submitupload = async (event) => {
	
 
	const form = document.getElementById("uploadform");
	console.log(typeof(event.target.form.image.value));

	if(film === "" || file === "" || title === "") {
      alert("Missing fields. Cannot upload.")
      return;
    }

 	const formData = new FormData();
	formData.append("image", file);
	formData.append("title", title);
	formData.append("film", film);
	formData.append("tags", tags);
	
	const formData2 = new FormData(form);
	
	 for (const [key, value] of formData2) {
		console.log(`${key}: ${value}\n`);
	}
 
	const res = await fetch(uploadurl, {
      method: "POST",
      body: formData2
  });

	window.location.href = "/screenshots";
  
  }
  
  const testform = async () => {
	  
	let form = document.getElementById("uploadform");  
	let formData = new FormData(form);
 
	  	 for (let [key, value] of formData) {
		console.log(`${key}: ${value}\n`);
	}
  }


return (
    <div>
      <Header/>
		<div className="page-content">
		  <div className="m-2">
			Upload screnshot here...
		  </div>	
		  <div className="form-upload">
			<form    id="uploadform" encType="multipart/form-data"  >
			<input type="file" name="image" onChange={(e) => setFile(e.target.files[0])}/>
			<div>Title: </div><input type="text"  name="title" placeholder="Screenshot Title" onChange={(e) => setTitle(e.target.value)}/>
			<div>Film: </div><input type="text"  name="film" placeholder="Film Name" onChange={(e) => setFilm(e.target.value)}/>
			<div>Tags: </div><input type="text"  name="tags" placeholder="" onChange={(e) => setTags(e.target.value)}/>
			<button type="submit" className="m-2" onClick={submitupload}  target="_blank" >Upload</button>
			</form>
			</div> 
		</div>
	</div>
  )
}

export default Random;