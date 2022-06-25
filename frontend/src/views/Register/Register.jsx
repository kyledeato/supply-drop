import axios from "axios";
import React, { useEffect, useState } from "react";
import UserRegister from "../../components/RegisterForm/UserRegister";

const Register = () => {
    const[user, setUser] = useState()

    useEffect(() => {
        axios.get('http://localhost:8000/api/user')
            .then(res => {
                setUser(res.data)
            })
    })

  return (
    <div>
        <header><h1>Create User</h1></header>
        <UserRegister user={user}/>
        </div>
  )
}

export default Register