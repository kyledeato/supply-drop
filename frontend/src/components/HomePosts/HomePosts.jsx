import axios from "axios";
import React, { useEffect, useState } from "react";

const HomePosts = () => {
  const [posts, setPosts] = useState([]);
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
        </div>
      ))}
    </div>
  );
};

export default HomePosts;
