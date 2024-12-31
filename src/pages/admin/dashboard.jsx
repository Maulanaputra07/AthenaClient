import React from "react"
import Sidebar, {SidebarItem} from "../../components/Sidebar"
import '../../App.css'
import { Outlet } from "react-router-dom"

function Dashboard(){
    return(
        <div className="flex">
            <Sidebar>
                <SidebarItem text="Dashboard" to="/"/> {/* Contoh icon */}
                <SidebarItem text="Profile" to="profile"/>
            </Sidebar>
            <div className="content h-screen overflow-y-auto p-4">
                <Outlet/>
            </div>
        </div>
    )
}

export default Dashboard