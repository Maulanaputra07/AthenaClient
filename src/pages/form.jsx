import React, { useEffect, useState } from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import sprator from "../assets/sprator.svg";
import {
  GraduationCap,
  IdentificationCard,
  MapPin,
  CalendarDots,
  DeviceMobile,
  UserCircle,
} from "@phosphor-icons/react";

import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Input,
} from "@material-tailwind/react";

import axios from "axios";
import { useAxios } from "../config/provider";


function Form() {
  const [asalSekolah, setAsalSekolah] = useState();
  const [jenisKelamin, setJenisKelamin] = useState();
  const [agama, setAgama] = useState();
  const [formData, setFormData] = useState({
    nama: "",
    nisn: "",
    nik: "",
    tempatLahir: "",
    taggalLahir: new Date().getDate,
  })

  const handleChangeJenisKelamin = (e) => {
    setJenisKelamin(e.target.value);
  }

  const handleChangeAgama = (e) => {
    setAgama(e.target.value);
  }

  const [step, setStep] = useState(1);
  
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1)
  }

  const beaxios = useAxios();

  useEffect(() => {
    axios
      .get(
        "https://api-sekolah-indonesia.vercel.app/sekolah/smp?kab_kota=031800&page=1&perPage=30"
      )
      .then((res) => {
        setAsalSekolah(res.data.dataSekolah);
        console.log(asalSekolah);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="">
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
          <form className="shadow-md relative top-[-80px] h-[60vh] md:h-[80vh] bg-white rounded p-6 pb-12 mb-4">
            {step === 1 && (
              <div className="step1 flex flex-col justify-between h-full">
                <div>
                  {/* Nama */}
                  <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    for="username"
                  >
                    Nama
                  </label>
                  <div className="input-group flex items-center justify-center">
                    <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                      <GraduationCap size={24} color="grey" />
                    </span>
                    <input
                      className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Nama"
                    />
                  </div>
                  </div>
                  {/* NISN */}
                  <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    for="NISN"
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
                      type="teks"
                      placeholder="NISN"
                    />
                  </div>
                  </div>
                  {/* nik */}
                  <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    for="NIK"
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
                      type="teks"
                      placeholder="NIK"
                    />
                  </div>
                  </div>
                </div>
                <div className="flex items-center justify-end">
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
                  for="tempatLahir"
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
                    type="teks"
                    placeholder="Tempat Lahir"
                  />
                </div>
                  </div>
                  {/* tanggal lahir */}
                  <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  for="tanggalLahir"
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
                  />
                </div>
                  </div>
                  {/* jenis kelamin */}
                  <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  for="jenisKelamin"
                >
                  Jenis Kelamin
                </label>
                <div className="input-group flex items-center justify-center">
                  <select value={jenisKelamin} onChange={handleChangeJenisKelamin} className="w-full border-1 shadow p-2" id="jenisKelamin">
                    <option name="" id="" value="laki-laki" className="text-sm">
                      Laki-laki
                    </option>
                    <option name="" id="" value="perempuan" className="text-sm">
                      Perempuan
                    </option>
                  </select>
                </div>
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
                for="agama"
              >
                Agama
              </label>
              <div className="input-group flex items-center justify-center">
                <select value={agama} onChange={handleChangeAgama} className="w-full border-1 rounded shadow p-2" id="agama">
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
                for="alamat"
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
                />
              </div>
                </div>
                {/* no peserta */}
                <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="noTlp"
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
                  type="teks"
                  placeholder="No telp/WA calon peserta didik"
                />
              </div>
                </div>
                {/* no tlp ortu */}
                <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="noTlpOrtu"
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
                  type="teks"
                  placeholder="No telp/WA orang tua"
                />
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
            {step === 4 && (
              <div className="step4">
                {/* Nama ayah kandung */}
                <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="ayah"
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
                  type="teks"
                  placeholder="Nama ayah kandung"
                />
              </div>
                </div>
                {/* Nama ibu kandung */}
                <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="ibu"
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
                  type="teks"
                  placeholder="Nama ibu kandung"
                />
              </div>
                </div>
                {/* Pekerjaan ayah */}
                <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="pekerjaanAyah"
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
                  type="teks"
                  placeholder="Pekerjaan ayah"
                />
              </div>
                </div>
                {/* Pekerjaan ibu */}
                <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="pekerjaanIbu"
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
                />
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
            {step === 5 && (
              <div className="step5 flex flex-col justify-between h-full">
                <div>
                  {/* Asal smp/mts */}
                  <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  for="asalSekolah"
                >
                  Asal sekolah (SMP/MTs)
                </label>
                <div className="input-group flex items-center justify-center">
                    <Menu
                      dismiss={{
                        itemPress: true,
                      }}
                    >
        <MenuHandler>
          <Button className="text-black rounded-tr-md rounded-br-md w-full border-t-2 border-r-2 border-b-2 py-3 px-3 bg-white text-start font-semibold">Pilih sekolah</Button>
        </MenuHandler>
        <MenuList className="md:w-[67%] bg-white max-h-64 w-[80%] overflow-auto" value={asalSekolah}>
          <Input
            containerProps={{
              className: "mb-4",
            }}
            placeholder="Cari sekolah"
            className="p-2"
            autoFocus
          />
          {asalSekolah &&
          asalSekolah.map((item, i) => (
              <MenuItem>{item.sekolah}</MenuItem>
          ))}
        </MenuList>
                    </Menu>
                </div>
                  </div>
                  {/* Jurusan */}
                  <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  for="jurusan"
                >
                  Pilih paket keahlian
                </label>
                <div className="input-group flex items-center justify-center">
                  <select value="" className="w-full border-1 rounded shadow p-2 text-sm" id="jurusan">
                    <option name="" id="">
                      Jurusan 1
                    </option>
                    <option name="" id="">
                      Jurusan 2
                    </option>
                  </select>
                </div>
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
                    type="button"
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
