// Home.js
import React, { useEffect, useState } from "react";
import { AuthGuard } from "../../config/Guard";
import { CardTable } from "../../components/CardTable";
import { useAxios } from "../../config/hooks";
import { Card } from "../../components/Card";

export default function Home() {
  const axios = useAxios();
  const [load, setLoad] = useState(true);
  const [newest, setNewest] = useState();
  const [pendaftar, setPendaftar] = useState({
    today: 0,
    all: 0,
  });

  useEffect(() => {
    axios
      .get("/siswa?sort=desc")
      .then((res) => {
        setNewest(res.data.data.slice(0, 3));

        const todayLength = () => {
          const today = new Date().toISOString().split("T")[0];
          return res.data.data.filter((item) => {
            const itemDate = new Date(item.created_at)
              .toISOString()
              .split("T")[0];
            return itemDate === today;
          }).length; // Mengembalikan panjang array (jumlah elemen)
        };

        setPendaftar({ today: todayLength(), all: res.data.data.length });
      })
      .catch((err) => window.location.reload())
      .finally(() => {
        setLoad(false);
      });
  }, []);
  return (
    <>
    <div className="ml-10">
      <h1 className="text-2xl">Selamat Datang, Admin</h1>
      <p>Ini adalah halaman Dashboard!</p>
    </div>

      <div className="md:grid md:grid-cols-3 gap-5 py-4 flex flex-col max-w-max">
        {load ? (
          <>Loading...</>
        ) : (
          <>
            <div className="flex gap-3">
              <Card title="Total Jumlah Pendaftar" digit={pendaftar.all} />
              <Card title="Pendaftar Hari ini" digit={pendaftar.today} />
            </div>
            <CardTable title="Pendaftar Terbaru" data={newest} />
          </>
        )}
      </div>
    </>
  );
}
