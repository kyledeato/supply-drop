import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import './HomePosts.css'
import Post from "../Post/Post";
import PostForm from "../PostForm";
import editLogo from './edit.png';
import trashLogo from "./trash.png";
import locationLogo from "./location.png";

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
                    <div >
                        <div class="post-contain"
                            onClick={() => {
                                console.log("\nparent");
                                embiggenComponent(index, true, "post");
                            }}
                        >
                            <div>
                                <div >
                                    <div className="post-header">
                                        <h5 className="title">{post.title}</h5>
                                        <div >
                                          <img onClick={() => {
                                    // navigate(`/edit/post/${post._id}`)
                                    editRef.current = true;
                                    embiggenComponent(index, true, "edit");
                                }} src={editLogo} alt="" srcset="" className="edit-trash"/>
                                          <img src={trashLogo} alt="" srcset="" className="edit-trash" onClick={() => {
                                    handleDelete(post._id);
                                }}/>
                                    </div>
                                    </div>
                                    <div className="location-container">
                                      <img src={locationLogo} alt="" className="locationImage"/>
                                      <p className="location">{post.location}</p>
                                    </div>
                                </div>
                                <div className="description">{post.description}</div>
                            </div>
                            <div className="display-flex-center">
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
