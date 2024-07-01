// SidebarComponent.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const SidebarComponent = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="wrapper" className={isOpen ? 'toggled' : ''}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <span className="sidebar-toggle-icon"></span>
      </button>
      <div id="sidebar-wrapper" className={isOpen ? 'open' : ''}>
        <ul className="sidebar-nav">
          <li className="sidebar-brand">
            <a href="#">Brand_Name</a>
          </li>
          <li>
            <a href="/">Dashboard</a>
          </li>
          <li>
          <Link to="/products">Products</Link>
          </li>
          <li>
            <a href="#">My Orders</a>
          </li>
          <li>
            <a href="#">Payments</a>
          </li>
          <li>
            <a href="#">Transactions</a>
          </li>
          <li>
            <a href="#">Settings</a>
          </li>
        </ul>
      </div>
      <div id="page-content-wrapper">{children}</div>
    </div>
  );
};

export default SidebarComponent;