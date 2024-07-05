import React from "react";
import "./style.css";
import { FaUser, FaBell, FaShoppingCart, FaHome, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import SecureLS from 'secure-ls';

const ls = new SecureLS({ encodingType: 'aes' });

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the auth token
        ls.remove('authToken');
        // Redirect to login page
        navigate('/login');
    };

    return (      
        <nav className="navbar sticky-top navbar-light bg-light">
            <a className="navbar-brand icon-margin" href="#">
                <img src="logo192.png" width="30" height="30" alt="" />
            </a>
            <ul className="navbar-nav ml-auto horizontal-nav">
                <li className="nav-item">
                    <a className="nav-link icon-margin" href="/">
                        <FaHome />
                    </a>
                </li>
                
                <li className="nav-item">
                    <a className="nav-link icon-margin" href="/cart">
                        <FaShoppingCart />
                    </a>
                </li>
                
                <li className="nav-item">
                    <button className="nav-link icon-margin" onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <FaSignOutAlt />
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;