import React from "react";
import "./style.css";
import { FaUser, FaBell, FaShoppingCart, FaHome } from "react-icons/fa";

const Navbar = () => {
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
                    <a className="nav-link icon-margin" href="#">
                        <FaUser />
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link icon-margin" href="/cart">
                        <FaShoppingCart />
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link icon-margin" href="#">
                        <FaBell />
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;