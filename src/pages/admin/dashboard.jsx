import React, { useEffect, useState } from "react";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import "../../App.css";
import {
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { AuthGuard } from "../../config/Guard";
import { useAxios } from "../../config/hooks";

function Dashboard() {
  const location = useLocation().pathname;
  const beaxios = useAxios();

  function handleLogout(e) {
    beaxios
      .post("/auth/logout")
      .then((res) => {
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem
          text="Dashboard"
          name="dashboard"
          active={location == "/admin"}
          to="/admin"
        />{" "}
        {/* Contoh icon */}
        <SidebarItem
          text="Siswa"
          name="siswa"
          active={location.includes("/siswa")}
          to="siswa"
        />
        {/* <SidebarItem text="Logout" onClick={handleLogout} /> */}
        <li>
          <button
            onClick={handleLogout}
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${"text-left hover:bg-indigo-50 text-gray-600"}`}
          >
            <span className="w-52 ml-3">Logout</span>
          </button>
        </li>
      </Sidebar>
      <div className="content h-screen overflow-y-auto bg-white w-full p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
