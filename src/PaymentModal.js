import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import './paymentModal.css';

const PaymentModal = ({ selectedBill, onClose, onConfirmPayment }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handleConfirm = async () => {
    if (!name || !phoneNumber || !paymentMode) {
      alert('Please fill in all required fields');
      return;
    }

    await onConfirmPayment({ name, phoneNumber, paymentMode });

    setPaymentConfirmed(true);
    if (paymentMode === 'QR') {
      setQrGenerated(true);
    } else {
      setQrGenerated(false);
    }
  };

  const generateBillDetails = () => {
    if (paymentMode === 'QR') {
      return `Type: ${selectedBill.type}, Price: ${selectedBill.price}, Name: ${name}, Phone Number: ${phoneNumber}`;
    } else {
      return '';
    }
  };

  return (
    <div className="payment-modal">
      <div className="payment-modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Payment Details</h2>
        <div className="payment-details-box">
          <p><strong>Type:</strong> {selectedBill.type}</p>
          <p><strong>Price:</strong> {selectedBill.price}</p>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <label>Payment Mode:</label>
          <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
            <option value="">Select Payment Mode</option>
            <option value="QR">QR</option>
            <option value="Credit/Debit">Credit/Debit</option>
          </select>
          {paymentMode === 'QR' && (
            <div className="qr-code">
              <QRCode value={generateBillDetails()} />
              {qrGenerated && paymentConfirmed && <p>Thank you for your payment!</p>}
            </div>
          )}
          {paymentMode === 'Credit/Debit' && (
            <div>
              <label>Card Number:</label>
              <input type="text" />
              <label>Expiry Date:</label>
              <input type="text" />
              <label>CVV:</label>
              <input type="text" />
            </div>
          )}
        </div>
        <button onClick={handleConfirm}>Confirm Payment</button>
      </div>
    </div>
  );
};

export default PaymentModal;
