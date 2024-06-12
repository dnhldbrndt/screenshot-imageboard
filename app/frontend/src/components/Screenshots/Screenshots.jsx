import React, { useState, useEffect } from 'react';
import "./Screenshots.css";
import "../assets/styles.css";
import Header from '../Header/Header';

const Screenshots = () => {
  const [screenshots, setScreens] = useState([]);
  const [sortIDChange, setIDChange] = useState(0);
  const [sortTitleChange, setTitleChange] = useState(0);
  const [sortFilmChange, setFilmChange] = useState(0);
  const url = "http://localhost:5000/";

  const get_screens = async () => {
    const res = await fetch(url + "image/fetchAllScreenshots", { method: "GET" });
    const retobj = await res.json();
    const scr_data = Array.from(retobj);
    setScreens(scr_data);
  };

  useEffect(() => {
    get_screens();
  }, []);

  const sort_screens = () => {
    const sorted = Array.from(screenshots);
    if (sortIDChange === 0) {
      sorted.sort((a, b) => b.id - a.id);
      setIDChange(1);
    } else {
      sorted.sort((a, b) => a.id - b.id);
      setIDChange(0);
    }
    setScreens(sorted);
  };

  const sort_screens_film = () => {
    const sorted = Array.from(screenshots);
    if (sortFilmChange === 0) {
      sorted.sort((a, b) => a.film.localeCompare(b.film));
      setFilmChange(1);
    } else {
      sorted.sort((a, b) => b.film.localeCompare(a.film));
      setFilmChange(0);
    }
    setScreens(sorted);
  };

  const sort_screens_title = () => {
    const sorted = Array.from(screenshots);
    if (sortTitleChange === 0) {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      setTitleChange(1);
    } else {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      setTitleChange(0);
    }
    setScreens(sorted);
  };

  const deletepost = async (id) => {
    const delurl = `${url}mod/auth/${id}`;
    try {
      const token = sessionStorage.getItem("authToken");
      const res = await fetch(delurl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        throw new Error(`Failed to delete: ${res.status}`);
      }
      setScreens(screenshots.filter((screen) => screen.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const isLoggedIn = sessionStorage.getItem("username") !== null;

  return (
    <div>
      <Header />
      <div className="page-content">
        Screenshots here...
        {sessionStorage.getItem("username")}
        <table>
          <thead>
            <tr>
              <th onClick={sort_screens_title} className="click-th">Title</th>
              <th onClick={sort_screens_film} className="click-th">Film</th>
              <th onClick={sort_screens} className="click-th">IMG</th>
            </tr>
          </thead>
          <tbody>
            {screenshots.length === 0 ? null :
              screenshots.map((screen, index) => (
                <tr key={index}>
                  <td><a href={'/screenshot/' + screen.id}>{screen.title}</a></td>
                  <td>{screen.film}</td>
                  <td><img src={url + screen.imgsrc} alt={screen.title} /></td>
                  {isLoggedIn && (
                    <td>
                      <a onClick={() => deletepost(screen.id)} style={{ cursor: 'pointer', color: 'blue' }}>DEL</a> |
                      <a href={'/edit/' + screen.id} style={{ cursor: 'pointer', color: 'blue' }}>EDT</a>
                    </td>
                  )}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Screenshots;