import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import sprator from "../assets/sprator.svg";
import {
  GraduationCap,
  IdentificationCard,
  MapPin,
  CalendarDots,
  DeviceMobile,
  UserCircle,
} from "@phosphor-icons/react";

import axios from "axios";
import { useAxios } from "../config/hooks";
import { data } from "autoprefixer";
import Swal from "sweetalert2";
import Navbar from "../components/navbar";

function Form() {
  const [asalSekolah, setAsalSekolah] = useState([]);
  const [selectedSekolah, setSelectedSekolah] = useState("");
  const [search, setSearch] = useState("");
  const [jurusans, setJurusans] = useState();
  const [dataSiswa, setDataSiswa] = useState({
    jenis_kelamin: true,
    agama: "Islam",
    jurusan_id: 1,
  });
  const [errors, setErrors] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  const today = new Date();
  const year = today.getFullYear() - 14; // 14 tahun sebelum tahun ini
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const minDate = `${year}-${month}-${day}`;


  function handleChange(e) {
    setDataSiswa({ ...dataSiswa, [e.target.name]: e.target.value });
  }
  
  const handleSelect = (item) => {
    console.log(item);
    setSelectedSekolah(item);
    setIsOpen(false);
  }

  const handleSearch = (e) => {
    console.log(e.target.value);
    setSerach(e.target.value);
  }

  // const handleSelect = (item) => {
  //   setSelectedSekolah(item);
  //   setDataSiswa({ ...dataSiswa, asal_sekolah: item });
  //   setIsOpen(false);
  // };

  const handleSearch = (e) => {
    setDataSiswa({ ...dataSiswa, [e.target.name]: e.target.value });
    setSearch(e.target.value);
  };

  const [step, setStep] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (step === 5) {
      setLoad(true);
      beaxios
        .post("/siswa", dataSiswa)
        .then((res) => {
          Swal.fire({
            title: "Berhasil Terdaftar!",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((err) => {
          // console.log(err.response.data.errors);
          setErrors(err.response?.data.errors);
          const resErr = err.response.data.errors;
          if (resErr?.name || resErr?.nik || resErr?.nisn) {
            setStep(1);
          } else if (
            resErr?.tempat_lahir ||
            resErr?.tanggal_lahir ||
            resErr?.jenis_kelamin
          ) {
            setStep(2);
          } else if (
            resErr?.agama ||
            resErr?.alamat_lengkap ||
            resErr?.no_telepon ||
            resErr?.no_telepon_ortu
          ) {
            setStep(3);
          } else if (
            resErr?.nama_ayah ||
            resErr?.nama_ibu ||
            resErr?.pekerjaan_ayah ||
            resErr?.pekerjaan_ibu
          ) {
            setStep(4);
          }
        })
        .finally(() => {
          setLoad(false);
        });
    }
  }

  const nextStep = (e) => {
    console.log(step);
    if (step < 5) {
      e.preventDefault();
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const beaxios = useAxios();

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

    const fetchData = async () => {

      try {
        beaxios.get("/jurusans").then((res) => {
          setJurusans(res.data.data);
          setDataSiswa({ ...dataSiswa, ["jurusan_id"]: res.data.data[0].id });
        });
      } catch (err) {}
    };

    fetchData();


    const fetchData = async () => {
      let url = "https://api-sekolah-indonesia.vercel.app/sekolah/smp?kab_kota=031800&page=1&perPage=30"
  
      if(search){
        url = `https://api-sekolah-indonesia.vercel.app/sekolah/s?sekolah=${search}`;
      }else if(search == ""){
        url = "https://api-sekolah-indonesia.vercel.app/sekolah/smp?kab_kota=031800&page=1&perPage=30"
      }
      
      try{
        const res = await axios.get(url)
        setAsalSekolah(res.data.dataSekolah);

        beaxios.get("/jurusans").then((res) => {
            setJurusans(res.data.data);
          });
      } catch (err) {

      }
    };
    
    fetchData();    
    // axios
    //   .get(
    //     url
    //   )
    //   .then((res) => {
    //     console.log(res.data.dataSekolah.sekolah);
    //     setAsalSekolah(res.data.dataSekolah);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // beaxios.get("/jurusans").then((res) => {
    //   setJurusans(res.data.data);
    // });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [search]);

  // console.log(dataSiswa?.asalSekolah);
  return (
    <div className="bg-[#162c4d] min-h-screen">
      {load && (
        <div className="fixed z-30 top-0 left-0 flex justify-center items-center w-screen h-screen bg-[rgba(0,0,0,0.5)]">
          <h1 className="text-black p-1 rounded-md shadow-md bg-white md:w-1/3 md:h-1/3 w-1/2 h-1/3 text-center flex items-center justify-center md:text-2xl text-md font-semibold">Tunggu sebentar, data anda sedang diproses</h1>
        </div>
      )}
      <div className="header p-5 relative">
        <Navbar />
        <div className="p-14 w-full flex flex-col items-center justify-center">
          <h1 className="text-3xl text-white min-w-80 font-semibold mb-5 text-center">
            Selamat datang pada website PPDB SMKTH
          </h1>
          <h3 className="text-xl font-semibold py-5 text-center text-white">
            Form Pendaftaran
          </h3>
        </div>
      </div>
      <div className="gap-5 flex flex-col w-full items-center justify-center">
        <div className="w-11/12 max-w-4xl">
          <form
            className="shadow-md relative top-[-80px]  bg-white rounded p-6 mb-4"
            onSubmit={handleSubmit}
          >
            {step === 1 && (
              <div className="step1 flex flex-col justify-between h-full">
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
                        value={dataSiswa?.name ?? ""}
                        onChange={handleChange}
                      />
                    </div>
                    {errors?.name && (
                      <span className="text-red">{errors?.name}</span>
                    )}
                  </div>
                  {/* NISN */}
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-semibold mb-2"
                      htmlFor="NISN"
                    >
                      Email Address
                    </label>
                    <div className="input-group flex items-center justify-center">
                      <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                        <IdentificationCard size={24} color="grey" />
                      </span>
                      <input
                        className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={dataSiswa?.email ?? ""}
                        onChange={handleChange}
                      />
                    </div>
                    {errors?.email && (
                      <span className="text-red">{errors?.email}</span>
                    )}
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
                        value={dataSiswa?.nisn ?? ""}
                        onChange={handleChange}
                      />
                    </div>
                    {errors?.nisn && (
                      <span className="text-red">{errors?.nisn}</span>
                    )}
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
                        value={dataSiswa?.nik ?? ""}
                        onChange={handleChange}
                      />
                    </div>
                    {errors?.nik && (
                      <span className="text-red">{errors?.nik}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-end pt-5">
                  <button
                    onClick={nextStep}
                    className="bg-[#5e72e4] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="step2 flex flex-col justify-between h-full">
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
                        value={dataSiswa?.tempat_lahir ?? ""}
                        onChange={handleChange}
                      />
                    </div>
                    {errors?.tempat_lahir && (
                      <span className="text-red">{errors?.tempat_lahir}</span>
                    )}
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
                        value={dataSiswa?.tanggal_lahir ?? ""}
                        max={minDate}
                        onChange={handleChange}
                      />
                    </div>
                    {errors?.tanggal_lahir && (
                      <span className="text-red">{errors?.tanggal_lahir}</span>
                    )}
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
                        value={dataSiswa?.jenis_kelamin ?? 1}
                        onChange={handleChange}
                        name="jenis_kelamin"
                        className="w-full border-1 shadow p-2"
                        id="jenisKelamin"
                      >
                        <option name="" id="1" value={1} className="text-sm">
                          Laki-laki
                        </option>
                        <option name="" id="0" value={0} className="text-sm">
                          Perempuan
                        </option>
                      </select>
                    </div>
                    {errors?.jenis_kelamin && (
                      <span className="text-red">{errors?.jenis_kelamin}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={prevStep}
                    className="bg-white hover:bg-[#F1F1F1] text-[#5e72e4] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-[#5e72e4] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {step === 3 && (
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
                      value={dataSiswa?.agama ?? "Islam"}
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
                  {errors?.agama && (
                    <span className="text-red">{errors?.agama}</span>
                  )}
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
                      value={dataSiswa?.alamat_lengkap ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                  {errors?.alamat_lengkap && (
                    <span className="text-red">{errors?.alamat_lengkap}</span>
                  )}
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
                      value={dataSiswa?.no_telepon ?? ""}
                      onChange={handleChange}
                      placeholder="No telp/WA calon peserta didik"
                    />
                  </div>
                  {errors?.no_telepon && (
                    <span className="text-red">{errors?.no_telepon}</span>
                  )}
                </div>
                {/* no tlp ortu */}
                <div className="mb-4">
                  <label
                    className="block text-graxy-700 text-sm font-semibold mb-2"
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
                      value={dataSiswa?.no_telepon_ortu ?? ""}
                      onChange={handleChange}
                      placeholder="No telp/WA orang tua"
                    />
                  </div>
                  {errors?.no_telepon_ortu && (
                    <span className="text-red">{errors?.no_telepon_ortu}</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevStep}
                    className="bg-white hover:bg-[#F1F1F1] text-[#5e72e4] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-[#5e72e4] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {step === 4 && (
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
                      value={dataSiswa?.nama_ayah ?? ""}
                      onChange={handleChange}
                      placeholder="Nama ayah kandung"
                    />
                  </div>
                  {errors?.nama_ayah && (
                    <span className="text-red">{errors?.nama_ayah}</span>
                  )}
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
                      value={dataSiswa?.nama_ibu ?? ""}
                      onChange={handleChange}
                      placeholder="Nama ibu kandung"
                    />
                  </div>
                  {errors?.nama_ibu && (
                    <span className="text-red">{errors?.nama_ibu}</span>
                  )}
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
                      value={dataSiswa?.pekerjaan_ayah ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                  {errors?.pekerjaan_ayah && (
                    <span className="text-red">{errors?.pekerjaan_ayah}</span>
                  )}
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
                      value={dataSiswa?.pekerjaan_ibu ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                  {errors?.pekerjaan_ibu && (
                    <span className="text-red">{errors?.pekerjaan_ibu}</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevStep}
                    className="bg-white hover:bg-[#F1F1F1] text-[#5e72e4] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-[#5e72e4] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {step === 5 && (
              <div className="step5 flex flex-col justify-between h-full">
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
                            onChange={handleSearch}
                            name="asal_sekolah"
                            value={search}
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
                        value={dataSiswa?.jurusan_id ?? 1}
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
                    {errors?.jurusan_id && (
                      <span className="text-red">{errors?.jurusan_id}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevStep}
                    className="bg-white hover:bg-[#F1F1F1] text-[#5e72e4] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Back
                  </button>
                  <button
                    className="bg-[#5e72e4] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Daftar
                  </button>
                </div>
              </div>
            )}
          </form>
          <footer className="py-5">
            <div className="container">
              <div className="row align-items-center justify-content-xl-between">
                <div className="col-xl-6">
                  <div className="copyright text-center text-xl-left text-white  text-muted">
                    © 2024 SMKTH, created by
                    <a
                      href="https://www.creative-tim.com"
                      className="font-weight-bold ml-1"
                      target="_blank"
                    >
                      Riki
                    </a>{" "}
                    &amp;
                    <a
                      href="https://www.updivision.com"
                      className="font-weight-bold ml-1"
                      target="_blank"
                    >
                      Maulana
                    </a>
                  </div>
                </div>
                <div className="col-xl-6">
                  <ul className="nav nav-footer text-white text-opacity-70 text-center justify-content-center justify-content-xl-end">
                    <li className="nav-item">
                      <a
                        href="https://smkthpati.sch.id"
                        className="nav-link"
                        target="_blank"
                      >
                        SMK Tunas Harapan Pati
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Form;
