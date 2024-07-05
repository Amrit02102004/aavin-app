import React, { useState, useEffect } from 'react';
import { db } from '../../drizzle/index'; // Adjust the path as needed
import { mySchemaUsers } from '../../drizzle/schema'; // Adjust the path as needed
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import SecureLS from 'secure-ls';
import './style.css';

const ls = new SecureLS({ encodingType: 'aes' });

function EditProfile() {
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [dealershipName, setDealershipName] = useState('');
    const [address, setAddress] = useState('');
    const [gstin, setGstin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = ls.get('authToken');
                if (!token) {
                    setError('Not authenticated');
                    return;
                }

                // Decode the token to get the user ID
                const payload = JSON.parse(atob(token.split('.')[1]));
                const userId = payload.userId;

                const userData = await db.select().from(mySchemaUsers).where(eq(mySchemaUsers.id, userId));

                if (userData.length > 0) {
                    const user = userData[0];
                    setFullname(user.full_name);
                    setPhone(user.phone_number);
                    setEmail(user.email);
                    setDealershipName(user.dealership_name);
                    setAddress(user.address);
                    setGstin(user.gstin);
                } else {
                    setError('User not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data');
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        try {
            const token = ls.get('authToken');
            if (!token) {
                setError('Not authenticated');
                return;
            }

            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.userId;

            let updateData = {
                full_name: fullname,
                phone_number: phone,
                email: email,
                dealership_name: dealershipName,
                address: address,
                gstin: gstin,
            };

            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updateData.password = hashedPassword;
            }

            await db.update(mySchemaUsers)
                .set(updateData)
                .where(eq(mySchemaUsers.id, userId));

            console.log('Profile updated successfully');
            // Optionally, you can update the token here if any critical info (like email) has changed
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Error updating profile');
        }
    };

    if (error) {
        return <div className="error">{error}</div>;
    }

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
                            <div className="form-group">
                                <label htmlFor="password">New Password (leave blank to keep current)</label>
                                <input
                                    type="password"
                                    className="form-control form-control-sm"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm New Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-sm"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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