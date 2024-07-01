import React, { useState } from 'react';
import './style.css';
function EditProfile() {
    const [fullname, setFullname] = useState('John Doe');
    const [phone, setPhone] = useState('1234567890');
    const [email, setEmail] = useState('john.doe@example.com');
    const [dealershipName, setDealershipName] = useState('Acme Dealership');
    const [address, setAddress] = useState('123 Main Street, Anytown USA');
    const [gstin, setGstin] = useState('12ABCDE3456F7Z8');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission without API call
        console.log('Profile updated successfully');
    };

    return (
        <div className="global-container">
            <div className="card edit-form" style={{ width: '70%'}}>
                <div className="card-body">
                    <h3 className="card-title text-center">Edit Profile</h3>
                    <div className="card-text">
                        <form onSubmit={handleSubmit}>
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
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control form-control-sm"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
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
                            <button type="submit" className="btn profile-btn btn-primary btn-block">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;