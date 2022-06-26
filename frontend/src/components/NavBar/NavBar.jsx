import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import Logout from '../Logout/Logout'

const NavBar = () => {
    const [user, setUser] = useState()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/auth`, { withCredentials: true })
            .then(res => {
                setUser(res.data)
            })
            .catch(err => console.log(err))
    }, [])

  return (
    <div className='nav flex align-center'>
      <div className='flex align-center'>
        <h1>Supply Drop</h1>
        <input type="text" placeholder='Search' />
      </div>
      <div className='flex align-center'>
        <Link to="/" className='no-border' >Home</Link>
        <Link to="/allposts" >All Posts</Link>
        <Link to="/create" >Create a Post</Link>
              {user && <Link to={`/account/${user._id}`}>Account</Link>}
        <Logout />
      </div>
    </div>
  )
}

export default NavBar