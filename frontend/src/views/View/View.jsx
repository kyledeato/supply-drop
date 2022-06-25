import React, { useState } from 'react'
import axios from 'axios'

const View = () => {
  const [map, setMap] = useState('')
  const key = process.env.REACT_APP_SECRET_API_KEY
  // need to change based on user input
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=Kyiv,Ukraine&zoom=14&size=400x400&key=${key}`

  axios.get(url).then(response=> {
    console.log(response)
    setMap(response.data[0])
    .catch(err=>console.log(err))
  },[])

  return (
    <div>View when click the articles try to make it a pop up

      <img src={url} alt="" />
    </div>
  )
}

export default View