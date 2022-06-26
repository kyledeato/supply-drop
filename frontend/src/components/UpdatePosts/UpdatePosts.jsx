import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import PostForm from '../PostForm'

const EditPost = (props) => {
    const { id } = useParams();
    const [postType, setPostType] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [errors, setErrors] = useState({});
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/post/${id}`, {withCredentials: true} )
            .then((res) => {
                console.log(res.data);
                setTitle(res.data.setTitle);
                setPostType(res.data.postType);
                setDescription(res.data.description);
                setLocation(res.data.location);
                setLoaded(true);
            })
            .catch((err) => console.log(err))
    }, [id]);

    const submitHandler = postParam => {
        axios.put(`http://localhost:8000/api/post/${id}`, postParam, {withCredentials: true}, {
            postType, title, description, location
        })
            .then((res) => {
                if(res.data.errors){
                    console.log(res.errors);
                    setErrors(res.errors);
                } else {
                    console.log(res.data);
                    navigate("/");
                }
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            })
    }
    return(
        <div>
            <div className="update-header">
                <h1>Supply-Drop</h1>
            </div>
            {
                loaded && <PostForm onSubmitProp = {submitHandler}
                initialTitle = {title}
                initialPostType = {postType}
                intialDescription = {description}
                initialLocation = {location}
                />
            }
        </div>
    )
}

export default EditPost;