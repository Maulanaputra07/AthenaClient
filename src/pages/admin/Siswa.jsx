import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { getGenderText, getSheetName, useAxios } from "../../config/hooks";
import {
  GraduationCap,
  IdentificationCard,
  MapPin,
  CalendarDots,
  DeviceMobile,
  UserCircle,
  ArrowLeft,
  ArrowRight
} from "@phosphor-icons/react";
import * as XLSX from "xlsx";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import GeneratePDF from "../../templates/GeneratePDF";

export default function Siswa() {
  const beaxios = useAxios();
  const [load, setLoad] = useState(true);
  const [siswas, setSiswa] = useState();
  const [errors, setErrors] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [detailSiswa, setDetailSiswa] = useState();
  const [siswaPdf, setSiswaPdf] = useState();
  const [jurusans, setJurusans] = useState();
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const modalRef = useRef(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;


    const next = () => {
      if (active + itemsPerPage < siswas.length) {
        setActive((prevActive) => prevActive + itemsPerPage);
        setPage((prevPage) => prevPage + 1);
      }
    };

    const prev = () => {
      if (active > 0) {
        setActive((prevActive) => prevActive - itemsPerPage);
        setPage((prevPage) => Math.max(prevPage - 1, 1));
      }
    };

  const handleSelect = (item) => {
    console.log(item);
    setSelectedSekolah(item);
    setIsOpen(false);
  };

  function handleUpdateSiswa(e) {
    e.preventDefault();
    beaxios
      .put(`/siswa/${e.target.id.value}`, {
        name: e.target.name.value,
        nisn: e.target.nisn.value,
        nik: e.target.nik.value,
        tempat_lahir: e.target.tempat_lahir.value,
        tanggal_lahir: e.target.tanggal_lahir.value,
        jenis_kelamin:
          e.target.jenis_kelamin.value == "laki-laki" ? true : false,
        agama: e.target.agama.value,
        alamat_lengkap: e.target.alamat_lengkap.value,
        no_telepon: e.target.no_telepon.value,
        no_telepon_ortu: e.target.no_telepon_ortu.value,
        nama_ayah: e.target.nama_ayah.value,
        nama_ibu: e.target.nama_ibu.value,
        pekerjaan_ayah: e.target.pekerjaan_ayah.value,
        pekerjaan_ibu: e.target.pekerjaan_ibu.value,
        asal_sekolah: e.target.asal_sekolah.value,
        jurusan_id: e.target.jurusan_id.value,
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.message,
        }).then(() => window.location.reload());
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message,
        });
      })
      .finally(() => {
        setShowPopup(!showPopup);
      });
  }

  function popUp(e) {
    setShowPopup(!showPopup);
    console.log(e.target.value);
    beaxios.get(`/siswa/${e.target.value}`).then((res) => {
      setDetailSiswa(res.data.data);
      console.log(res.data.data);
    });
  }

  function handleChange(e) {
    setDetailSiswa({ ...detailSiswa, [e.target.name]: e.target.value });
  }

  function handleSearch(e) {
    beaxios
      .get(`/siswa?search=${e.target.value}`)
      .then((res) => {
        setSiswa(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoad(false);
      });
  }

  function handleVerifyFilter(e) {
    beaxios
      .get(`/siswa?verified=${e.target.value}`)
      .then((res) => {
        setSiswa(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoad(false);
      });
  }

  function handleDeleteSiswa(e) {
    Swal.fire({
      title: "Yakin Ingin Menghapus data siswa ini?",
      text: "data siswa yang hilang tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        beaxios
          .delete(`/siswa/${e.target.value}`)
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "Berhasil menghapus data siswa",
              icon: "success",
            }).then(() => {
              window.location.reload();
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: err.response?.data.errors,
              icon: "error",
              confirmButtonText: "Tutup",
            });
          });
      }
    });
  }

  const handleDownloadPdf = (e) => {
    beaxios.get(`/siswa/${e.target.value}`).then(res => setSiswaPdf(res.data.data)).catch(err => {

    })
  }

  const exportFilteredDataByJurusan = () => {
    const filteredData = siswas.filter((item) => item.status === 1);
  
    const groupedByJurusan = filteredData.reduce((groups, item) => {
      const { jurusan } = item;
      if (!groups[jurusan]) {
        groups[jurusan] = [];
      }
      groups[jurusan].push(item);
      return groups;
    }, {});
  
    const workbook = XLSX.utils.book_new();
  
    const columns = {
      id: "No.",
      name: "Nama Siswa",
      jurusan: "Program Studi",
      nisn: "NISN",
      nik: "NIK",
      tempat_lahir: "Tempat Lahir",
      tanggal_lahir: "Tanggal Lahir",
      jenis_kelamin: "Jenis Kelamin",
      agama: "Agama",
      alamat_lengkap: "Alamat",
      no_telepon: "No. Telepon",
      'ortu.no_telepon': "No. Telepon Ortu", 
      'ortu.nama_ayah': "Nama Ayah",
      'ortu.nama_ibu': "Nama Ibu",
      'ortu.pekerjaan_ayah': "Pekerjaan Ayah",
      'ortu.pekerjaan_ibu': "Pekerjaan Ibu",
      asal_sekolah: "Asal Sekolah",
      jurusan_id: "ID Jurusan",
    };
  
  
    for (const jurusan in groupedByJurusan) {
      const sheetName = getSheetName(jurusan);
      const sheetData = groupedByJurusan[jurusan];
  
      let customData = sheetData.map((item, index) => {
        let filteredItem = {};
        
        for (const [key, value] of Object.entries(columns)) {
          if (key === "id") {
            filteredItem[value] = index + 1;
          } else if (key === "jenis_kelamin") {
            filteredItem[value] = getGenderText(item[key]);
          } else if (key.includes("ortu.")) {
            const nestedKey = key.split('.')[1];
            filteredItem[value] = item.ortu ? item.ortu[nestedKey] : '';
          } else if (item[key] !== undefined) {
            filteredItem[value] = item[key];
          }
        }
        return filteredItem;
      });
  
      const worksheet = XLSX.utils.json_to_sheet(customData);
  
      const columnWidths = customData.reduce((widths, row) => {
        Object.keys(row).forEach((key, index) => {
          const cellValue = row[key] ? row[key].toString() : '';
          const columnWidth = Math.max(cellValue.length, widths[index] || 0);
          widths[index] = columnWidth;
        });
        return widths;
      }, []);
  
      worksheet['!cols'] = columnWidths.map((width) => ({ wch: width }));
  
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    }
  
    XLSX.writeFile(workbook, "CalonSiswa.xlsx");
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // document.addEventListener("mousedown", handleClickOutside);

    beaxios
      .get(`/siswa?sort=desc`)
      .then((res) => {
        setSiswa(res.data.data);
        setTotal(res.data.data.length);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoad(false);
      });

      beaxios
      .get(`/jurusans`)
      .then((res) => {
        setJurusans(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoad(false);
      });
  }, [active]);

  return (
    <div>
      <h1 className="ml-10 pb-3 md:mt-2 mt-4 text-lg font-semibold">
        Halaman siswa
      </h1>
      <div className="flex justify-end items-center">
        <div className="flex gap-2">
          <input
            type="text"
            className="border border-black text-black p-2 rounded"
            placeholder="Search by NIK"
            onChange={handleSearch}
          />
          <button
            onClick={exportFilteredDataByJurusan}
            className="bg-green-500 p-1.5 rounded border border-green-500"
          >
            Export Excel
          </button>
          <select
            name=""
            id=""
            onInput={handleVerifyFilter}
            className="border rounded w-24 text-center"
          >
            <option value="all">All</option>
            <option value="true">Verify</option>
            <option value="false">Unverify</option>
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
                <th className="border border-main_dark bg-gray">status</th>
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
                siswas.slice(active, active+itemsPerPage).map((siswa, i) => (
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
                      {siswa.status ? "Verified" : "Unverified"}
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
                      {!siswa.status ? (

                        <button
                        onClick={handleDeleteSiswa}
                        className="bg-red p-2 m-1 rounded-md"
                        value={siswa.id}
                        >
                        Hapus
                      </button>
                      
                      ) : (
                        <>
                        
                        {/* <button
                        onClick={handleDownloadPdf}
                        className="bg-gray p-2 m-1 rounded-md"
                        value={siswa.id}
                        >
                        PDF
                      </button> */}
                            <GeneratePDF siswa={siswa} />
                        </>
                      )}

                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex w-full justify-center items-center gap-4 px-4 py-2">
        <button className="bg-white p-3 rounded-lg flex gap-2 cursor-pointer hover:bg-main_gray" onClick={prev}><ArrowLeft size={24} /> Prev</button>
          <div className="p-2 bg-white rounded px-4 cursor-pointer">halaman ke-<span className="text-lg mr-2 bg-main_gray p-2 rounded">{page} </span> Dari {Math.ceil(total / itemsPerPage)}</div>
        <button className="bg-white p-3 rounded-lg flex gap-2 cursor-pointer hover:bg-main_gray" onClick={next}>Next<ArrowRight size={24}/></button>
      </div>

      {showPopup && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop:blur-sm z-10"></div>

          <div
            ref={modalRef}
            className="absolute z-20 top-0 m-5 md:right-[25%] left-0 md:left-[25%] md:w-[50%] w-[90%] bg-white rounded-md shadow-md">
            <h1 className="p-3 font-semibold">EDIT SISWA</h1>
            <div className="flex flex-col justify-between px-4">
              <form
                className="bg-white p-6 mb-4"
                onSubmit={handleUpdateSiswa}
                method="POST"
              >
                <input type="hidden" name="id" value={detailSiswa?.id} />
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
                          value={detailSiswa?.ortu?.no_telepon}
                          onChange={handleChange}
                          placeholder="No telp/WA orang tua"
                        />
                      </div>
                    </div>
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
                          value={detailSiswa?.ortu?.nama_ayah}
                          placeholder="Nama ayah kandung"
                        />
                      </div>
                    </div>
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
                          value={detailSiswa?.ortu?.nama_ibu}
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
                          value={detailSiswa?.ortu?.pekerjaan_ayah}
                        />
                      </div>
                    </div>
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
                          value={detailSiswa?.ortu?.pekerjaan_ibu}
                        />
                      </div>
                    </div>
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
                          <input
                            type="text"
                            placeholder="Asal sekolah"
                            className="w-full border-2 px-2 py-2 bg-white shadow-bottom-only rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="asal_sekolah"
                            value={detailSiswa?.asal_sekolah}
                          />
                        </div>
                        {errors?.asal_sekolah && (
                          <span className="text-red">
                            {errors?.asal_sekolah}
                          </span>
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
                    className="p-3 text-b rounded-md bg-[#5e72e4] hover:bg-blue-700 text-white"
                    type="submit"
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
