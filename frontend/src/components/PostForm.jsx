/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostForm = (props) => {
    const { userID, postID, embiggenForm, index } = props;
    const [postInfo, setPostInfo] = useState({});
    const [errors, setErrors] = useState("");
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

    function submitHandler(e) {
        e.preventDefault();
        const inputs = e.currentTarget.querySelectorAll("input,textarea");
        let data = new FormData();

        inputs.forEach((input) => {
            if (input.name === "") {
                return;
            }

            if (input.type === "file") {
                const fileList = input.files;
                if (fileList[0]) {
                    data.append(input.name, fileList[0]);
                }
            } else if (input.type === "radio") {
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
            if (!data.has("postType")) {
                // data.append("postType", postInfo.postType);
            }
            // data.append("postedBy", postInfo.postedBy);
            data.append("_id", postInfo._id);

            axios
                .put(`http://localhost:8000/api/post/${postID}`, data, {
                    withCredentials: true,
                })
                .then((res) => {
                    console.log(res);
                    embiggenForm(index, false, "form");
                    navigate("/");
                })
                .catch((err) => {
                    console.log(err.response.data.errors);
                    setErrors(err.response.data.errors);
                    return errors;
                });
        } else {
            data.append("postedBy", userID);

            axios
                .post(`http://localhost:8000/api/post/new`, data, {
                    withCredentials: true,
                })
                .then((res) => {
                    console.log(res);
                    embiggenForm(index, false, "form");
                    navigate("/");
                })
                .catch((err) => {
                    console.log(err.response.data.errors);
                    setErrors(err.response.data.errors);
                    return errors;
                });
        }
    }

    return (
        <div className="post-form-container">
            <form
                className="flex post-form"
                onSubmit={submitHandler}
                method="post"
            >
                <button
                    onClick={() => {
                        embiggenForm(index, false, "form");
                    }}
                >
                    [X]
                </button>
                <input />
                {/* image container */}
                <div>
                    <label className="" htmlFor="photo">
                        Add a photo
                    </label>
                    <input
                        type={"file"}
                        accept=".png, .jpg, .jpeg"
                        name="photo"
                    />
                </div>
                {/* end post container */}

                {/* post information container */}
                <div>
                    <label htmlFor="title">Post Title:</label>
                    <input
                        type={"text"}
                        name="title"
                        className=""
                        defaultValue={postInfo.title || ""}
                    />

                    <label className="">What type of post is it?</label>
                    {/* radio button conditionals */}

                    <div>
                        {postID ? (
                            postInfo.postType || ""
                        ) : (
                            <>
                                {" "}
                                <div className="flex">
                                    <label className="" htmlFor="looking">
                                        Request
                                    </label>
                                    <input
                                        id="looking"
                                        defaultChecked={false}
                                        type={"radio"}
                                        name="postType"
                                        value="looking"
                                    />
                                </div>
                                <div className="flex">
                                    <label className="" htmlFor="offering">
                                        Offer
                                    </label>
                                    <input
                                        id="offering"
                                        defaultChecked={true}
                                        type={"radio"}
                                        name="postType"
                                        value="offering"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <label className="" htmlFor="desc">
                        Description of item(s)
                    </label>
                    <textarea
                        className=""
                        name="description"
                        draggable="false"
                        rows={"16"}
                        cols={"50"}
                        defaultValue={postInfo.description || ""}
                    />

                    <label className="" htmlFor="location">
                        Location of item
                    </label>
                    <input
                        type={"text"}
                        className=""
                        name="location"
                        defaultValue={postInfo.location || ""}
                    />

                    <button type="submit" className="">
                        Submit
                    </button>
                </div>
                {/* end post information container */}
            </form>
        </div>
    );
};

export default PostForm;
