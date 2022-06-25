import React from "react";
import UserForm from "../../components/UserForm/UserForm";

const Register = () => {
    return (
        <div>
            <header>
                <h1>Create User</h1>
            </header>
            <UserForm mode={"register"} />
        </div>
    );
};

export default Register;
