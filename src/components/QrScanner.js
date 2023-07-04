import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import SearchClient from './SearchClient';
import useStore from '../context/store';

export default function QrCode() {
  const [scanResult, setScanResult] = useState('');
  const setClientId = useStore((state) => state.setClientId);

  const HandleScan = (event) => {
    if (event) {
      setScanResult(event);
      setClientId(event); // establecer el clientId en el store
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <>
      <div className="container mt-3 ">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-12 col-sm-7 ">
            <section className="qrcode d-flex align-items-center justify-content-center">
              <QrReader delay={300} onError={handleError} onScan={HandleScan} style={{ width: '60%' }} />
            </section>
          </div>
          <div className="col-12 col-sm-7 d-flex align-items-center justify-content-center">
            <SearchClient result={scanResult} />
          </div>
        </div>
      </div>
    </>
  );
}
