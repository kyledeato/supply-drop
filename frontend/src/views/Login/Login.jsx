import React from "react";
import NavBar from '../../components/NavBar/NavBar';

import UserLogin from "../../components/LoginForm/UserLogin";

const Login = (props) => {
    return (
        <div>
            <NavBar />
            <UserLogin/>
        </div>
    );
};

export default Login;
