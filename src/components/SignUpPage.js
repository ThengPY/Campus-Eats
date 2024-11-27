import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './SignUpPage.css'; 
import ForgetPasswordOverlay from './ForgetPasswordOverlay';

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
      toast.error('Please fill in all required fields.', {
        position: "top-left",
        autoClose: 1500,
      });
      return;
    }
    toast.success('Signing up with:'+ username, {
      position: "top-left", 
      autoClose: 1500,
    });

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
          console.log('Sign up response:', data);
          localStorage.setItem('username',username);
          onClose();
        })
        .catch(error => {
          console.error('Sign up error:', error);
        });
    onClose();
  };
  
  const handleLogin = () => {
    if (!username || !email || !password){
      toast.error('Please fill in all required fields.', {
        position: "top-left",
        autoClose: 1500,
      });
      return;
    }
    toast.success('Logging in with:'+ username, {
      position: "top-left", 
      autoClose: 1500,
    });
    const loginData = {username, email, password,};

    fetch('http://localhost:5000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
        .then(response => response.text())
        .then(data => {
          console.log('Login response:', data);
          onClose();
        })
        .catch(error => {
          console.error('Login error:', error);
        });
    onClose();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordMatchError && e.target.value === confirmPassword) {
      setPasswordMatchError(false);
    }
  };
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (passwordMatchError && password === e.target.value) {
      setPasswordMatchError(false);
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
            toast.success(`${data.message}`);
          } else {
            toast.error('Failed to send password reset email.')
          }
        })
        .catch(error => {
          console.error('Forget password error:', error);
          toast.error('An error occured while processing your request.');
          setIsForgetPasswordOverlayOpen(false);
        });
  };



  if (!isOpen) return null; // Only render modal when it's open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Log In / Sign Up</h2>
        <form onSubmit={handleSubmit} className="sign-up-form">
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password (for sign up only):</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {passwordMatchError && (
            <p style={{ color: 'red', marginTop: '-10px' }}>Passwords do not match</p>
          )}
          <button type="button" className="submit-btn" onClick={handleSignUp}>Sign Up</button>
          <button type="button" className="submit-btn" onClick={handleLogin}>Log In</button>
          <button type="button" className="submit-btn" onClick={handleForgetPassword}>Forget Password</button>
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
