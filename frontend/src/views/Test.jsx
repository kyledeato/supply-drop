import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {storage} from '../firebase'
import {ref, uploadBytes,getDownloadURL, listAll} from 'firebase/storage'
import {v4} from 'uuid'

const Test = () => {

    const [imageUpload, setImageUpload]=useState(null);
    const [imageList, setImageList]=useState([]);

    const imageListRef=ref(storage, "images/")
    const uploadImage = ()=>{
    if (imageUpload==null)return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(()=>{
        alert("Image Uploaded")
    });
   };

   useEffect(()=>{
    listAll(imageListRef).then((response)=>{
        response.items.forEach((item)=>{
            getDownloadURL(item).then((url)=>{
                setImageList((prev)=>[...prev, url]);
            });
        });
    });
   }, []);
  return (
    <div>
        <input type="file" onChange={(event)=>{
            setImageUpload(event.target.files[0]);
        }}/>
        <button onClick={uploadImage}>Upload</button>

        {imageList.map((url, i)=>{
            return(
                <div key={i}>
                <img src={url}/>
                </div>
                )
        })}
    </div>
  )
}

export default Test