import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import importImg from '../../img/ace_plus_logo.png';
import { Button } from '../../components/button.component';
import { Input } from '../../components/input.component';

interface Props {
  email: string;
  password: string;
}

export const Login: React.FC<Props> = ({}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<any>({});
  const [errMsg, setErrMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add loading state

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setErrMsg('');
    setIsLoading(true); // Start loading

    let validationErrors: any = {};
    if (email.trim() === '') {
      validationErrors.email = 'Email is required *';
    }
    if (password.trim() === '') {
      validationErrors.password = 'Password is required *';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false); // Stop loading
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/signin', {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      setTimeout(() => {
        localStorage.removeItem('token');
      }, 1200000);

      console.log(response.data);
      setIsLoading(false); // Stop loading
      // navigate(refresh);
      window.location.reload();
    } catch (error:any) {
      console.log(error.message);
      if (error.response && error.response.data && error.response.data.message) {
        const apiErrorMessage = error.response.data.message;
        setErrMsg(apiErrorMessage);
      } else {
        setErrMsg('An error has occurred during the API request.');
      }
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="login">
      <div className="container login-form ">
        <div className="login-form-row">
          <div className="left-col">
            <div className="left-col-content">
              <h1>Client Management System</h1>
            </div>
            <img src={importImg} alt="logo" />
          </div>
          <div className="right-col">
            <div className="right-col-content">
              <div className="from-title">
                <i className="fa-solid fa-user-tie"></i>
                <h1>login</h1>
              </div>
              <div className="form">
                <form onSubmit={handleLogin}>
                  <div className="input-wrap">
                    <Input
                      onChange={(e: any) => setEmail(e.target.value)}
                      type="email"
                      value={email}
                      placeholder="Enter your email!"
                      name=""
                      id=""
                    />
                    <p className="error-message">{errors.email && errors.email}</p>
                    <Input
                      onChange={(e: any) => setPassword(e.target.value)}
                      type="password"
                      value={password}
                      placeholder="Enter your password!"
                      name=""
                      id=""
                    />
                    <p className="error-message">{errors.password && errors.password}</p>
                    <p className="error-message">{errMsg && errMsg}</p>
                  </div>
                  <Button type="submit" className="button" text={isLoading ? 'Loading...' : 'Login'} disabled={isLoading} />
                  <p>
                    Don't have an account? <a href="/register">Signup</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

