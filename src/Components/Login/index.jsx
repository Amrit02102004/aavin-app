import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../drizzle/index';
import { mySchemaUsers } from '../../drizzle/schema';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import SecureLS from 'secure-ls';
import { eq } from 'drizzle-orm';
import './style.css';

const ls = new SecureLS({ encodingType: 'aes' });

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const navigate = useNavigate();

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
        try {
            const users = await db.select().from(mySchemaUsers).where(eq(mySchemaUsers.email, email));

            if (users.length === 0) {
                setShowAlert(true);
                setAlertMessage('User not found');
                return;
            }

            const user = users[0];

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                setShowAlert(true);
                setAlertMessage('Invalid password');
                return;
            }

            const token = await generateToken({ userId: user.id, email: user.email });

            ls.set('authToken', token);

            navigate('/home');
        } catch (error) {
            console.error('Login failed:', error);
            setShowAlert(true);
            setAlertMessage('Login failed. Please try again.');
        }
    };

    return (
        <div className="global-container">
            <div className="card login-form">
                <div className="card-body">
                    <h3 className="card-title text-center">Log in to Aavin</h3>
                    <div className="card-text">
                        {showAlert && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {alertMessage}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control form-control-sm"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <a href="#" style={{ float: 'right', fontSize: '12px' }}>
                                    Forgot password?
                                </a>
                                <input
                                    type="password"
                                    className="form-control form-control-sm"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="btn-custom">
                                <button type="submit" className="btn btn-primary btn-block align-btn">
                                    Login
                                </button>
                            </div>
                            <div className="sign-up">
                                Don&apost have an account? <Link to="/signup">Create One</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;