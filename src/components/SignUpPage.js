import React, { useState } from 'react';
import './SignUpPage.css'; 
import ForgetPasswordOverlay from './ForgetPasswordOverlay';
import eating from '../img/eating.png';
import {toast} from "react-toastify";

const SignUpPage = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [isForgetPasswordOverlayOpen, setIsForgetPasswordOverlayOpen] = useState(false);
  const [forgetPasswordEmail, setForgetPasswordEmail] = useState('');
  const [forgetPasswordMessage, setForgetPasswordMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    onClose(); // Close the modal after submission
  };

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    if (!username || !email || !password){
      alert('Please fill in all required fields.');
      return;
    }
    alert('Signing up with: ' + username);

    const signUpData = {username, email, password,};

    fetch('http://localhost:5000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpData),
    })
        .then(response => response.text())
        .then(data => {
          alert('Sign up is successful! Please log in now!');
          console.log('Sign up response:', data);
        })
        .catch(error => {
          console.error('Sign up error:', error);
        });
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPasswordMatchError(false);
  };
  
  const handleLogin = () => {
    if (!username || !email || !password){
      alert('Please fill in all required fields.');
      return;
    }
    const loginData = {username, email, password,};
    fetch('http://localhost:5000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
        .then(response => {
          if (response.ok) {
            return response.text(); // Or `response.json()` if server sends JSON
          } else {
            throw new Error('Invalid credentials or login failed');
          }
        })
        .then(data => {
          alert('Logging in with: ' + username);
          console.log('Login response:', data);
          localStorage.setItem('username',username);
          onClose();
        })
        .catch(error => {
          alert(`Login failed: ${error.message}`)
          console.error('Login error:', error);
          
        });
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPasswordMatchError(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value === confirmPassword) {
      setPasswordMatchError(false);
    } else {
      setPasswordMatchError(true);
    }
  };
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password === e.target.value) {
      setPasswordMatchError(false);
    } else {
      setPasswordMatchError(true);
    }
  };
  
  const handleForgetPassword = () => {
    setIsForgetPasswordOverlayOpen(true);
  };

  const handleForgetPasswordSubmit = (e) => {
    e.preventDefault();
    console.log('Forget Password Email: ', forgetPasswordEmail);
    fetch('http://localhost:5000/user/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: forgetPasswordEmail }),
    })
        .then(response => response.json())
        .then(data => {
          console.log('Forget password response:', data);
          if (data.success) {
            alert(data.message);
          } else {
            alert('Failed to send password reset email.');
          }
        })
        .catch(error => {
          console.error('Forget password error:', error);
          alert('An error occurred while processing your request.');
          setIsForgetPasswordOverlayOpen(false);
        });
  };

  if (!isOpen) return null; // Only render modal when it's open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="close-btn">
          <span className="material-symbols-rounded" onClick={onClose}>close</span>
        </div>
        <h2>Account</h2>
        <div className="img-wrapper"><img className="signup-img" src={eating} /></div>
        <form onSubmit={handleSubmit} className="sign-up-form">
          <div className="input-container">
            <div className="input-wrapper">
              <i className="material-symbols-rounded">account_circle</i>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" required />
            </div>
          </div>
          <div className="input-container">
            <div className="input-wrapper">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />
              <i className="material-symbols-rounded">email</i>
            </div>
          </div>
          <div className="input-container">
            <div className="input-wrapper">
              <input type="password" value={password} onChange={handlePasswordChange} placeholder="Enter Password" required />
              <i className="material-symbols-rounded">lock</i>
            </div>
          </div>
          <div className="input-container">
            <div className="input-wrapper">
              <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm Password (SIGNUP)" required />
              <i className="material-symbols-rounded">enhanced_encryption</i>
            </div>
          </div>
          {passwordMatchError && (
            <p style={{ color : "#FF906B", fontSize: '12px', marginBottom : "0px"}}><span class="material-symbols-rounded" style = {{fontSize : "12px", color : "#FF906B"}}>error</span> Passwords do not match!</p>
          )}
          <div className="account-btns">
            <button type="button" className="submit-btn" onClick={handleSignUp}><b>SIGN UP</b></button>
            <button type="button" className="submit-btn" onClick={handleLogin}><b>LOG IN</b></button>
          </div>
          <button type="button" className="forget-btn" onClick={handleForgetPassword}><b>FORGET PASSWORD</b></button>
        </form>
      </div>
      {isForgetPasswordOverlayOpen && (
        <ForgetPasswordOverlay
          onClose={() => setIsForgetPasswordOverlayOpen(false)}
          onSubmit={handleForgetPasswordSubmit}
          email={forgetPasswordEmail}
          setEmail={setForgetPasswordEmail}
        />
      )}
    </div>
  );
};

export default SignUpPage;