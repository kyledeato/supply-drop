import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../Logout/Logout'
import './NavBar.css'
const NavBar = () => {
  return (
    <div className='header-container display-flex'>
      <div className='logo-container display-flex'>
        <h1>Supply Drop</h1>
        <input type="text" placeholder='Search' />
      </div>
      <div className='links-container display-flex'>
        <Link to="/" className='links'>Home</Link>
        <Link to="/allposts" className='links'>All Posts</Link>
        <Link to="/create" className='links'>Create a Post</Link>
        <Link to="/account" className='links'>Account</Link>
        <Logout />
      </div>
    </div>
  )
}

export default NavBar