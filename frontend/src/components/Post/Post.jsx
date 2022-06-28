import React from 'react';
import './post.css';
import locationLogo from './location.png';
import xLogo from './x.png';

function Post({
    postType,
    title,
    description,
    image,
    location,
    postedBy,
    _id,
    embiggenForm: embiggenPost,
    index,
}) {
    return (
        <div className="post-container">
            <div className="post">
                <div>
                    <div className='post-head-container'>
                        <h5 className='title'>{title}</h5>
                        <img src={xLogo} alt="" srcSet="" onClick={() => {
                            embiggenPost(index, false, 'post');
                        }} className='x'/>
                    </div>
                    <img src={locationLogo} alt="" srcSet=""className="locationImage"/><span className='location'>{location}</span>

                        <p className='description'>{description}</p>
                </div>
                <div>
                    <div className='image'>
                        {image ? (
                            <img
                                
                                src={'http://localhost:8000/img/' + image}
                                alt={title}
                            />
                        ) : (
                            <span>no image</span>
                        )}
                    </div>
                    <div className='bottom'>
                        <form action="" className="email">
                            <h1 className='title'>Send a Message {postedBy.firstName} {postedBy.lastName}</h1>
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name"  required/>
                            <label htmlFor="name" className='padding'>Email</label>
                            <input type="email" name="email"  required/>
                            <label htmlFor="message" className='padding'>Your Message</label>
                            <textarea name="message" id="" cols="30" rows="4"></textarea>
                        <div className='padding'>
                            <button type="submit">Send</button>
                        </div>
                        </form>
                        <iframe
                            title="googlemap"
                            width="300"
                            height="300"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDUbRiOy26TfHguvbRi-9XsLa_oRNvQ_fY&q=${location}`}
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;
