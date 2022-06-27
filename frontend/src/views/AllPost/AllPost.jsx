import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import HomePosts from "../../components/HomePosts/HomePosts";
import NavBar from "../../components/NavBar/NavBar";
import PostForm from "../../components/PostForm";

const AllPost = (props) => {
    const [user, setUser] = useState()



    useEffect(() => {
        axios.get(`http://localhost:8000/api/auth`, { withCredentials: true })
            .then(res => {
                setUser(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        user &&
        <div className="container">
            <div className="row">
                <NavBar />
            </div>
            <div className="container">
                <div>
                    <HomePosts />
                </div>
            </div>
        </div>
    )
}

export default AllPost