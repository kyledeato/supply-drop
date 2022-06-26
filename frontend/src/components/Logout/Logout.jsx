import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/user/logout", {}, {withCredentials: true})
            .then(res => {
                console.log(res)
                navigate('/')
                console.log("you are logged out")
            })
            .catch(err => console.log(err))
    }

    return (
        <button onClick={handleSubmit}>Logout</button>
    )
}

export default Logout