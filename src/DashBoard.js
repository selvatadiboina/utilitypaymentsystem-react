import React, { useEffect, useState } from 'react';
import { firestore } from './firebaseConfig';

const Dashboard = ({ currentUser }) => {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        if (currentUser) {
            fetchUserBills(currentUser.uid);
        }
    }, [currentUser]);

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

    return (
        <div>
            <h2>Dashboard</h2>
            <div>
                {/* Render summary of bills */}
                <h3>Total Bills: {bills.length}</h3>
                {/* Add more visualizations or metrics here */}
            </div>
            <div>
                {/* Render charts, graphs, or other visualizations */}
            </div>
        </div>
    );
}

export default Dashboard;
