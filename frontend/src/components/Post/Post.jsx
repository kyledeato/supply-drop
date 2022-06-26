import React, { useState, useEffect } from "react";
import axios from "axios";
import "./post.css";

function Post({
    postType,
    title,
    description,
    image,
    location,
    postedBy,
    _id,
    embiggenForm: embiggenPost,
    index,
}) {
    return (
        <div className="post-container">
            <div className="post">
                <div>
                    <span>{title}</span> :: <span>{location}</span>{" "}
                    <button
                        onClick={() => {
                            embiggenPost(index, false, "post");
                        }}
                    >
                        [X]
                    </button>
                </div>
                <div>
                    <div>
                        {image ? (
                            <img
                                src={"http://localhost:8000/img/" + image}
                                alt={title}
                            />
                        ) : (
                            <span>no image</span>
                        )}
                    </div>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default Post;
