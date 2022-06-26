import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";

const UserDetail = (props) => {
    const [user, setUser] = useState()
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${id}`, user, { withCredentials: true })
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    })

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
                <div className="col-md-4 ms-auto">
                    <Link to={`/account/edit/${user._id}`}>Edit Account</Link>
                </div>
                <div className="row">
                    <h1>{user.firstName} {user.lastName}</h1>
                </div>
            </div>
        </div>
        )
}

export default UserDetail;