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
import axios from "axios";
import { useAxios } from "../config/provider";

function Form() {
  const [asalSekolah, setAsalSekolah] = useState();
  const beaxios = useAxios();

  useEffect(() => {
    axios
      .get(
        "https://api-sekolah-indonesia.vercel.app/sekolah/smp?"
      )
      .then((res) => {
        setAsalSekolah(res.data.dataSekolah);
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
          <form className="shadow-md relative top-[-80px] bg-white rounded p-6 pb-12 mb-4">
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
                for="username"
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
                  id="username"
                  type="teks"
                  placeholder="NISN"
                />
              </div>
            </div>
            {/* nik */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="username"
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
                  id="username"
                  type="teks"
                  placeholder="NIK"
                />
              </div>
            </div>
            {/* tempat lahir */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="username"
              >
                Tempat Lahir
              </label>
              <div className="input-group flex items-center justify-center">
                <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                  <MapPin size={24} color="grey" />
                </span>
                <input
                  className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="teks"
                  placeholder="Tempat Lahir"
                />
              </div>
            </div>
            {/* tanggal lahir */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="username"
              >
                Tanggal Lahir
              </label>
              <div className="input-group flex items-center justify-center">
                <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                  <CalendarDots size={24} color="grey" />
                </span>
                <input
                  className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="date"
                  placeholder="Tanggal Lahir"
                />
              </div>
            </div>
            {/* jenis kelamin */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="username"
              >
                Jenis Kelamin
              </label>
              <div className="input-group flex items-center justify-center">
                <select value="" className="w-full border-1 shadow p-2">
                  <option name="" id="">
                    Laki-laki
                  </option>
                  <option name="" id="">
                    Perempuan
                  </option>
                </select>
              </div>
            </div>
            {/* agama */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="username"
              >
                Agama
              </label>
              <div className="input-group flex items-center justify-center">
                <select value="" className="w-full border-1 rounded shadow p-2">
                  <option name="" id="">
                    Islam
                  </option>
                  <option name="" id="">
                    Kristen
                  </option>
                  <option name="" id="">
                    Katolik
                  </option>
                  <option name="" id="">
                    Hindu
                  </option>
                  <option name="" id="">
                    Budha
                  </option>
                </select>
              </div>
            </div>
            {/* alamat calon peserta */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="username"
              >
                Alamat lengkap
              </label>
              <div className="input-group flex items-center justify-center">
                <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                  <MapPin size={24} color="grey" />
                </span>
                <input
                  className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="teks"
                  placeholder="Alamat lengkap"
                />
              </div>
            </div>
            {/* no peserta */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="username"
              >
                No telp/WA calon peserta didik
              </label>
              <div className="input-group flex items-center justify-center">
                <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                  <DeviceMobile size={24} color="grey" />
                </span>
                <input
                  className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="teks"
                  placeholder="No telp/WA calon peserta didik"
                />
              </div>
            </div>
            {/* no tlp ortu */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="username"
              >
                No telp/WA orang tua
              </label>
              <div className="input-group flex items-center justify-center">
                <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                  <DeviceMobile size={24} color="grey" />
                </span>
                <input
                  className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="teks"
                  placeholder="No telp/WA orang tua"
                />
              </div>
            </div>
            {/* Nama ayah kandung */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="username"
              >
                Nama ayah kandung
              </label>
              <div className="input-group flex items-center justify-center">
                <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                  <UserCircle size={24} color="grey" />
                </span>
                <input
                  className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="teks"
                  placeholder="Nama ayah kandung"
                />
              </div>
            </div>
            {/* Nama ibu kandung */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="username"
              >
                Nama ibu kandung
              </label>
              <div className="input-group flex items-center justify-center">
                <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                  <UserCircle size={24} color="grey" />
                </span>
                <input
                  className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="teks"
                  placeholder="Nama ibu kandung"
                />
              </div>
            </div>
            {/* Pekerjaan ayah */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="username"
              >
                Pekerjaan ayah
              </label>
              <div className="input-group flex items-center justify-center">
                <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                  <UserCircle size={24} color="grey" />
                </span>
                <input
                  className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="teks"
                  placeholder="Pekerjaan ayah"
                />
              </div>
            </div>
            {/* Pekerjaan ibu */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="username"
              >
                Pekerjaan ibu
              </label>
              <div className="input-group flex items-center justify-center">
                <span className="p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only">
                  <UserCircle size={24} color="grey" />
                </span>
                <input
                  className="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="teks"
                  placeholder="Pekerjaan ibu"
                />
              </div>
            </div>
            {/* Asal smp/mts */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="username"
              >
                Asal sekolah (SMP/MTs)
              </label>
              <div className="input-group flex items-center justify-center">
                <select value="" className="w-full border-1 rounded shadow p-2">
                  {asalSekolah &&
                    asalSekolah.map((item, i) => (
                      <option name="" id="">
                        {item.sekolah}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {/* Jurusan */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="username"
              >
                Pilih paket jurusan
              </label>
              <div className="input-group flex items-center justify-center">
                <select value="" className="w-full border-1 rounded shadow p-2">
                  <option name="" id="">
                    Jurusan 1
                  </option>
                  <option name="" id="">
                    Jurusan 2
                  </option>
                </select>
              </div>
            </div>
            {/* <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
              </label>
              <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
              <p className="text-red-500 text-xs italic">Please choose a password.</p>
            </div> */}
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Daftar
              </button>
              {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
              </a> */}
            </div>
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
