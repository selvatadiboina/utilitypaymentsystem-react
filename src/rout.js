
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import Home from './home';
import LandingPage from './landing';
import ManageBill from './ManageBill';
import EditBill from './EditBill';
import PaymentModal from './PaymentModal';
import AdminHome from './AdminHome';
import Dashboard from './DashBoard';

const Rout = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/managebill" element={<ManageBill />} />
            <Route path="/editbill/:id" element={<EditBill />} />
            <Route path="/paymentmodel" element={<PaymentModal />} />
            <Route path="/adminhome" element={<AdminHome />} />
            {/* Add route for the Dashboard component */}
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
};

export default Rout;