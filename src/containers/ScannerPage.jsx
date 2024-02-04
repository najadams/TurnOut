import React from 'react'
import QRScanner from '../components/QRScanner'
import './ScannerPage.css'

const ScannerPage = () => {
  return (
    <div>
      <h3 style={{textAlign: 'center'}}>Scan the QR code to take your Attendance</h3>
      <div className="scannerContainer">
        <QRScanner />
      </div>
    </div>
  );
}

export default ScannerPage