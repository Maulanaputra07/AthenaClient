import {useState } from "react"
import { NavLink } from "react-router-dom";

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true)
    return(
        <aside className="h-screen max-w-xs">
            <nav className="h-full flex flex-col bg-orange-500 border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    {/* <img src="" alt="" /> */}
                    <button onClick={()=> setExpanded(curr =>!curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                        {/* icon chevron */}
                    </button>
                </div>

                <ul className="flex-1 px-3">{children}</ul>

                <div className="border-t flex p-3">
                    {/* <img src="" alt="" /> */}
                    <div className={`flex justify-between items-center w-52 ml-3`}>
                        <div>
                            <h4 className="font-semibold">Athena</h4>
                            <span className="text-sm text-gray-600">SMK TUNAS HARAPAN PATI</span>
                        </div>
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export function SidebarItem({ icon, text, active, alert, to, next }) {
    return (
        <li>
            <NavLink to={to} className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
                active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-500"
                    : "hover:bg-indigo-50 text-gray-600"
            }`}>
            {icon} {/* Render icon */}
            <span className="w-52 ml-3">{text}</span>
            {alert && <div className="absolute right-2 w-2 h-2 rounded bg-indigo-400" />}
            </NavLink>
        </li>
    );
}
