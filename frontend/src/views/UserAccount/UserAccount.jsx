import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HomePosts from '../../components/HomePosts/HomePosts';
import NavBar from '../../components/NavBar/NavBar';
import './UserAccount.css';
import settingsPhoto from './settingsIcon.png';
import ChatList from '../../components/Chat/ChatList';

const UserDetail = (props) => {
    const [user, setUser] = useState();
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/user/${id}`, user, {
                withCredentials: true,
            })
            .then((res) => {
                //console.log(res)
            })
            .catch((err) => console.log(err));
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/auth`, { withCredentials: true })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        user && (
            <div className="container">
                <div className="row">
                    <NavBar />
                </div>
                <div className="AccountHeader">
                    <h3>{user.firstName}'s Posts</h3>
                </div>
                <div className="PostContainer">
                    <div>
                        <div className="AllEdit">
                            <div className="EditText">
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: 'black',
                                    }}
                                    to={`/account/edit/${user._id}`}
                                >
                                    Edit Account
                                </Link>
                            </div>
                            <div className="EditButton">
                                <Link to={`/account/edit/${user._id}`}>
                                    <img
                                        src={settingsPhoto}
                                        alt="settings icon"
                                    />
                                </Link>
                            </div>
                        </div>
                        <HomePosts id={id} />
                        <ChatList userId={id} />
                    </div>
                </div>
            </div>
        )
    );
};

export default UserDetail;
