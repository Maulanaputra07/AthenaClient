import React, { useEffect, useState } from "react";
import Sidebar, { SidebarItem } from "../../components/sidebar";
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

  function handleSubmit(e){
    beaxios.post()
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
          <SidebarItem text="Logout" to="/admin/login" />
        </Sidebar>
        <div className="content h-screen overflow-y-auto bg-white w-full p-4">
          <Outlet />
        </div>
      </div>
  );
}

export default Dashboard;
