import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../Logout/Logout'

const NavBar = () => {
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
        <Link to="/account" >Account</Link>
        <Logout />
      </div>
    </div>
  )
}

export default NavBar