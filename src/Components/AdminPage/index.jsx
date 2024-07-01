import React, { useState } from 'react';
import { FaRegTrashAlt, FaCheck, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import './style.css';

const users = [
    {
        id: 1,
        name: 'User 1',
        items: [
            {
                name: 'Dark Art 1',
                quantity: 1,
                price: 66
            },
            {
                name: 'Dark Art 2',
                quantity: 2,
                price: 50
            }
        ]
    },
    {
        id: 2,
        name: 'User 2',
        items: [
            {
                name: 'Dark Art 3',
                quantity: 3,
                price: 40
            }
        ]
    }
];

const ReceiptItem = ({ item }) => {
    return (
        <div className="receipt-item row d-flex justify-content-between align-items-center">
            <div className="col-12 col-md-4">
                <p className="mb-0">{item.name}</p>
            </div>
            <div className="col-6 col-md-4">
                <p className="mb-0">Qty: {item.quantity}</p>
            </div>
            <div className="col-6 col-md-2">
                <p className="mb-0">${item.price}</p>
            </div>
            <div className="col-12 col-md-2">
                <div className="d-flex justify-content-around flex-wrap">
                    <button className="btn btn-success m-2 flex-fill">
                        <FaCheck />
                    </button>
                    <button className="btn btn-danger m-2 flex-fill">
                        <FaTimes />
                    </button>
                </div>
            </div>
        </div>
    );
};

const Receipt = () => {
    const [expandedUser, setExpandedUser] = useState(null);

    const toggleUserExpand = (userId) => {
        setExpandedUser(expandedUser === userId ? null : userId);
    };

    return (
        <div className="receipt">
            {users.map((user) => (
                <div key={user.id} className={`user-box mb-3 ${expandedUser === user.id ? 'expanded' : ''}`}>
                    <div
                        className="user-header d-flex justify-content-between align-items-center p-3"
                        onClick={() => toggleUserExpand(user.id)}
                    >
                        <div className="user-name">{user.name}</div>
                        <div className="user-toggle">
                            {expandedUser === user.id ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                    </div>
                    {expandedUser === user.id && (
                        <div className="user-items p-3 bg-light">
                            <div className="items-container">
                                {user.items.map((item, index) => (
                                    <ReceiptItem key={index} item={item} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Receipt;
