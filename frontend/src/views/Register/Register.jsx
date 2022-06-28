import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import UserForm from "../../components/UserForm/UserForm";

const Register = () => {
    return (
        <div>
            <NavBar />
            <UserForm mode={"register"} />
        </div>
    );
};

export default Register;
