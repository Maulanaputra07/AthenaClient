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

import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { useAxios } from "../../config/hooks";
import {
  GraduationCap,
  IdentificationCard,
  MapPin,
  CalendarDots,
  DeviceMobile,
  UserCircle,
} from "@phosphor-icons/react";

export default function Siswa() {
  const beaxios = useAxios();
  const [load, setLoad] = useState(true);
  const [siswas, setSiswa] = useState();
  const [errors, setErrors] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [detailSiswa, setDetailSiswa] = useState();
  const [jurusans, setJurusans] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSekolah, setSelectedSekolah] = useState("");
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const handleSelect = (item) => {
    console.log(item);
    setSelectedSekolah(item);
    setIsOpen(false);
  };

  // if (showPopup) {
  //   console.log("showPopup");
  // }

  function popUp(e){
    setShowPopup(!showPopup)
    console.log(e.target.value);
    beaxios
      .get(`/siswa/${e.target.value}`)
      .then((res) => {
        setDetailSiswa(res.data.data);
        console.log(res.data.data);
      })
  }

  function handleChange(e) {
    setDetailSiswa({ ...detailSiswa, [e.target.name]: e.target.value });
  }

  function handleDeleteSiswa(e){
    console.log(e.target.value);
    Swal.fire({
      title: "Yakin Ingin Menghapus data siswa ini?",
      text: "data siswa yang hilang tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if(result.isConfirmed){
        beaxios
        .delete(`/siswa/${e.target.value}`)
        .then((res) => {
          Swal.fire({
            title: "Deleted!",
            text: "Berhasil menghapus data siswa",
            icon: "success"
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Error!",
            text: err.response?.data.errors,
            icon: "error",
            confirmButtonText: "Tutup"
          })
        })
      }
    })
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

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

    beaxios.get("/jurusans").then((res) => {
      setJurusans(res.data.data);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="ml-10 pb-3 md:mt-2 mt-4 text-lg font-semibold">
          Halaman siswa
        </h1>
        <div className="flex gap-2">
          <input type="text" className="border border-black text-black p-2 rounded" placeholder="Search"/>
          <button className="bg-green-500 p-1.5 rounded border border-green-500">Export Excel</button>
          <select name="" id="" className="border rounded w-24 text-center">
            <option value="">All</option>
            <option value="">Verify</option>
            <option value="">Unverify</option>
          </select>
        </div>
        {/* <button onClick={() => setShowPopup(!showPopup)} className="bg-green-400 p-2 m-2 rounded-md">Tambah siswa</button> */}
      </div>

      <div className="table-container w-full overflow-x-auto">
        {load ? (
          <>Loading...</>
        ) : (
          <table className="border-collapse border min-w-full mt-5">
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
                <th className="border border-main_dark bg-gray">NISN</th>
                <th className="border border-main_dark bg-gray">NIK</th>
                <th className="border border-main_dark bg-gray">
                  Tempat Lahir
                </th>
                <th className="border border-main_dark bg-gray">
                  Tanggal Lahir
                </th>
                <th className="border border-main_dark bg-gray">
                  Jenis Kelamin
                </th>
                <th className="border border-main_dark bg-gray">Agama</th>
                <th className="border border-main_dark bg-gray">Alamat</th>
                <th className="border border-main_dark bg-gray">No Telp.</th>
                <th className="border border-main_dark bg-gray">
                  Asal Sekolah
                </th>
                <th className="border border-main_dark bg-gray">
                  No.Telp. Ortu
                </th>
                <th className="border border-main_dark bg-gray">Ayah</th>
                <th className="border border-main_dark bg-gray">Ibu</th>
                <th className="border border-main_dark bg-gray">
                  Pekerjaan Ayah
                </th>
                <th className="border border-main_dark bg-gray">
                  Pekerjaan Ibu
                </th>
                <th className="border border-main_dark bg-gray">Jurusan</th>
                <th className="border border-main_dark bg-white sticky right-0 z-10">
                  Action
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
                    <td className="border border-main_dark whitespace-nowrap bg-white px-3 sticky right-0">
                      <button
                        onClick={popUp}
                        className="bg-orange-400 p-2 m-1 rounded-md"
                        value={siswa.id}
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleDeleteSiswa}
                        className="bg-red p-2 m-1 rounded-md"
                        value={siswa.id}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

        {showPopup && (
          <>
            <div className="fixed inset-0 bg-black/50 backdrop:blur-sm z-10"></div>

            <div className="absolute z-20 top-0 m-5 md:right-[25%] left-0 md:left-[25%] md:w-[50%] w-[90%] bg-white rounded-md shadow-md">
              <h1 className="p-3 font-semibold">EDIT SISWA</h1>
              <div className="flex flex-col justify-between px-4">
                <form className="bg-white p-6 mb-4">
                  <div className="overflow-y-auto">
                    <div className="step1 flex flex-col justify-between">
                      <div>
                        {/* Nama */}
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="name"
                          >
                            Nama
                          </label>
                          <div className="input-group flex items-center justify-center">
                            <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                              <GraduationCap size={24} color="grey" />
                            </span>
                            <input
                              className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="name"
                              name="name"
                              type="text"
                              placeholder="Nama"
                              value={detailSiswa?.name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        {/* NISN */}
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="NISN"
                          >
                            NISN
                          </label>
                          <div className="input-group flex items-center justify-center">
                            <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                              <IdentificationCard size={24} color="grey" />
                            </span>
                            <input
                              inputMode="numeric"
                              className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="NISN"
                              type="text"
                              name="nisn"
                              placeholder="NISN"
                              value={detailSiswa?.nisn}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        {/* nik */}
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="NIK"
                          >
                            NIK
                          </label>
                          <div className="input-group flex items-center justify-center">
                            <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                              <IdentificationCard size={24} color="grey" />
                            </span>
                            <input
                              inputMode="numeric"
                              className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="NIK"
                              type="text"
                              placeholder="NIK"
                              name="nik"
                              value={detailSiswa?.nik}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div className="flex items-center justify-end pt-5">
                          <button
                            className="bg-[#5e72e4] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                          >
                            Next
                          </button>
                        </div> */}
                    </div>
                    <div className="step2 flex flex-col justify-between">
                      <div>
                        {/* tempat lahir */}
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="tempatLahir"
                          >
                            Tempat Lahir
                          </label>
                          <div className="input-group flex items-center justify-center">
                            <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                              <MapPin size={24} color="grey" />
                            </span>
                            <input
                              className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="tempatLahir"
                              type="text"
                              placeholder="Tempat Lahir"
                              name="tempat_lahir"
                              value={detailSiswa?.tempat_lahir}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        {/* tanggal lahir */}
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="tanggalLahir"
                          >
                            Tanggal Lahir
                          </label>
                          <div className="input-group flex items-center justify-center">
                            <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                              <CalendarDots size={26} color="grey" />
                            </span>
                            <input
                              className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="tanggalLahir"
                              type="date"
                              placeholder="Tanggal Lahir"
                              name="tanggal_lahir"
                              value={detailSiswa?.tanggal_lahir}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        {/* jenis kelamin */}
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="jenisKelamin"
                          >
                            Jenis Kelamin
                          </label>
                          <div className="input-group flex items-center justify-center">
                            <select
                              value={detailSiswa?.jenis_kelamin}
                              onChange={handleChange}
                              name="jenis_kelamin"
                              className="w-full border-1 shadow p-2"
                              id="jenisKelamin"
                            >
                              <option
                                name=""
                                id="1"
                                value="laki-laki"
                                className="text-sm"
                              >
                                Laki-laki
                              </option>
                              <option
                                name=""
                                id="0"
                                value="perempuan"
                                className="text-sm"
                              >
                                Perempuan
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* <div className="flex items-center justify-between">
                          <button
                            // onClick={prevStep}
                            className="bg-white hover:bg-[#F1F1F1] text-[#5e72e4] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                          >
                            Back
                          </button>
                          <button
                            // onClick={nextStep}
                            className="bg-[#5e72e4] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                          >
                            Next
                          </button>
                        </div> */}
                    </div>
                    <div className="step3">
                      {/* agama */}
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="agama"
                        >
                          Agama
                        </label>
                        <div className="input-group flex items-center justify-center">
                          <select
                            value={detailSiswa?.agama}
                            onChange={handleChange}
                            name="agama"
                            className="w-full border-1 rounded shadow p-2"
                            id="agama"
                          >
                            <option name="" id="" value="Islam">
                              Islam
                            </option>
                            <option name="" id="" value="Kristen">
                              Kristen
                            </option>
                            <option name="" id="" value="Katolik">
                              Katolik
                            </option>
                            <option name="" id="" value="Hindu">
                              Hindu
                            </option>
                            <option name="" id="" value="Budha">
                              Budha
                            </option>
                            <option name="" id="" value="Khonghucu">
                              Khonghucu
                            </option>
                          </select>
                        </div>
                      </div>
                      {/* alamat calon peserta */}
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="alamat"
                        >
                          Alamat lengkap
                        </label>
                        <div className="input-group flex items-center justify-center">
                          <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                            <MapPin size={24} color="grey" />
                          </span>
                          <input
                            className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="alamat"
                            type="teks"
                            placeholder="Alamat lengkap"
                            name="alamat_lengkap"
                            value={detailSiswa?.alamat_lengkap}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      {/* no peserta */}
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="noTlp"
                        >
                          No telp/WA calon peserta didik
                        </label>
                        <div className="input-group flex items-center justify-center">
                          <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                            <DeviceMobile size={24} color="grey" />
                          </span>
                          <input
                            className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="noTlp"
                            type="text"
                            name="no_telepon"
                            value={detailSiswa?.no_telepon}
                            onChange={handleChange}
                            placeholder="No telp/WA calon peserta didik"
                          />
                        </div>
                      </div>
                      {/* no tlp ortu */}
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="noTlpOrtu"
                        >
                          No telp/WA orang tua
                        </label>
                        <div className="input-group flex items-center justify-center">
                          <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                            <DeviceMobile size={24} color="grey" />
                          </span>
                          <input
                            className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="noTlpOrtu"
                            type="text"
                            name="no_telepon_ortu"
                            value={detailSiswa.ortu?.no_telepon}
                            onChange={handleChange}
                            placeholder="No telp/WA orang tua"
                          />
                        </div>
                      </div>
                      {/* <div className="flex items-center justify-between">
                          <button
                            // onClick={prevStep}
                            className="bg-white hover:bg-[#F1F1F1] text-[#5e72e4] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                          >
                            Back
                          </button>
                          <button
                            // onClick={nextStep}
                            className="bg-[#5e72e4] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                          >
                            Next
                          </button>
                        </div> */}
                    </div>
                    <div className="step4">
                      {/* Nama ayah kandung */}
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="ayah"
                        >
                          Nama ayah kandung
                        </label>
                        <div className="input-group flex items-center justify-center">
                          <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                            <UserCircle size={24} color="grey" />
                          </span>
                          <input
                            className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="ayah"
                            type="text"
                            name="nama_ayah"
                            value={detailSiswa.ortu?.nama_ayah}
                            // onChange={handleChange}
                            placeholder="Nama ayah kandung"
                          />
                        </div>
                      </div>
                      {/* Nama ibu kandung */}
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="ibu"
                        >
                          Nama ibu kandung
                        </label>
                        <div className="input-group flex items-center justify-center">
                          <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                            <UserCircle size={24} color="grey" />
                          </span>
                          <input
                            className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="ibu"
                            type="text"
                            name="nama_ibu"
                            value={detailSiswa.ortu?.nama_ibu}
                            // onChange={handleChange}
                            placeholder="Nama ibu kandung"
                          />
                        </div>
                      </div>
                      {/* Pekerjaan ayah */}
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="pekerjaanAyah"
                        >
                          Pekerjaan ayah
                        </label>
                        <div className="input-group flex items-center justify-center">
                          <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                            <UserCircle size={24} color="grey" />
                          </span>
                          <input
                            className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="pekerjaanAyah"
                            type="text"
                            placeholder="Pekerjaan ayah"
                            name="pekerjaan_ayah"
                            value={detailSiswa.ortu?.pekerjaan_ayah}
                            // onChange={handleChange}
                          />
                        </div>
                      </div>
                      {/* Pekerjaan ibu */}
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="pekerjaanIbu"
                        >
                          Pekerjaan ibu
                        </label>
                        <div className="input-group flex items-center justify-center">
                          <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                            <UserCircle size={24} color="grey" />
                          </span>
                          <input
                            className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="pekerjaanIbu"
                            type="teks"
                            placeholder="Pekerjaan ibu"
                            name="pekerjaan_ibu"
                            value={detailSiswa.ortu?.pekerjaan_ibu}
                            // onChange={handleChange}
                          />
                        </div>
                      </div>
                      {/* <div className="flex items-center justify-between">
                          <button
                            // onClick={prevStep}
                            className="bg-white hover:bg-[#F1F1F1] text-[#5e72e4] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                          >
                            Back
                          </button>
                          <button
                            // onClick={nextStep}
                            className="bg-[#5e72e4] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                          >
                            Next
                          </button>
                        </div> */}
                    </div>
                    <div className="step5 flex flex-col justify-between">
                      <div>
                        {/* Asal smp/mts */}
                        <div className="mb-4">
                          <p
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="asalSekolah"
                          >
                            Asal sekolah (SMP/MTs)
                          </p>
                          <div className="input-group flex items-center justify-center">
                            {/* <div
                              className="relative w-full border rounded shadow p-2 text-sm cursor-pointer"
                              onClick={() => setIsOpen(true)}
                              ref={searchRef}
                            >
                              {selectedSekolah || "Pilih sekolah"}
                            </div> */}

                                <input
                                  type="text"
                                  placeholder="Asal sekolah"
                                  className="w-full border-2 px-2 py-2 bg-white shadow-bottom-only rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  name="asal_sekolah"
                                  value={detailSiswa?.asal_sekolah}
                                />
                              
                            {/* {isOpen && (
                            )} */}
                          </div>
                          {errors?.asal_sekolah && (
                            <span className="text-red">{errors?.asal_sekolah}</span>
                          )}
                        </div>
                        {/* Jurusan */}
                        <div className="mb-6">
                          <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="jurusan"
                          >
                            Pilih paket keahlian
                          </label>
                          <div className="input-group flex items-center justify-center">
                            <select
                              name="jurusan_id"
                              value={detailSiswa?.jurusan_id}
                              onChange={handleChange}
                              className="w-full border-1 rounded shadow p-2 text-sm"
                              id="jurusan"
                            >
                              {jurusans &&
                                jurusans?.map((jurusan, i) => (
                                  <option value={jurusan.id} key={i}>
                                    {jurusan.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full justify-between">
                    <button
                      onClick={() => setShowPopup(!showPopup)}
                      className="p-3 text-b rounded-md  bg-white hover:bg-[#F1F1F1] text-[#5e72e4]"
                    >
                      Kembali
                    </button>
                    <button
                      onClick={() => setShowPopup(!showPopup)}
                      className="p-3 text-b rounded-md bg-[#5e72e4] hover:bg-blue-700 text-white"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
    </div>
  );
}
