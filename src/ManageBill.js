import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, firestore } from './firebaseConfig';
import './managebill.css';

const ManageBill = ({ redirectHome }) => {
    const [billType, setBillType] = useState('');
    const [billPrice, setBillPrice] = useState('');
    const [bills, setBills] = useState([]);
    const [error, setError] = useState('');
    const [userLogin, setUserLogin] = useState('');

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const billsCollection = firestore.collection('Bills');
                    const snapshot = await billsCollection.where('userId', '==', user.uid).get();
                    const billsData = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setBills(billsData);
                }
            } catch (error) {
                console.error('Error fetching bills:', error);
            }
        };

        // Get the current user's login before @ symbol
        const user = auth.currentUser;
        if (user && user.email) {
            const atIndex = user.email.indexOf('@');
            if (atIndex !== -1) {
                setUserLogin(user.email.substring(0, atIndex));
            }
        }

        fetchBills();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            window.location.href = '/login';
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (!billType || !billPrice) {
            setError('Please fill in all fields.');
            return;
        }
        try {
            await firestore.collection('Bills').add({
                type: billType,
                price: billPrice,
                userId: auth.currentUser.uid // Assign the current user's ID to the bill
            });
            // Clear the form fields after successful submission
            setBillType('');
            setBillPrice('');
            
            // Fetch the updated list of bills
            const updatedBillsCollection = firestore.collection('Bills').where('userId', '==', auth.currentUser.uid);
            const updatedSnapshot = await updatedBillsCollection.get();
            const updatedBillsData = updatedSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBills(updatedBillsData);
        } catch (error) {
            console.error('Error adding bill:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await firestore.collection('Bills').doc(id).delete();
            const updatedBills = bills.filter(bill => bill.id !== id);
            setBills(updatedBills);
        } catch (error) {
            console.error('Error deleting bill:', error);
        }
    };

    return (
        <div>
            <nav className="navbar">
                <h1 className="company-name">BMS</h1>
                <ul>
                    <li><span>Welcome, {userLogin}</span></li>
                    <li><Link to="/home">Home</Link></li>
                    <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
                </ul>
            </nav>

            <div className="bill-content">
                <h2>Add New Bill</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='form-container'>
                        <input placeholder='Bill Type' type="text" value={billType} onChange={(e) => setBillType(e.target.value)} />
                    </div>
                    <div className='form-container'>
                        <input placeholder='Bill Price' type="number" value={billPrice} onChange={(e) => setBillPrice(e.target.value)} />
                    </div>
                    <button className='form-button' type="submit">Add Bill</button>
                </form>
                
                <h2>All Bills</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map(bill => (
                            <tr key={bill.id}>
                                <td>{bill.type}</td>
                                <td>{bill.price}</td>
                                <td>
                                    <Link to={`/editbill/${bill.id}`}>Edit</Link> | 
                                    <Link onClick={() => handleDelete(bill.id)}>Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBill;
