// import React, { useEffect, useState } from "react";
// import { useAxios } from "../../config/hooks";

// export default function Siswa() {
//   const beaxios = useAxios();
//   const [load, setLoad] = useState(true);
//   const [siswas, setSiswa] = useState();

//   useEffect(() => {
//     beaxios
//       .get("/siswa")
//       .then((res) => {
//         setSiswa(res.data.data);
//       })
//       .catch((err) => {
//         console.error(err);
//       })
//       .finally(() => {
//         setLoad(false);
//       });
//   }, []);

//   return (
//     <div>
//       <h1 className="pb-3">Halaman siswa</h1>

//       <div className="table-container w-full overflow-x-scroll">
//         {load ? (
//           <>Loading...</>
//         ) : (
//           <table className="border-collapse border ">
//             <thead>
//               <tr>
//                 <th className="border border-main_dark bg-gray">
//                   No.
//                 </th>
//                 <th className="border border-main_dark bg-gray">
//                   Nama
//                 </th>
//                 <th className="border border-main_dark bg-gray">
//                   NISN
//                 </th>
//                 <th className="border border-main_dark bg-gray">
//                   NIK
//                 </th>
//                 <th className="border border-main_dark bg-gray">
//                   Tempat Lahir
//                 </th>
//                 <th className="border border-main_dark bg-gray">
//                   Tanggal Lahir
//                 </th>
//                 <th className="border border-main_dark bg-gray">
//                   Jenis Kelamin
//                 </th>
//                 <th className="border border-main_dark bg-gray">
//                   Agama
//                 </th>
//                 <th className="border border-main_dark bg-gray">
//                   Alamat
//                 </th>
//                 <th className="border border-main_dark bg-gray">
//                   No Telp.
//                 </th>
//                 <th className="border border-main_dark bg-gray">
//                   Asal Sekolah
//                 </th>
//                 <th className="border border-main_dark bg-gray">
//                   No.Telp. Ortu
//                 </th>
//                 <th className="border border-main_dark bg-gray">
//                   Ayah
//                 </th>
//                 <th className="border border-main_dark bg-gray">
//                   Ibu
//                 </th>
//                 <th className="border border-main_dark bg-gray">
//                   Pekerjaan Ayah
//                 </th>
//                 <th className="border border-main_dark bg-gray">
//                   Pekerjaan Ibu
//                 </th>
//                 <th className="border border-main_dark bg-gray">
//                   Jurusan
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {siswas &&
//                 siswas.map((siswa, i) => (
//                   <tr>
//                     <td className="border border-main_dark whitespace-nowrap px-3">
//                       {i + 1}
//                     </td>
//                     <td className="border border-main_dark whitespace-nowrap px-3">
//                       {siswa.name}
//                     </td>
//                     <td className="border border-main_dark whitespace-nowrap px-3">
//                       {siswa.nisn}
//                     </td>
//                     <td className="border border-main_dark whitespace-nowrap px-3">
//                       {siswa.nik}
//                     </td>
//                     <td className="border border-main_dark whitespace-nowrap px-3">
//                       {siswa.tempat_lahir}
//                     </td>
//                     <td className="border border-main_dark whitespace-nowrap px-3">
//                       {siswa.tanggal_lahir}
//                     </td>
//                     <td className="border border-main_dark whitespace-nowrap px-3">
//                       {siswa.jenis_kelamin ? "L" : "P"}
//                     </td>
//                     <td className="border border-main_dark whitespace-nowrap px-3">
//                       {siswa.agama}
//                     </td>
//                     <td className="border border-main_dark whitespace-nowrap px-3">
//                       {siswa.alamat_lengkap}
//                     </td>
//                     <td className="border border-main_dark whitespace-nowrap px-3">
//                       {siswa.no_telepon}
//                     </td>
//                     <td className="border border-main_dark whitespace-nowrap px-3">
//                       {siswa.asal_sekolah}
//                     </td>
//                     <td className="border border-main_dark whitespace-nowrap px-3">
//                       {siswa.ortu.no_telepon}
//                     </td>
//                     <td className="border border-main_dark whitespace-nowrap px-3">
//                       {siswa.ortu.nama_ayah}
//                     </td>
//                     <td className="border border-main_dark whitespace-nowrap px-3">
//                       {siswa.ortu.nama_ibu}
//                     </td>
//                     <td className="border border-main_dark whitespace-nowrap px-3">
//                       {siswa.ortu.pekerjaan_ayah}
//                     </td>
//                     <td className="border border-main_dark whitespace-nowrap px-3">
//                       {siswa.ortu.pekerjaan_ibu}
//                     </td>
//                     <td className="border border-main_dark whitespace-nowrap px-3">
//                       {siswa.jurusan}
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useAxios } from "../../config/hooks";

export default function Siswa() {
  const beaxios = useAxios();
  const [load, setLoad] = useState(true);
  const [siswas, setSiswa] = useState();

  useEffect(() => {
    beaxios
      .get("/siswa")
      .then((res) => {
        setSiswa(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

  return (
    <div>
      <h1 className="pb-3">Halaman siswa</h1>

      <div className="table-container w-full overflow-x-auto">
        {load ? (
          <>Loading...</>
        ) : (
          <table className="border-collapse border min-w-full">
            <thead>
              <tr>
                <th
                  className="border border-main_dark bg-gray sticky left-0 z-10"
                  style={{ width: "50px" }}
                >
                  No.
                </th>
                <th
                  className="border border-main_dark bg-gray sticky left-8 z-10"
                  style={{ width: "200px" }}
                >
                  Nama
                </th>
                <th className="border border-main_dark bg-gray">
                  NISN
                </th>
                <th className="border border-main_dark bg-gray">
                  NIK
                </th>
                <th className="border border-main_dark bg-gray">
                  Tempat Lahir
                </th>
                <th className="border border-main_dark bg-gray">
                  Tanggal Lahir
                </th>
                <th className="border border-main_dark bg-gray">
                  Jenis Kelamin
                </th>
                <th className="border border-main_dark bg-gray">
                  Agama
                </th>
                <th className="border border-main_dark bg-gray">
                  Alamat
                </th>
                <th className="border border-main_dark bg-gray">
                  No Telp.
                </th>
                <th className="border border-main_dark bg-gray">
                  Asal Sekolah
                </th>
                <th className="border border-main_dark bg-gray">
                  No.Telp. Ortu
                </th>
                <th className="border border-main_dark bg-gray">
                  Ayah
                </th>
                <th className="border border-main_dark bg-gray">
                  Ibu
                </th>
                <th className="border border-main_dark bg-gray">
                  Pekerjaan Ayah
                </th>
                <th className="border border-main_dark bg-gray">
                  Pekerjaan Ibu
                </th>
                <th className="border border-main_dark bg-gray">
                  Jurusan
                </th>
              </tr>
            </thead>
            <tbody>
              {siswas &&
                siswas.map((siswa, i) => (
                  <tr key={i}>
                    <td
                      className="border border-main_dark whitespace-nowrap px-3 sticky left-0 bg-white"
                      style={{ width: "50px" }}
                    >
                      {i + 1}
                    </td>
                    <td
                      className="border border-main_dark whitespace-nowrap px-3 sticky left-8 bg-white"
                      style={{ width: "200px" }}
                    >
                      {siswa.name}
                    </td>
                    <td className="border border-main_dark whitespace-nowrap px-3">
                      {siswa.nisn}
                    </td>
                    <td className="border border-main_dark whitespace-nowrap px-3">
                      {siswa.nik}
                    </td>
                    <td className="border border-main_dark whitespace-nowrap px-3">
                      {siswa.tempat_lahir}
                    </td>
                    <td className="border border-main_dark whitespace-nowrap px-3">
                      {siswa.tanggal_lahir}
                    </td>
                    <td className="border border-main_dark whitespace-nowrap px-3">
                      {siswa.jenis_kelamin ? "L" : "P"}
                    </td>
                    <td className="border border-main_dark whitespace-nowrap px-3">
                      {siswa.agama}
                    </td>
                    <td className="border border-main_dark whitespace-nowrap px-3">
                      {siswa.alamat_lengkap}
                    </td>
                    <td className="border border-main_dark whitespace-nowrap px-3">
                      {siswa.no_telepon}
                    </td>
                    <td className="border border-main_dark whitespace-nowrap px-3">
                      {siswa.asal_sekolah}
                    </td>
                    <td className="border border-main_dark whitespace-nowrap px-3">
                      {siswa.ortu.no_telepon}
                    </td>
                    <td className="border border-main_dark whitespace-nowrap px-3">
                      {siswa.ortu.nama_ayah}
                    </td>
                    <td className="border border-main_dark whitespace-nowrap px-3">
                      {siswa.ortu.nama_ibu}
                    </td>
                    <td className="border border-main_dark whitespace-nowrap px-3">
                      {siswa.ortu.pekerjaan_ayah}
                    </td>
                    <td className="border border-main_dark whitespace-nowrap px-3">
                      {siswa.ortu.pekerjaan_ibu}
                    </td>
                    <td className="border border-main_dark whitespace-nowrap px-3">
                      {siswa.jurusan}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
