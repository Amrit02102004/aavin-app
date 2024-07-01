import React, { useState } from 'react';
import './style.css'
import { Link } from 'react-router-dom';

function SignUp() {
    const [fullname, setFullname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [dealershipName, setDealershipName] = useState('');
    const [address, setAddress] = useState('');
    const [gstin, setGstin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        //TODO : Add Registration Backend API
        setShowAlert(true);
    };

    return (
        <div className="global-container">
            <div className="card login-form">
                <div className="card-body card-body-width">
                    <h3 className="card-title text-center">Sign Up to Aavin</h3>
                    <div className="card-text">
                        {showAlert && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                Registration failed. Please try again.
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="fullname">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="fullname"
                                            value={fullname}
                                            onChange={(e) => setFullname(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="form-control form-control-sm"
                                            id="phoneNumber"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control form-control-sm"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="dealershipName">Dealership Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="dealershipName"
                                            value={dealershipName}
                                            onChange={(e) => setDealershipName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="gstin">GSTIN</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="gstin"
                                            value={gstin}
                                            onChange={(e) => setGstin(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-sm"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-sm"
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="btn-custom">
                            <button type="submit" className="btn btn-primary btn-block align-signup-btn">
                                Sign Up
                            </button>
                            </div>
                            <div className="sign-up">
                                Already have an account? <Link to="/login">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;