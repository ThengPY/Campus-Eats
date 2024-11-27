import React from 'react';
import './SignUpPage.css';
import forget_pw from '../img/forgetpassword.png';

const ForgetPasswordOverlay = ({ onClose, onSubmit, email, setEmail }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className = "close-btn">
                    <span class="material-symbols-rounded" onClick={onClose}>close</span>
                </div>
                <h2>Forget Password</h2>
                <div className = "img-wrapper"><img className = "signup-img" src = {forget_pw} /></div>
                <form onSubmit={onSubmit} className="sign-up-form">
                    <div className = "input-container">
                        <div className = "input-wrapper">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder = "Enter Email" required />
                            <i className="material-symbols-rounded">email</i>
                        </div>
                    </div>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPasswordOverlay;