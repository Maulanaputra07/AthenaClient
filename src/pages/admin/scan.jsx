import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import { useAxios } from "../../config/hooks";
import Swal from "sweetalert2";

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState("");
  const [load, setLoad] = useState(false)
  const beaxios = useAxios();

  const handleScan = (result) => {
    if (result?.text && result.text !== scanResult) {
      setScanResult(result.text); // Set hasil scan baru
      setLoad(true);
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
          setLoad(false)
        });
    }
  };

  const handleError = (err) => {
    console.error("QR Scan Error: ", err);
  };

  return (
    
    <div className="flex items-center justify-center flex-col w-full">
    {load && (
        <div className="fixed z-30 top-0 left-0 flex justify-center items-center w-screen h-screen bg-[rgba(0,0,0,0.5)]">
          <h1 className="text-black p-1 rounded-md shadow-md bg-white md:w-1/3 md:h-1/3 w-1/2 h-1/3 text-center flex items-center justify-center md:text-2xl text-md font-semibold">Tunggu sebentar, data anda sedang diproses</h1>
        </div>
      )}
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
