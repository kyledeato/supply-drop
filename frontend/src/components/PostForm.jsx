/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";

const PostForm = (props) => {
  const { userID, postID } = props;
  const [postInfo, setPostInfo] = useState({});
  const [errors, setErrors] = useState("");

  async function getPostInfo() {
    try {
      const response = await axios.get(
        `http://locatlhost:8000/api/post/${postID}`,
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

    data.append("postedBy", userID);

    axios
      .post(`http://localhost:8000/api/post/new`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
        return errors;
      });
  }

  useEffect(() => {
    if (postID) {
      getPostInfo();
    }
  }, []);

  return (
    <div>
      <form className="flex" onSubmit={submitHandler} method="post">
        <input />
        {/* image container */}
        <div>
          <label className="" htmlFor="photo">
            Add a photo
          </label>
          <input type={"file"} accept=".png, .jpg, .jpeg" name="photo" />
        </div>
        {/* end post container */}

        {/* post information container */}
        <div>
          <label htmlFor="title">Post Title:</label>
          <input
            type={"text"}
            name="title"
            className=""
            // onChange={(e) => setPostTitle(e.target.value)}
            defaultValue={postInfo.title || ""}
          />

          <label className="">What type of post is it?</label>
          {/* radio button conditionals */}

          <div>
            <div className="flex">
              <label className="" htmlFor="looking">
                Request
              </label>
              <input
                defaultChecked={
                  postInfo.postType ? postInfo.postType === "looking" : false
                }
                type={"radio"}
                name="postType"
                value="looking"
                // onChange={(e) => setPostType(e.target.value)}
              />
            </div>

            <div className="flex">
              <label className="" htmlFor="offering">
                Offer
              </label>
              <input
                defaultChecked={
                  postInfo.postType ? postInfo.postType === "offering" : true
                }
                type={"radio"}
                name="postType"
                value="offering"
                // onChange={(e) => setPostType(e.target.value)}
              />
            </div>
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
            // onChange={(e) => setPostDesc(e.target.value)}
          />

          <label className="" htmlFor="location">
            Location of item
          </label>
          <input
            type={"text"}
            className=""
            name="location"
            defaultValue={postInfo.location || ""}
            // onChange={(e) => setPostLocation(e.target.value)}
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
