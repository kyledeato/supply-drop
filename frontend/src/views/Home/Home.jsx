import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { Link } from 'react-router-dom';
import PostForm from '../../components/PostForm';
import HomePosts from '../../components/HomePosts/HomePosts';
import NavBar from '../../components/NavBar/NavBar';
import logo from './logo.webp';


const Home = () => {
    const [user, setUser] = useState();
    const [bigForm, setBigForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/auth`, { withCredentials: true })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <NavBar />

            {user && (
                <div className="create-contain">
                    <div className="create">
                        <img
                            src={logo}
                            alt=""
                            srcset=""
                            className="supply-drop"
                        />
                        <a
                            className="create-box"
                            href="#newpost"
                            onClick={(e) => {
                                e.preventDefault();
                                setBigForm(true);
                            }}
                        >
                            What can you offer/request?
                        </a>
                    </div>
                </div>
            )}

            {bigForm && (
                <PostForm
                    embiggenForm={(index, active) => {
                        setBigForm(active);
                    }}
                    userID={user._id}
                />
            )}

            <div className="display-flex-center">
                <HomePosts />
            </div>
            
        </div>
    );
};

export default Home;
