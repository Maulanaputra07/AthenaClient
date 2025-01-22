import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import { useAxios } from "../../config/hooks";
import Swal from "sweetalert2";

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState("");
  const [scanning, setScanning] = useState(true);

  const beaxios = useAxios();

  const handleScan = (result) => {
    if (result && scanning) {
      setScanning(false);
      beaxios
        .post(`/siswa/verify`, { id: result.text })
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: `${res.data.message}`,
            icon: "success",
            timer: 1000,
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: `${err.response.data.message}`,
            icon: "error",
            timer: 1000,
          }).then(() => {
            window.location.reload();
          });
        })
        .finally(() => {
          setScanning(true);
        });
    }
  };

  const handleError = (err) => {
    console.error("QR Scan Error: ", err);
  };

  return (
    <div className="flex items-center justify-center flex-col w-full">
      <h1 className="py-4 text-xl">Scan QR yang dikirimkan lewat email Siswa</h1>
      <div className="flex items-center justify-center w-full rounded max-w-[40em]">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          // facingMode="environment" // Menggunakan kamera belakang
          style={{ width: "100%", }}
        />
      </div>
    </div>
  );
};

export default QRCodeScanner;
