import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import "./Admin.css";
import "../assets/styles.css";

const Edit = () => {
  const [screenshot, setScreenshot] = useState({});
  const [comments, setComments] = useState([]);
  const [film, setFilm] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [nocomment, setNoComment] = useState(false);
  const [postComment, setPostComment] = useState(<></>);
  const url = "http://localhost:5000/";

  const params = useParams();
  const id = params.id;
  const screenpost_url = `${url}image/fetchScreenshot/${id}`;
  const comments_url = `${url}image/fetchAllComments/screenshot/${id}`;
  const editurl = `${url}mod/auth/${id}`;
  const delurl = `${url}mod/auth/${id}`;

  const get_screen = async () => {
    const res = await fetch(screenpost_url, { method: "GET" });
    const retobj = await res.json();
    setScreenshot(retobj[0]);
  };

  const get_comments = async () => {
    const res = await fetch(comments_url, { method: "GET" });
    const retobj = await res.json();
    if (retobj.length > 0) {
      setComments(retobj);
    } else {
      setNoComment(true);
    }
  };

  const editpost = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("authToken");

    const formData = {
      title: title || screenshot.title,
      film: film || screenshot.film,
      tags: tags || screenshot.tags
    };

    await fetch(editurl, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle response or any additional logic here
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const deletepost = async () => {
    await fetch(delurl, {
      method: "DELETE",
    });
    window.location.href = "/screenshots";
  };

  useEffect(() => {
    get_screen();
    get_comments();
  }, []); // Empty dependency array to run only on mount

  const isLoggedIn = sessionStorage.getItem("username") !== null;

  return (
    <div>
      <Header />
      <div className="page-content">
        <div>
          <div>
            <h1>{screenshot.title}</h1>
            <img src={url + screenshot.imgsrc} alt={screenshot.title} />
          </div>
          {isLoggedIn && (
            <div>
              <form id="editform">
                <div>Title: </div>
                <input
                  type="text"
                  name="title"
                  placeholder={screenshot.title}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div>Film: </div>
                <input
                  type="text"
                  name="film"
                  placeholder={screenshot.film}
                  value={film}
                  onChange={(e) => setFilm(e.target.value)}
                />
                <div>Tags: </div>
                <input
                  type="text"
                  name="tags"
                  placeholder={screenshot.tags}
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <button type="submit" className="m-2" onClick={editpost}>
                  Edit
                </button>
              </form>
              <div>
                <a onClick={deletepost} style={{ cursor: 'pointer', color: 'blue' }}>DELETE Post</a>
              </div>
            </div>
          )}
          <div className="reviews_panel">
            {comments.length === 0 && !nocomment ? (
              <p>Loading Comments....</p>
            ) : nocomment ? (
              <div>No comments yet!</div>
            ) : (
              comments.map((comment, index) => (
                <div className="review_panel" key={index}>
                  <div className="d-flex mt-2 ms-2">
                    <div className="reviewer me-2">{comment.name}</div>
                    <div className="review-date">[{comment.comment_date}]</div>
                  </div>
                  <div className="review m-2">{comment.comment}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;