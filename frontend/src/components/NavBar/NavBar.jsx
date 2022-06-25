import React from 'react'
import Logout from '../Logout/Logout'
import './NavBar.css'

const NavBar = () => {
  return (
    <div className='nav flex align-center'>
      <div className='flex align-center'>
        <h1>Supply Drop</h1>
        <input type="text" placeholder='Search' />
      </div>
      <div className='flex align-center'>
        <a className='no-border' href="/">Home</a>
        <a href="/allposts">All Posts</a>
        <a href="/create">Create a Post</a>
        <a href="/account">Account</a>
        <Logout />
      </div>
    </div>
  )
}

export default NavBar