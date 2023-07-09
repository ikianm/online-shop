import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import useEmailValidation from '../../Hooks/useEmailValidation/useEmailValidation';
import usePasswordValidation from '../../Hooks/usePasswordValidation/usePasswordValidation';
import ReCAPTCHA from "react-google-recaptcha";
import DataContext from '../../Context/dataContext';
import './Login.css';

export default function Login() {
  const [email, isEmailValid, validateEmail] = useEmailValidation(); //email custom hook
  const [password, isPassValid, validatePassword] = usePasswordValidation(); //password custom hook
  const [isRecaptcha, setIsRecaptcha] = useState(false);
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);

  const recaptchaHandler = () => {
    setIsRecaptcha(true);
  };

  const loginHandler = () => {
    console.log('Sign In submitted');
    fetch('http://localhost:8080/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result) {
          dataContext.setUserContext(result);
          localStorage.setItem('user', JSON.stringify(result))
          navigate('/home');
        }
      });
  };

  return (
    <div id='login'>
      <div id="login-form">
        <div><h3>ایمیل و رمز عبور خود را وارد کنید</h3></div>
        <div id="login-inputs-wrapper">
          <TextField
            id="outlined-basic"
            label="ایمیل"
            fullWidth
            color='primary'
            variant='filled'
            autoFocus={true}
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

          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={recaptchaHandler}
          />

          <div>
            <Button
              variant='contained'
              size='large'
              fullWidth
              disabled={(isEmailValid && isPassValid && isRecaptcha) ? false : true}
              style={{ marginBottom: '8px' }}
              onClick={loginHandler}
            >ورود</Button>

            <Button
              variant='outlined'
              size='large'
              fullWidth
              onClick={() => navigate('/register')}
            >ثبت نام </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
