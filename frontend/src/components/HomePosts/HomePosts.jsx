import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import './HomePosts.css';
import Post from '../Post/Post';
import PostForm from '../PostForm';
import editLogo from './edit.png';
import trashLogo from './trash.png';
import locationLogo from './location.png';
import { useNavigate } from 'react-router-dom';


const HomePosts = (props) => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const id = props.id;

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/auth`, { withCredentials: true })
            .then((res) => {
                setUser(res.data);
                updatePosts();
            })
            .catch((err) => {
                console.log(err);
                updatePosts();
            });
    }, []);

    const updatePosts = () => {
        axios
            .get('http://localhost:8000/api/post/')
            .then((res) => {
                let data = res.data;

                data.forEach((element) => {
                    element.bigPost = false;
                    element.bigEdit = false;
                });

                if (id) {
                    data = data.filter(function (props) {
                        return props.postedBy === id
                    })
                }

                setPosts(data);
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
            .catch((err) => console.log(err, 'error deleting'));
    };

    const embiggenComponent = (postIndex, active, bigType) => {
        let tempPosts = [...posts];
        console.log('EMBIGGEN!', postIndex, tempPosts[postIndex]);

        if (bigType === 'post') {
            tempPosts[postIndex].bigPost = active;
        } else {
            tempPosts[postIndex].bigEdit = active;
        }
        console.log('EMBIGGEN!', tempPosts);

        setPosts(tempPosts);
    };

    return (
        <div>
            {
                <div>
                    {posts.map((post, index) => (
                        <React.Fragment key={post._id}>
                            <div className='post-contain'>
                            <div
                                
                                onClick={() => {
                                    console.log('\nparent');
                                    embiggenComponent(index, true, 'post');
                                }}
                            >
                                <div className='post-header'>
                                    <h5 className="title">{post.title}</h5>
                                    <div className="location-container">
                                        <img
                                            src={locationLogo}
                                            alt=""
                                            srcSet=""
                                            className="locationImage"
                                        />
                                        <p className="location">
                                            {post.location}
                                        </p>
                                    </div>
                                <div className="description">
                                    {post.description}
                                </div>
                                </div>

                            </div>
                            
                            <div className="display-flex-center">
                                {post.image ? (
                                    <img
                                        src={
                                            'http://localhost:8000/img/' +
                                            post.image
                                        }
                                        alt={post.title}
                                    />
                                ) : (
                                    <span>no image</span>
                                )}
                            </div>
                            {post.postedBy === user._id && (
                                <div className="edit-delete-container">
                                  
                                    <img
                                        src={editLogo}
                                        alt=""
                                        srcset=""
                                        className="edit-trash"
                                        onClick={() => {
                                            embiggenComponent(
                                                index,
                                                true,
                                                'edit'
                                            );
                                        }}
                                    />
                                    <img
                                        src={trashLogo}
                                        alt=""
                                        srcset=""
                                        onClick={() => {
                                            handleDelete(post._id);
                                        }}
                                        className="edit-trash"
                                    />
                                </div>
                            )}
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
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            }
        </div>
    );
};

export default HomePosts;
