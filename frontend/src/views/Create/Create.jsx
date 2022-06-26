import React, {useState}from 'react'

const Create = () => {

  const [image, setImage ] = useState("");
  const [ url, setUrl ] = useState("");

const uploadImage = () => {
  const data = new FormData()
  data.append("file", image)
  data.append("upload_preset", "vn9enveg")
  data.append("cloud_name","dzi3h2qea")
  fetch("https://api.cloudinary.com/v1_1/dzi3h2qea/image/upload",{
  method:"post",
  body: data
  })
  .then(resp => resp.json())
  .then(data => {
  setUrl(data.url)
  })
  .catch(err => console.log(err))
}
  return (
    <div>Create a post should be a pop up prop a component? idkkk
      <div>
      <input type="file" onChange= {(e)=> setImage(e.target.files[0])}></input>
      <button onClick={uploadImage}>Upload</button>
      <h1>Uploaded image will be displayed here</h1>
    <img src="https://res.cloudinary.com/dzi3h2qea/image/upload/v1656189769/eatndfxnkglv3fdvixpz.png" alt=""/>
    <img src={url} alt=""/>
      </div>
    </div>
  )
}

export default Create