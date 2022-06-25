import React, {useEffect, useState}  from 'react'
import axios from "axios";
import UserLogin from "../../components/LoginForm/UserLogin";

const Login = (props) => {
    const [user, setUser] = useState()

    useEffect(() => {
        axios.get('http://localhost:8000/api/user')
            .then(res => {
                setUser(res.data)
                console.log(res.data)
            });
    }, []);

    return (

            <div>
                
                <UserLogin user={user}/>
            </div>

    )
}

export default Login