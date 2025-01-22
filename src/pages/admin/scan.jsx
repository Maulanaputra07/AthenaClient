import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import { useAxios } from "../../config/hooks";
import Swal from "sweetalert2";

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState("");
  const beaxios = useAxios();

  const handleScan = (result) => {
    if (result?.text && result.text !== scanResult) {
      setScanResult(result.text); // Set hasil scan baru
      beaxios
        .post(`/siswa/verify`, { id: result.text })
        .then((res) => {
          Swal.fire({
            title: `${res.data.message}`,
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => window.location.reload());
        })
        .catch((err) => {
          Swal.fire({
            title: `${err.response?.data?.message || "Terjadi kesalahan"}`,
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => window.location.reload());
        })
        .finally(() => {
          setTimeout(() => setScanResult(""), 2000); // Reset scanResult untuk memungkinkan scan berikutnya
        });
    }
  };

  const handleError = (err) => {
    console.error("QR Scan Error: ", err);
  };

  return (
    <div className="flex items-center justify-center flex-col w-full">
      <h1 className="py-4 text-xl">Scan QR Verifikasi</h1>
      <div className="flex items-center justify-center w-full rounded max-w-[40em]">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default QRCodeScanner;
