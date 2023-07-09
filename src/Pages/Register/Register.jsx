import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import useNameValidation from '../../Hooks/useNameValidation/useNameValidation';
import useEmailValidation from '../../Hooks/useEmailValidation/useEmailValidation';
import usePasswordValidation from '../../Hooks/usePasswordValidation/usePasswordValidation';
import './Register.css';

export default function Register() {
    const [name, isNameValid, validateName] = useNameValidation(); //name custom hook
    const [email, isEmailValid, validateEmail] = useEmailValidation(); //email custom hook
    const [password, isPassValid, validatePassword] = usePasswordValidation(); //password custom hook
    const navigate = useNavigate();
    const registerHandler = () => {
        console.log('Register Submitted');
        fetch('http://localhost:8080/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then(result => {
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/home')
        });
    };

    return (
        <div id='register'>
            <div id="register-form">
                <div><h3>ایمیل و رمز عبور خود را وارد کنید</h3></div>
                <div id="register-inputs-wrapper">
                    <TextField
                        id="outlined-basic"
                        label="نام و نام خانوادگی"
                        fullWidth
                        color='primary'
                        variant='filled'
                        autoFocus={true}
                        error={isNameValid ? false : true}
                        onChange={(e) => validateName(e.target.value)}
                    />

                    <TextField
                        id="outlined-basic"
                        label="ایمیل"
                        fullWidth
                        color='primary'
                        variant='filled'
                        error={isEmailValid ? false : true}
                        onChange={(e) => validateEmail(e.target.value)}
                    />

                    <TextField
                        id="outlined-password-input"
                        label="رمز عبور"
                        type="password"
                        autoComplete="current-password"
                        fullWidth
                        color='primary'
                        variant='filled'
                        error={isPassValid ? false : true}
                        onChange={(e) => validatePassword(e.target.value)}
                    />
                    <div>
                        <Button
                            variant='contained'
                            size='large'
                            fullWidth
                            disabled={(isNameValid && isEmailValid && isPassValid) ? false : true}
                            style={{ marginBottom: '8px' }}
                            onClick={registerHandler}
                        >ثبت نام</Button>

                        <Button
                            variant='outlined'
                            size='large'
                            fullWidth
                            onClick={() => navigate('/login')}
                        >ورود</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}
