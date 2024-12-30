import React from 'react'
import '../App.css'
import Navbar from '../components/navbar'
import { GraduationCap, IdentificationCard,MapPin,CalendarDots } from '@phosphor-icons/react';
// import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

function Form() {
  // const handleChange = (e) => {
  //   // Hanya ambil angka dan tambahkan format
  //   const formattedValue = e.target.value.replace(/[^0-9]/g, "");
  //   setValue(formattedValue);
  // };

  return (
    <div className='p-[2rem]'>
      <Navbar/>
      <h1 className="text-3xl font-bold mb-5 text-center">
        Selamat datang pada website Athena
      </h1>
      <h3 className="text-xl font-semibold mb-5 text-center">
        Form pendaftaran
      </h3>
      <div className='gap-5 flex flex-col w-full items-center justify-center'>
        <div class="w-full max-w-xl">
          <form class="shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {/* Nama */}
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                Nama
              </label>
              <div className="input-group flex items-center justify-center">
                <span className='p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only'>
                  <GraduationCap size={24} color='grey'/>
                </span>
                <input class="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nama"/>
              </div>
            </div>
            {/* NISN */}
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                NISN
              </label>
              <div className="input-group flex items-center justify-center">
                <span className='p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only'>
                <IdentificationCard size={24} color='grey' />
                </span>
                <input inputMode='numeric' class="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="teks" placeholder="NISN"/>
              </div>
            </div>
            {/* nik */}
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                NIK
              </label>
              <div className="input-group flex items-center justify-center">
                <span className='p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only'>
                <IdentificationCard size={24} color='grey' />
                </span>
                <input inputMode='numeric' class="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="teks" placeholder="NIK"/>
              </div>
            </div>
            {/* tempat lahir */}
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                Tempat Lahir
              </label>
              <div className="input-group flex items-center justify-center">
                <span className='p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only'>
                <MapPin size={24} color='grey' />
                </span>
                <input class="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="teks" placeholder="Tempat Lahir"/>
              </div>
            </div>
            {/* tanggal lahir */}
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                Tanggal Lahir
              </label>
              <div className="input-group flex items-center justify-center">
                <span className='p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only'>
                <CalendarDots size={24} color='grey' />
                </span>
                <input class="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="date" placeholder="Tanggal Lahir"/>
              </div>
            </div>
            {/* jenis kelamin */}
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                Jenis Kelamin
              </label>
              <div className="input-group flex items-center justify-center">
                <select value="" className='w-full border-1 rounded shadow p-2'>
                  <option name="" id="">Laki-laki</option>
                  <option name="" id="">Perempuan</option>
                </select>
              </div>
            </div>
            {/* agama */}
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                Agama
              </label>
              <div className="input-group flex items-center justify-center">
                <select value="" className='w-full border-1 rounded shadow p-2'>
                  <option name="" id="">Islam</option>
                  <option name="" id="">Kristen</option>
                  <option name="" id="">Katolik</option>
                  <option name="" id="">Hindu</option>
                  <option name="" id="">Budha</option>
                </select>
              </div>
            </div>
            {/* alamat calon peserta */}
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                Alamat lengkap
              </label>
              <div className="input-group flex items-center justify-center">
                <span className='p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only'>
                <MapPin size={24} color='grey' />
                </span>
                <input class="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="teks" placeholder="Alamat lengkap"/>
              </div>
            </div>
            {/* no peserta */}
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                No telp/WA calon peserta didik
              </label>
              <div className="input-group flex items-center justify-center">
                <span className='p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only'>
                <MapPin size={24} color='grey' />
                </span>
                <input class="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="teks" placeholder="No telp/WA calon peserta didik"/>
              </div>
            </div>
            {/* no tlp ortu */}
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                No telp/WA orang tua
              </label>
              <div className="input-group flex items-center justify-center">
                <span className='p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only'>
                <MapPin size={24} color='grey' />
                </span>
                <input class="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="teks" placeholder="No telp/WA orang tua"/>
              </div>
            </div>
            {/* Nama ayah kandung */}
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                Nama ayah kandung
              </label>
              <div className="input-group flex items-center justify-center">
                <span className='p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only'>
                <MapPin size={24} color='grey' />
                </span>
                <input class="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="teks" placeholder="Nama ayah kandung"/>
              </div>
            </div>
            {/* Nama ibu kandung */}
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                Nama ibu kandung
              </label>
              <div className="input-group flex items-center justify-center">
                <span className='p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only'>
                <MapPin size={24} color='grey' />
                </span>
                <input class="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="teks" placeholder="Nama ibu kandung"/>
              </div>
            </div>
            {/* Pekerjaan ayah */}
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                Pekerjaan ayah
              </label>
              <div className="input-group flex items-center justify-center">
                <span className='p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only'>
                <MapPin size={24} color='grey' />
                </span>
                <input class="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="teks" placeholder="Pekerjaan ayah"/>
              </div>
            </div>
            {/* Pekerjaan ibu */}
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                Pekerjaan ibu
              </label>
              <div className="input-group flex items-center justify-center">
                <span className='p-1.5 rounded-tl-md border-t-2 border-l-2 border-b-2 rounded-bl-md bg-white shadow-bottom-only'>
                <MapPin size={24} color='grey' />
                </span>
                <input class="w-full border-t-2 border-r-2 border-b-2 py-2 bg-white shadow-bottom-only rounded-tr-md rounded-br-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="teks" placeholder="Pekerjaan ibu"/>
              </div>
            </div>
            {/* Asal smp/mts */}
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                Asal sekolah (SMP/MTs)
              </label>
              <div className="input-group flex items-center justify-center">
                <select value="" className='w-full border-1 rounded shadow p-2'>
                  <option name="" id="">Sekolah 1</option>
                  <option name="" id="">Sekolah 2</option>
                </select>
              </div>
            </div>
            {/* Jurusan */}
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                Pilih paket jurusan
              </label>
              <div className="input-group flex items-center justify-center">
                <select value="" className='w-full border-1 rounded shadow p-2'>
                  <option name="" id="">jurusan 1</option>
                  <option name="" id="">jurusan 2</option>
                </select>
              </div>
            </div>
            {/* <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
              </label>
              <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
              <p class="text-red-500 text-xs italic">Please choose a password.</p>
            </div> */}
            <div class="flex items-center justify-center">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Daftar
              </button>
              {/* <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
              </a> */}
            </div>
          </form>
          <p class="text-center text-gray-500 text-xs">
            &copy;2024
          </p>
        </div>
      </div>
    </div>
  )
}

export default Form
