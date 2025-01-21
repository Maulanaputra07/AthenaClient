import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import FormAthena from "./pages/form";
import Dashboard from "./pages/admin/dashboard";
import Login from "./pages/admin/login";
import Siswa from "./pages/admin/Siswa";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Home from "./pages/admin/home";
import Scan from "./pages/admin/scan";
import { AuthProvider } from "./config/Provider";
import { AuthGuard } from "./config/Guard";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormAthena />} />
          <Route
            path="/admin"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          >
            <Route index element={<Home />} />

            <Route path="siswa" element={<Siswa />} />
            <Route path="scan" element={<Scan />} />
          </Route>
          <Route path="/admin/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
