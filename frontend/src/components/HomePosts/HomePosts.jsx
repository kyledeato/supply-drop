import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Homepost.css'
import locationLogo from './location.png'
import editLogo from './edit.png'
import trashLogo from './trash.png'

const HomePosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/post/")
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleDelete = (postID) => {
    axios.delete(`http://localhost:8000/api/post/${postID}`, {withCredentials:true})
      .then((res) => {
        console.log(res.data, "Delete Successful");
      })
      .catch((err) => console.log(err, "error deleting"))
  }
  return (
    <div >
      {posts.map((post) => (
        <div key={post._id} className="post-container">
          <div className="post-header">
            <div>
              <h5 className="title">{post.title}</h5>  
              <div className="location-container"> 
                <img src={locationLogo} alt="" srcset="" className="locationImage"/>
                <p className="location">
                {post.location}</p>
              </div>
            </div>
              
            <div className="description">{post.description}</div>
          </div>
          <div className="display-flex-center">
            {post.image ? (
              <img className="image"
                src={"http://localhost:8000/img/" + post.image}
                alt={post.title}
              />
            ) : (
              <span>no image</span>
            )}
          </div>
          <div className="edit-delete-container"> 
            <img src={editLogo} alt="" srcset="" className="edit-trash" onClick={() => navigate(`/edit/post/${post._id}`)}/>
            <img src={trashLogo} alt="" srcset="" onClick={handleDelete} className="edit-trash"/>
            {/* <button onClick={() => navigate(`/edit/post/${post._id}`)}>Edit</button> */}
            {/* <button onClick={handleDelete}>Delete</button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePosts;
