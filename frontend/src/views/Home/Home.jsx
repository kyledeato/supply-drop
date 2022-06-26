import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import PostForm from '../../components/PostForm'
import HomePosts from '../../components/HomePosts/HomePosts'
import NavBar from '../../components/NavBar/NavBar'

const Home = () => {
    const [user, setUser] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/auth`, { withCredentials: true })
            .then(res => {
                setUser(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <NavBar/>
            <h1>HOMEPAGE</h1>
            { user && <PostForm userID={user._id}/> }
            <HomePosts />
        </div>
    )
}

export default Home