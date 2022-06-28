/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function UserForm({ mode }) {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        console.log({ mode });
        switch (mode) {
            case 'registration':
                break;
            case 'edit':
                axios
                    .get('http://localhost:8000/api/auth', {
                        withCredentials: true,
                    })
                    .then((res) => {
                        setUser(res.data);
                        console.log(res.data);
                    })
                    .catch((err) => console.log(err));

                break;

            default:
                return;
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        const inputs = e.currentTarget.querySelectorAll('input');
        let url;
        let data = new URLSearchParams();

        inputs.forEach((input) => {
            data.append(input.name, input.value);
        });

        switch (mode) {
            case 'register':
                url = 'http://localhost:8000/api/user/register';

                axios
                    .post(url, data)
                    .then((res) => {
                        navigate('/');
                    })
                    .catch((err) => {
                        const errResData = err.response.data.errors;
                        let errArr = {};

                        for (const key in errResData) {
                            errArr[key] = errResData[key]['message'];
                        }
                        setErrors(errArr);
                    });
                break;
            case 'edit':
                url = `http://localhost:8000/api/user/${user._id}`;

                axios
                    .put(url, data)
                    .then((res) => {
                        navigate('/');
                    })
                    .catch((err) => {
                        const errResData = err.response.data.errors;
                        let errArr = {};

                        for (const key in errResData) {
                            errArr[key] = errResData[key]['message'];
                        }
                        setErrors(errArr);
                    });

                break;
            default:
                break;
        }
    }

    const renderErrorMessage = (name) =>
        errors[name] && <div className="error">{errors[name]}</div>;

    function FormField({ name, label, type, defaultValue }) {
        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <input
                    type={type || 'text'}
                    name={name}
                    id={name}
                    defaultValue={defaultValue || ''}
                />
            </div>
        );
    }

    return (
        <div className='user-form'>
            <h1 className='title-logo'>Register <span className='gold'>Here</span></h1>
            <h2>Already have an account? <Link to="/login">Login here</Link>.</h2>
            <form onSubmit={handleSubmit}>
            {(mode === 'register' || mode === 'edit') && (
                <>
                    <div className='user-input-div'>
                        <FormField
                            name={'firstName'}
                            label={'First Name:'}
                            defaultValue={user.firstName || ''}
                        />
                        </div>
                    {renderErrorMessage('firstName')}
                    <div className='user-input-div'>
                        <FormField
                            name={'lastName'}
                            label={'Last Name:'}
                            defaultValue={user.lastName || ''}
                        />
                    </div>
                    {renderErrorMessage('lastName')}
                    <div className='user-input-div'>
                        <FormField
                            name={'username'}
                            label={'Username:'}
                            defaultValue={user.username || ''}
                        />
                    </div>
                    {renderErrorMessage('username')}
                </>
            )}
            <div className='user-input-div'>
                <FormField
                    name={'email'}
                    label={'Email:'}
                    defaultValue={user.email || ''}
                />
            </div>
            {renderErrorMessage('email')}
            <div className='user-input-div'>
                <FormField
                    name={'password'}
                    label={'Password:'}
                    type={'password'}
                    defaultValue={user.password || ''}
                />
            </div>
            {renderErrorMessage('password')}
            <div className='user-input-div'>
                <FormField
                    name={'confirmPassword'}
                    label={'Confirm Password:'}
                    type={'password'}
                />
            </div>
            {renderErrorMessage('confirmPassword')}

            <h3>Having trouble creating an account?</h3>
            <div className="button-container">
                <input type="submit" value="Register" />
            </div>
            <p>*Accounts aren't necessary to view posts*</p>
        </form>
        </div>
    );
}

export default UserForm;
