// Home.js
import React, { useEffect, useState } from "react";
import { AuthGuard } from "../../config/Guard";
import { CardTable } from "../../components/CardTable";
import { useAxios } from "../../config/hooks";

export default function Home() {
  const axios = useAxios();
  const [newest, setNewest] = useState();
  useEffect(() => {
    axios
      .get("/siswa?startIn=1&length=3")
      .then((res) => setNewest(res.data.data))
      .catch((err) => window.location.reload());
  }, []);
  return (
    <>
      <h1 className="text-2xl">Selamat Datang, Admin</h1>
      <p>Ini adalah halaman Dashboard!</p>

      <div className="grid grid-cols-3 gap-3 py-4">
        <CardTable title="Pendaftar Terbaru" data={newest} />
      </div>
    </>
  );
}
