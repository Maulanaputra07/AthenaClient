import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import { useAxios } from "../../config/hooks";

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState("");

  const beaxios = useAxios();


  const handleScan = (result) => {

    
    if (result) {
      beaxios.post(`/siswa/${result.text}`).then(res => {
        Sw
      })  
      setScanResult(result.text); // Get the scanned QR code text
    }
  };

  const handleError = (err) => {
    console.error("QR Scan Error: ", err);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h1>QR Code Scanner</h1>
      <div className="flex items-center justify-center bg-blue-300 p-5 rounded max-w-max">
        <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            facingMode="environment" // Menggunakan kamera belakang
            style={{ width: "100%" }}
            />
      </div>
          <p className="text-xl bg-red">Dibawah adalah kodenya</p>
      {scanResult && (
        <div>
          {/* <h2>Scanned QR Code:</h2> */}
          <p className="text-xl bg-yellow-light p-4 rounded">{scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
