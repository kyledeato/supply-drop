import React from 'react';
import './post.css';

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
                    <span>{title}</span> :: <span>{location}</span>{' '}
                    <button
                        onClick={() => {
                            embiggenPost(index, false, 'post');
                        }}
                    >
                        [X]
                    </button>
                </div>
                <div>
                    <div>
                        {image ? (
                            <img
                                src={'http://localhost:8000/img/' + image}
                                alt={title}
                            />
                        ) : (
                            <span>no image</span>
                        )}
                    </div>
                    <iframe
                        title="googlemap"
                        width="300"
                        height="300"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDUbRiOy26TfHguvbRi-9XsLa_oRNvQ_fY&q=${location}`}
                    ></iframe>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default Post;
