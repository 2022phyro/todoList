import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import './Auth.css';
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setSignup] = useState(false)
	const [submitError, setSubmitError] = useState('')
	const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
	const toggleSignup = () => {
		setSubmitError('')
		setSignup(!isSignUp)
	}

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
			setSubmitError('Email and Password are required')
    }else if (password.length < 6) {
			setSubmitError('Password should be at least 6 characters')
		} else {
			console.log("Email:", email);
			console.log("Password:", password);
			setSubmitError('')
			navigate('/notes')

		}

    setEmail("");
    setPassword("");
  };

  return (
    <div className="auth-wrapper">
      <div className={`auth-inner ${isSignUp? 'signup': ''}`}>
        <h2>{isSignUp? 'Welcome back': 'Get started'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" required value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              required
              min={6}
              max={20}
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <button className="btn" type="submit">{isSignUp? 'Login': 'Sign up'}</button>
		{ submitError ? <p class="error">{submitError}</p>: <></> }
					</form>
        {
            isSignUp
            ? <p>Or don&apos;t have an account? <span className="b pri click" onClick={toggleSignup}>Click here</span></p>
            : <p>Already have an account? <span className="b pri click" onClick={toggleSignup}>Click here</span></p>

        }
      </div>
    </div>
  );
};

export default Auth;
