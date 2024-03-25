import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { firestore } from './firebaseConfig';

const EditBill = () => {
    const { id } = useParams();
    const [billType, setBillType] = useState('');
    const [billPrice, setBillPrice] = useState('');

    useEffect(() => {
        const fetchBillDetails = async () => {
            try {
                const billRef = firestore.collection('Bills').doc(id);
                const doc = await billRef.get();
                if (doc.exists) {
                    const billData = doc.data();
                    setBillType(billData.type);
                    setBillPrice(billData.price);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching bill details:', error);
            }
        };

        fetchBillDetails();

    }, [id]);

    const handleEditBill = async (e) => {
        e.preventDefault();
        try {
            const billRef = firestore.collection('Bills').doc(id);
            const doc = await billRef.get();
            if (doc.exists) {
                const billData = doc.data();
                const userId = billData.userId;
                await billRef.update({
                    type: billType,
                    price: billPrice
                });
                window.location.href = `/managebill/${userId}`;
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error updating bill:', error);
        }
    };

    return (
        <div>
            <nav className="navbar">
                <h1 className="company-name">BMS</h1>
                <ul>
                    <li><Link to="/managebill">Manage Bill</Link></li>
                </ul>
            </nav>
            <div className="content">
                <h2>Edit Bill</h2>
                <form className="edit-form" onSubmit={handleEditBill}>
                    <div className="form-group">
                        <label htmlFor="billType">Bill Type:</label>
                        <input
                            type="text"
                            id="billType"
                            value={billType}
                            onChange={(e) => setBillType(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="billPrice">Bill Price:</label>
                        <input
                            type="number"
                            id="billPrice"
                            value={billPrice}
                            onChange={(e) => setBillPrice(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="save-btn">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default EditBill;
