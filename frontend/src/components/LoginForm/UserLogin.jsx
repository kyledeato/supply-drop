import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './LoginForm.css'


const UserLogin = (props) => {
    const [errorMessages, setErrorMessages] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const { user } = props;
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const errors = {
        email: "invalid email",
        password: "invalid password"
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/user/login", {
            email,
            password
        }, { withCredentials: true })

            .then(res => {
                setLoggedIn(true)
                console.log(res)
                navigate('/')
            })
            .catch(err => {
                const errArr = []
                const errResData = err.response.data.errorMessages
                console.log(errResData)
                if (user) {
                    if (user.password !== password.value) {
                        setErrorMessages({ name: "pass", message: "Email or password is incorrect" });
                    }
                }
            })
    };

    return (
        <div className="user-form">
            <h1 className='title-logo'>Login <span className="gold">Here</span></h1>
            <h2>Haven't made an account yet? <Link to="/register">Create one</Link>!</h2>
            <form onSubmit={handleSubmit}>
                {renderErrorMessage("pass")}
                <div className="flex justify-between align-center user-input-div" controlid="formBasicEmail">
                    <label>Email: </label>
                    <input type="email" required name="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex justify-between align-center user-input-div" controlid="formBasicPassword">
                    <label>Password: </label>
                    <input type="password" required name="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <h3>Having trouble logging in?</h3>
                <div className="button-container">
                    <input type="submit" value="Login" />
                </div>
            </form>
            <p>*Accounts aren't necessary to view posts*</p>
        </div>
    );
}

export default UserLogin