import React from "react"
import Sidebar, {SidebarItem} from "../../components/Sidebar"
import '../../App.css'
import { Outlet } from "react-router-dom"

function Dashboard(){
    return(
        <div className="flex">
            <Sidebar>
                <SidebarItem text="Dashboard" to="/admin"/> {/* Contoh icon */}
                <SidebarItem text="Siswa" to="siswa"/>
                <SidebarItem text="Logout" to="/admin/login"/>
            </Sidebar>
            <div className="content h-screen overflow-y-auto bg-white w-full p-4">
                <Outlet/>
            </div>
        </div>
    )
}

export default Dashboard