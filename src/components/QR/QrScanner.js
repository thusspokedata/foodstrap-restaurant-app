import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import SearchClientByQr from './SearchClientByQr';
import useStore from '../../context/store';

export default function QrCode() {
  const [scanResult, setScanResult] = useState('');
  const { addClientId } = useStore((state) => ({
    addClientId: state.addClientId,
  }));

  const HandleScan = (event) => {
    if (event) {
      setScanResult(event);
      addClientId(event);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="container mt-3 ">
      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-12 col-sm-7 ">
          <section className="qrcode d-flex align-items-center justify-content-center">
            <QrReader delay={300} onError={handleError} onScan={HandleScan} style={{ width: '60%' }} />
          </section>
        </div>
        <div className="col-12 col-sm-7 d-flex align-items-center justify-content-center">
          <SearchClientByQr result={scanResult} />
        </div>
      </div>
    </div>
  );
}
