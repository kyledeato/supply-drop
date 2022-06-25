import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const UserRegister = (props) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();
    const { user } = props

    const renderErrorMessage = (name) =>
        name === errors.name && (
            <div className="error">{errors.message}</div>
        );

    const onSubmitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/user/register', {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        }, { withCredentials: true })

            .then(res => {
                console.log(res)
                navigate('/')
            })
            .catch(err => {
                const errArr = []
                const errResData = err.response.data.errors
                console.log(errResData)
                for (const key in errResData) {
                    errArr.push(errResData[key]["message"])
                }
                setErrors(errArr)
            })
    }


    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <p>
                    <label>First Name:</label><br />
                    <input type='text' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                    {renderErrorMessage("firstName")}
                </p>
                <p>
                    <label>Last Name:</label><br />
                    <input type='text' onChange={(e) => setLastName(e.target.value)} value={lastName} />
                    {renderErrorMessage("firstName")}
                </p>
                <p>
                    <label>Email:</label><br />
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </p>
                <p>
                    <label>Password:</label><br />
                    <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                </p>
                <p>
                    <label>Confirm Password:</label><br />
                    <input type='password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                    {renderErrorMessage("firstName")}
                </p>
                <input type='submit' />
            </form>
        </div>
    )
}

export default UserRegister