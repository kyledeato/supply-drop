import React from 'react'
import CreateAPost from '../../components/CreateAPost/CreateAPost'
import HomePosts from '../../components/HomePosts/HomePosts'
import NavBar from '../../components/NavBar/NavBar'

const Home = () => {
  return (
    <div>
        <NavBar/>
        <h1>HOMEPAGE</h1>
        <CreateAPost/>
        <HomePosts/>
    </div>
  )
}

export default Home