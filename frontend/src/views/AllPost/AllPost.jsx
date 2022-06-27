import axios from "axios";
import React, { useEffect, useState } from 'react';
import HomePosts from "../../components/HomePosts/HomePosts";
import NavBar from "../../components/NavBar/NavBar";

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