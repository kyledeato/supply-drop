import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <div>
            {post.image ? (
              <img
                src={"http://localhost:8000/img/" + post.image}
                alt={post.title}
              />
            ) : (
              <span>no image</span>
            )}
          </div>
          <div>
            <div>
              <span>{post.title}</span> :: <span>{post.location}</span>
            </div>
            <div>{post.description}</div>
          </div>
          <div> 
            <button onClick={() => navigate(`/edit/post/${post._id}`)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePosts;
