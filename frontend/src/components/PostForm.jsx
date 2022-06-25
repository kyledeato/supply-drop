import React from 'react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, Link, useNavigate} from "react-router-dom";

const PostForm = (props) => {
  const {postID} = useParams();
  const [postInfo, setPostInfo] = useState();
  const [postTitle, setPostTitle] = useState();
  const [postDesc, setPostDesc] = useState();
  const [postType, setPostType] = useState();
  const [postLocation, setPostLocation] = useState();
  const [postImage, setPostImage] = useState('test')
  const [errors, setErrors] = useState();

  // async function getPostInfo(){
  //   try{
  //     const resposne = await axios.get(`http://locatlhost:8000/api/post/${postId}`, {withCredentials: true});
  //     setPostInfo(res.data)
  //   } 
    
  //   catch(err) {
  //     console.log(err)
  //   }
  // }

  // function handlePhoto(){

  // }

  function submitHandler(e){
    e.preventDefault();

    const postData = {
      'title' : postTitle,
      'desc' : postDesc,
      'requestoffer' : postType,
      'location' : postLocation,
      'image' : postImage
    };

    axios.post(`http://localhost:8000/api/post/new`, {postData}, {withCredentials: true})
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(`err is: ${err}`);
        setErrors(err.response.data.errors);
        return errors
    });
  }

  // useEffect( () => {
  //   if (postID){
  //     getPostInfo()
  //   }
  // })

  return (
    <div>
      <form className='flex' action={submitHandler} method='post'>
        {/* image container */}
        <div>
          <label className='' htmlFor='postPicture'>Add a photo</label>
          <input type={'file'} accept='.png, .jpg, .jpeg' name='postPicture' onChange={handlePhoto} />
        </div>
        {/* end post container */}

        {/* post information container */}
        <div>
          <label htmlFor="title">Post Title:</label>
          <input type={'text'} name='title' className='' onChange={(e) => setPostTitle(e.target.value)}/>

          <label className='' htmlFor='requestoffer'>What type of post is it?</label>
            {/* radio button options */}
            <div>
              {/* request radio option */}
              <div className='flex'>
                <label className='' htmlFor='requestoffer'>Request</label>
                <input type={'radio'} name='requestoffer' value={true} onChange={(e) => setPostType(e.target.value)}/>
              </div>

              {/* offer radio option */}
              <div className='flex'>
                <label className='' htmlFor='requestoffer'>Offer</label>
                <input type={'radio'} name='requestoffer' value={false}  onChange={(e) => setPostType(e.target.value)}/>
              </div>
            {/* end radio button options */}
            </div>

          <label className='' htmlFor='desc'>Description of item(s)</label>
          <textarea className='' name='' draggable='false' rows={'16'} cols={'50'} value={''} onChange={(e) => setPostDesc(e.target.value)}/>

          <label className='' htmlFor='location'>Location of item</label>
          <input type={'text'} className='' name='location' value={''} onChange={(e) => setPostLocation(e.target.value)}/>

          <button type='submit' className='' >Submit</button>
        </div>
        {/* end post information container */}

        
      </form>
    </div>
  )
}

export default PostForm

