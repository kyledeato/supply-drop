import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

import Post from "../Post/Post";
import PostForm from "../PostForm";

const HomePosts = () => {
    const [posts, setPosts] = useState([]);
    const editRef = useRef(false);

    useEffect(() => {
        updatePosts();
    }, []);

    const updatePosts = () => {
        axios
            .get("http://localhost:8000/api/post/")
            .then((res) => {
                let data = res.data;

                data.forEach((element) => {
                    element.bigPost = false;
                    element.bigEdit = false;
                });
                setPosts(data);
                // console.table(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDelete = (postID) => {
        axios
            .delete(`http://localhost:8000/api/post/${postID}`, {
                withCredentials: true,
            })
            .then((res) => {
                updatePosts();
            })
            .catch((err) => console.log(err, "error deleting"));
    };

    const embiggenComponent = (postIndex, active, bigType) => {
        let tempPosts = [...posts];
        console.log("EMBIGGEN!", postIndex, tempPosts[postIndex]);

        if (bigType === "post") {
            tempPosts[postIndex].bigPost = active;
        } else {
            tempPosts[postIndex].bigEdit = active;
        }
        console.log("EMBIGGEN!", tempPosts);

        setPosts(tempPosts);
    };

    return (
        <div>
            {posts.map((post, index) => (
                <React.Fragment key={post._id}>
                    <div>
                        <div
                            onClick={() => {
                                console.log("\nparent");
                                embiggenComponent(index, true, "post");
                            }}
                        >
                            <div>
                                {post.image ? (
                                    <img
                                        src={
                                            "http://localhost:8000/img/" +
                                            post.image
                                        }
                                        alt={post.title}
                                    />
                                ) : (
                                    <span>no image</span>
                                )}
                            </div>
                            <div>
                                <div>
                                    <span>{post.title}</span> ::{" "}
                                    <span>{post.location}</span>
                                </div>
                                <div>{post.description}</div>
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={() => {
                                    // navigate(`/edit/post/${post._id}`)
                                    editRef.current = true;
                                    embiggenComponent(index, true, "edit");
                                }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    handleDelete(post._id);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    {post.bigEdit && (
                        <PostForm
                            embiggenForm={embiggenComponent}
                            index={index}
                            postID={post._id}
                        />
                    )}
                    {post.bigPost && (
                        <Post
                            {...post}
                            embiggenForm={embiggenComponent}
                            index={index}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default HomePosts;
