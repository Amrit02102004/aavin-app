import React, { useState } from 'react';
import './style.css'
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        //TODO : Add Login Backend API
        setShowAlert(true);
    };

    return (
        <div className="global-container">
            <div className="card login-form">
                <div className="card-body">
                    <h3 className="card-title text-center">Log in to Aavin</h3>
                    <div className="card-text">
                        {showAlert && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                Incorrect username or password.
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input
                                    type="email"
                                    className="form-control form-control-sm"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <a href="#" style={{ float: 'right', fontSize: '12px' }}>
                                    Forgot password?
                                </a>
                                <input
                                    type="password"
                                    className="form-control form-control-sm"
                                    id="exampleInputPassword1"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="btn-custom">
                            <button type="submit" className="btn btn-primary btn-block align-btn">
                                Login
                            </button>
                            </div>
                            <div className="sign-up">
                                Don't have an account? <Link to="/signup">Create One</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;