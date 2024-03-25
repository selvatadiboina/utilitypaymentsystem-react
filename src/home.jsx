import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, firestore } from './firebaseConfig';
import './home.css';
import PaymentModal from './PaymentModal'; // Import PaymentModal component

const Home = () => {
    const [bills, setBills] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); 
    const [billType, setBillType] = useState('');
    const [billPrice, setBillPrice] = useState('');
    const [selectedBill, setSelectedBill] = useState(null); // State to track the selected bill
    const [showPaymentModal, setShowPaymentModal] = useState(false); // State to control the visibility of the payment modal

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setCurrentUser(user);
                fetchUserBills(user.uid);
            } else {
                setCurrentUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchUserBills = async (userId) => {
        try {
            const billsCollection = firestore.collection('Bills');
            const snapshot = await billsCollection.where('userId', '==', userId).get();
            const billsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBills(billsData);
        } catch (error) {
            console.error('Error fetching user bills:', error);
        }
    };

    const getUsername = () => {
        if (currentUser && currentUser.email) {
            const atIndex = currentUser.email.indexOf('@');
            if (atIndex !== -1) {
                return currentUser.email.substring(0, atIndex);
            }
        }
        return '';
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            window.location.href = '/login';
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleAddBill = async (e) => {
        e.preventDefault();
        try {
            await firestore.collection('Bills').add({
                type: billType,
                price: billPrice,
                userId: currentUser.uid
            });
            setBillType('');
            setBillPrice('');
            fetchUserBills(currentUser.uid);
        } catch (error) {
            console.error('Error adding bill:', error);
        }
    };

    const handlePay = (bill) => {
        setSelectedBill(bill); // Set the selected bill
        setShowPaymentModal(true); // Show the payment modal
    };

    const handleConfirmPayment = (paymentDetails) => {
        console.log('Payment details:', paymentDetails);
        setShowPaymentModal(false); // Close the payment modal
    };

    return (
        <div>
            <nav className="navbar">
                <h1 className="company-name">BMS</h1>
                <ul>
                    <li><Link to="/managebill">Manage Bill</Link></li>
                    <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
                </ul>
            </nav>
            <div className="content">
                <h2>Hello {currentUser ? <span>{getUsername()}</span> : null}! <br/>Streamline Your Finances, Seamlessly Manage Bills.</h2>
                <div className='bill-container'>
                    <div className="box-container">
                        {/* Render the "Add New Bill" section only if there are no bills */}
                        {bills.length === 0 && (
                            <div className="bill-box">
                                <h3>Add New Bill:</h3>
                                <form onSubmit={handleAddBill}>
                                    <div>
                                        <label>Bill Type:</label>
                                        <input type="text" value={billType} onChange={(e) => setBillType(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Bill Price:</label>
                                        <input type="number" value={billPrice} onChange={(e) => setBillPrice(e.target.value)} />
                                    </div>
                                    <button type="submit">Add Bill</button>
                                </form>
                            </div>
                        )}
                        {/* Render existing bills */}
                        {bills.map(bill => (
                            <div className="bill-box" key={bill.id}>
                                <h3>{bill.type}</h3>
                                <p><strong>Price:</strong> {bill.price}</p>
                                <button onClick={() => handlePay(bill)}>Pay</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Payment Modal */}
            {showPaymentModal && (
                <PaymentModal
                    selectedBill={selectedBill}
                    onClose={() => setShowPaymentModal(false)}
                    onConfirmPayment={handleConfirmPayment}
                />
            )}
        </div>
    );
}

export default Home;
