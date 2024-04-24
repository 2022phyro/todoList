import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { BASE_URL, inst } from "../utils/auth";

import './Auth.css';
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setSignup] = useState(true)
  const [loading, setLoading] = useState(false)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    // Basic validation
    if (!email || !password) {
			setSubmitError('Email and Password are required')
    }else if (password.length < 6) {
			setSubmitError('Password should be at least 6 characters')
		} else {
      try {
        const instance = await inst()
        await instance.post(`${BASE_URL}/auth/${isSignUp? 'login': 'signup'}`, {
          email,
          password
        });
        setSubmitError('')
        navigate('/notes')          
      } catch (error) {
        const { response } = error
        const {errors: err} = response.data
        setSubmitError(err.error)
        console.error(response)

      }
		}
    setEmail("");
    setPassword("");
    setLoading(false)
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
          <button disabled={loading} className="btn" type="submit">{isSignUp? 'Login': 'Sign up'}</button>
		{ submitError ? <p className="error">{submitError}</p>: <></> }
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
