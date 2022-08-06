import React, { Component, useState } from "react";
import QrReader from "react-qr-reader";
import SearchClient from "./SearchClient";

export default function QrCode() {
  const [result, setResult] = useState("");

  const HandleScan = (event) => {
    if (event) {
      setResult(event);
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
              <QrReader
                delay={300}
                onError={handleError}
                onScan={HandleScan}
                style={{ width: "60%" }}
              />
              {/* <p className="m-5">{`ClientID: ${result}`}</p> */}
            </section>
          </div>
          <div className="col-12 col-sm-7 d-flex align-items-center justify-content-center">
            <SearchClient result={result} />
          </div>
        </div>
      </div>
    </>
  );
}
