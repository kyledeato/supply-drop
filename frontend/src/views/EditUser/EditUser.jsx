import React from "react";

import UserForm from "../../components/UserForm/UserForm";

const EditUser = (props) => {
    return (
        <div>
            <header>
                <h1>Edit User Info</h1>
            </header>
            <UserForm mode={"edit"} />
        </div>
    );
};

export default EditUser;
