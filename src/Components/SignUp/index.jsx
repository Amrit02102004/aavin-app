import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../drizzle/index';
import { mySchemaUsers } from '../../drizzle/schema';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import SecureLS from 'secure-ls';
import './style.css';

const ls = new SecureLS({ encodingType: 'aes' });

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
    const [alertMessage, setAlertMessage] = useState('');

    const navigate = useNavigate();

    const addUser = async (userData) => {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

            const newUser = {
                full_name: userData.fullname,
                dealership_name: userData.dealershipName,
                phone_number: userData.phoneNumber,
                address: userData.address,
                email: userData.email,
                gstin: userData.gstin,
                password: hashedPassword,
            };

            const result = await db.insert(mySchemaUsers).values(newUser).returning();
            return result[0];
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    };

    const generateToken = async (payload) => {
        const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);
        const alg = 'HS256';

        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setExpirationTime('2y')
            .sign(secret);

        return jwt;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setShowAlert(true);
            setAlertMessage("Passwords don't match");
            return;
        }

        try {
            const userData = {
                fullname,
                phoneNumber,
                email,
                dealershipName,
                address,
                gstin,
                password
            };
            const newUser = await addUser(userData);
            console.log('User added successfully:', newUser);

            const token = await generateToken({ userId: newUser.id, email: newUser.email });

            ls.set('authToken', token);

            navigate('/dashboard');
        } catch (error) {
            console.error('Registration failed:', error);
            setShowAlert(true);
            setAlertMessage('Registration failed. Please try again.');
        }
    };

    return (
        <div className="global-container">
            <div className="card login-form">
                <div className="card-body card-body-width">
                    <h3 className="card-title text-center">Sign Up to Aavin</h3>
                    <div className="card-text">
                        {showAlert && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {alertMessage}
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
                                            required
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
                                            required
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
                                            required
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
                                            required
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
                                            required
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
                                            required
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