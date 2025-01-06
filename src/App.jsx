import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import FormAthena from "./pages/form";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/login";
import Profile from "./pages/admin/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/admin/home";
// import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

function App() {
  // const handleChange = (e) => {
  //   // Hanya ambil angka dan tambahkan format
  //   const formattedValue = e.target.value.replace(/[^0-9]/g, "");
  //   setValue(formattedValue);
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormAthena />} />
        <Route path="/admin" element={<Dashboard />}>
          <Route index element={<Home />} />
          {/* <Route path='settings' element={<Setting/>}/> */}
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
