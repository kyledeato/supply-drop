/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Input from '@mui/material';
import { TextareaAutosize } from '@mui/material';
import './PostForm/PostForm.css'
import './PostForm.css'
import x from './Post/x.png'
import AutoCompleteLocations from './AutocompleteLocations';

const PostForm = (props) => {
    const { userID, postID, embiggenForm, index } = props;
    const [postInfo, setPostInfo] = useState({});
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    
    useEffect(() => {
        if (postID) {
            getPostInfo();
        }
    }, []);

    async function getPostInfo() {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/post/${postID}`,
                { withCredentials: true }
            );
            setPostInfo(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    function refreshPage() {
        window.location.reload(false);
    }

    function submitHandler(e) {
        e.preventDefault();
        const inputs = e.currentTarget.querySelectorAll('input,textarea');
        let data = new FormData();

        inputs.forEach((input) => {
            if (input.name === '') {
                return;
            }

            if (input.type === 'file') {
                const fileList = input.files;
                if (fileList[0]) {
                    data.append(input.name, fileList[0]);
                }
            } else if (input.type === 'radio') {
                if (input.checked) {
                    data.append(input.name, input.value);
                }
            } else {
                if (input.value) {
                    data.append(input.name, input.value);
                }
            }
        });

        if (postID) {
            if (!data.has('postType')) {
                data.append('postType', postInfo.postType);
            }
            // data.append("postedBy", postInfo.postedBy);
            data.append('_id', postInfo._id);

            axios
                .put(`http://localhost:8000/api/post/${postID}`, data, {
                    withCredentials: true,
                })
                .then((res) => {
                    console.log(res);
                    embiggenForm(index, false, 'form');
                    refreshPage();
                })
                .catch((err) => {
                    console.log(err.response.data.errors);
                    setErrors(err.response.data.errors);
                    return errors;
                });
        } else {
            data.append('postedBy', userID);

            axios
                .post(`http://localhost:8000/api/post/new`, data, {
                    withCredentials: true,
                })
                .then((res) => {
                    console.log(res);
                    embiggenForm(index, false, 'form');
                    refreshPage();
                })
                .catch((err) => {
                    console.log(err.response.data.errors);
                    setErrors(err.response.data.errors);
                    return errors;
                });
        }
    }

    return (
        <div className="allcontain">
            <form
                className="flex post-form"
                onSubmit={submitHandler}
                method="post"
            >

                <div className='x-container'>
                <img src={x} alt="" className='x-form' onClick={() => {
                        embiggenForm(index, false, 'form');
                    }}/>
                </div>
                {/* image container */}

                <br />
                {/* post information container */}
                <div>
                    <TextField
                        name="title"
                        label="What are you offering/requesting?"
                        className="request-offer-title"
                        defaultValue={postInfo.title || ''}
                    />


                    {/* radio button conditionals */}

                    <div style={{ marginTop: '15px' }}>
                        <label className="">What type of post is it?</label>
                        {postID ? (
                            postInfo.postType || ''
                        ) : (
                            <>
                                {' '}
                                <div className="flex">
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="offering"
                                        name="postType"
                                        id="offering"
                                    >
                                        <FormControlLabel value="offering" control={<Radio />} label="Offering" />
                                        <FormControlLabel value="request" control={<Radio />} label="Request" />
                                    </RadioGroup>
                                </div>
                            </>
                        )}
                    </div>
                    <div style={{ marginTop: '15px' }}>
                        <label className="" htmlFor="desc">
                            Description of item(s):
                        </label>
                            <br />
                        <TextareaAutosize
                            minRows={3}
                            maxRows={6}
                            aria-label="maximum height"
                            defaultValue={postInfo.description || ''}
                            name="description"
                            className="description-location-box"
                        />
                    </div>
                    <div>
                    <AutoCompleteLocations id="standard-basic" name="location" defaultValue={postInfo.location || ''} label="Location" variant="standard" className="description-location-box"/>
                       
                    </div>
                </div>
                {/* end post information container */}
            {/* image container */}
            <div className='post-form'>
                <label className="" htmlFor="photo">
                    Add a photo
                </label>
                <br />
                <input
                    type={'file'}
                    accept=".png, .jpg, .jpeg"
                    name="photo"
                />
            </div>
            {/* end post container */}
                    <Button style={{ marginTop: '10px' }} type="submit" variant="contained">Submit</Button>
            </form>
        </div>
    );
};

export default PostForm;