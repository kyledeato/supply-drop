import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom'
import Logout from '../Logout/Logout'
import './NavBar.css'
const NavBar = () => {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/auth`, { withCredentials: true })
            .then(res => {
                setUser(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/user/logout", {}, { withCredentials: true })
            .then(res => {
                setUser(null)
                navigate('/')
            })
            .catch(err => console.log(err))
    }


  return (
    
    <div className='nav flex align-center'>
        <div className='flex align-center'>
            <h1>Supply Drop</h1>
            <input type="text" placeholder='Search' />
        </div>
        <div className='flex align-center'>
            <Link to="/" className='no-border' >Home</Link>
            <Link to="/allposts" >All Posts</Link>
            {user && <Link to={`/account/${user._id}`}>Account</Link>}
            {user ? 
                <div className="logged">
                    <button onClick={handleSubmit}>Logout</button>
                    <p>
                        Signed in as: {user.firstName} {user.lastName}
                    </p>
               </div>
            : <Link to="/login">Login</Link>}

            </div>
        </div>
    )
}

export default NavBar