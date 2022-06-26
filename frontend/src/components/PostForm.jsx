import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, Link, useNavigate} from "react-router-dom";

const PostForm = (props) => {
  const { userID, postID } = props;
  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');
  const [postType, setPostType] = useState('');
  const [postLocation, setPostLocation] = useState('');
  const [postImage, setPostImage] = useState('test')
  const [errors, setErrors] = useState('');

  async function getPostInfo(){
    try{
      const response = await axios.get(`http://locatlhost:8000/api/post/${postID}`, {withCredentials: true});
      postID = response.data._id;
      setPostTitle(response.data.title);
      setPostDesc(response.data.description);
      setPostType(response.data.postType);
      setPostLocation(response.data.location)
      setPostImage(response.data.image)
      var postedBy = response.data.postedBy
    } 
    
    catch(err) {
      console.log(err)
    }
  }

  // function handlePhoto(){

  // }

  function submitHandler(e){
    e.preventDefault();

    const postData = {
      'title' : postTitle,
      'description' : postDesc,
      'postType' : postType,
      'location' : postLocation,
      'image' : postImage,
      'postedBy' : userID
    };

    axios.post(`http://localhost:8000/api/post/new`, postData, {withCredentials: true})
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(`err is: ${err}`);
        setErrors(err.response.data.errors);
        return errors
    });
  }

  useEffect( () => {
    if (postID){
      getPostInfo()
    }
  }, [])

  return (
    <div>
      <form className='flex' onSubmit={submitHandler} method='post'>
        
        <input />
        {/* image container */}
        <div>
          <label className='' htmlFor='postPicture'>Add a photo</label>
          <input type={'file'} accept='.png, .jpg, .jpeg' name='postPicture'/>
        </div>
        {/* end post container */}

        {/* post information container */}
        <div>
          <label htmlFor="title">Post Title:</label>
          <input type={'text'} name='title' className='' onChange={(e) => setPostTitle(e.target.value)} value={postTitle} />

          <label className=''>What type of post is it?</label>
          {/* radio button conditionals */}
          { 
            postType == 'offering'
            ? 
              <div>

                <div className='flex'>
                  <label className='' htmlFor='looking'>Request</label>
                  <input type={'radio'} name='postType' value='looking' onChange={(e) => setPostType(e.target.value)}/>
                </div>


                <div className='flex'>
                  <label className='' htmlFor='offering'>Offer</label>
                  <input selected type={'radio'} name='postType' value='offering'onChange={(e) => setPostType(e.target.value)}/>
                </div>

              </div>
            : 
              <div>
                <div className='flex'>
                  <label className='' htmlFor='looking'>Request</label>
                  <input selected type={'radio'} name='postType' value='looking' onChange={(e) => setPostType(e.target.value)}/>
                </div>

                <div className='flex'>
                  <label className='' htmlFor='offering'>Offer</label>
                  <input type={'radio'} name='postType' value='offering'onChange={(e) => setPostType(e.target.value)}/>
                </div>
              </div>
          }
          
          <label className='' htmlFor='desc'>Description of item(s)</label>
          <textarea className='' name='description' draggable='false' rows={'16'} cols={'50'} value={postDesc} onChange={(e) => setPostDesc(e.target.value)}/>

          <label className='' htmlFor='location'>Location of item</label>
          <input type={'text'} className='' name='location' value={postLocation} onChange={(e) => setPostLocation(e.target.value)}/>

          <button type='submit' className='' >Submit</button>
        </div>
        {/* end post information container */}

        
      </form>
    </div>
  )
}

export default PostForm

