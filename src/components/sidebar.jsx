import {useState } from "react"
import { NavLink } from "react-router-dom";
import athenaIcon from '../assets/athenaicon.png'
import {
    CaretLeft
} from "@phosphor-icons/react";

export default function Sidebar({ children }) {
    // const [expanded, setExpanded] = useState(true)
    const [isExpanded, setIsExpanded] = useState(false);
    
    return(
        // <aside className="h-screen md:max-w-xs">
        //     <nav className="h-full flex flex-col justify-center items-center md:bg-[#FFAA17] bg-rose-400 border-r shadow-sm">
        //         <div className="p-4 pb-2 flex justify-between items-center">
        //             <img src={athenaIcon} width={30} alt="" />
        //             <button onClick={()=> setExpanded(curr =>!curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
        //                 <CaretLeft size={25}/>
        //             </button>
        //         </div>

        //         <ul className="flex flex-col justify-center items-center h-full px-3">{children}</ul>

        //         <div className="border-t w-full border-[#F1F1F1] flex bg-[#F1F1F1] p-3">
        //             {/* <img src="" alt="" /> */}
        //             <div className="flex flex-col items-center">
        //                 <div className={`flex items-end w-52 ml-3`}>
        //                     <img src={athenaIcon} width={50} alt="" />
        //                     <h4 className="font-semibold text-2xl">thena</h4>
        //                 </div>
        //                 <h5>SMK TUNAS HARAPAN PATI</h5>
        //             </div>
        //         </div>
        //     </nav>
        // </aside>
        <div className="absolute z-20 md:relative">
      {/* Button Burger */}
        <button
            onClick={() => setIsExpanded((curr) => !curr)}
            className={!isExpanded ? `mt-5 mx-2 p-2 text-black rounded-md md:hidden text-lg font-semibold` : `mt-5 mx-2 p-2 text-black rounded-md hidden md:hidden `}
        >
            {!isExpanded && ("☰")}
        </button>

      {/* Sidebar */}
        <aside
            className={`h-screen max-w-40 md:max-w-xs ${
                isExpanded ? "block" : "hidden"
            } md:block`}
        >
        <nav className="h-full flex flex-col items-end md:justify-center md:items-center md:bg-[#FFAA17] bg-white border-r shadow-sm">
            <div className="p-4 pb-2 flex items-center">
                <button
                    onClick={() => setIsExpanded(false)}
                    className="md:hidden p-1.5 rounded-lg hover:bg-main_gray"
                >
                    ✖
                </button>
            </div>

          <ul className="flex flex-col justify-center items-center h-full px-3">
            {children}
          </ul>

          <div className="border-t w-full border-[#F1F1F1] bg-[#F1F1F1] p-3 hidden md:flex">
            <div className="flex flex-col items-center">
              <div className="flex items-end w-52 ml-3">
                <img src={athenaIcon} width={50} alt="Athena Icon" />
                <h4 className="font-semibold text-2xl">thena</h4>
              </div>
              <h5>SMK TUNAS HARAPAN PATI</h5>
            </div>
          </div>
        </nav>
      </aside>
        </div>
    )
}

export function SidebarItem({ icon, text, active, alert, to, next, onClick }) {
    return (
        <li className="ml-36 md:ml-0">
            <NavLink to={to} className={`flex items-start py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
                active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-500"
                    : "hover:bg-indigo-50 text-gray-600"
            }`}>
            {icon} {/* Render icon */}
            <span className="md:w-52 w-24 ml-3">{text}</span>
            {alert && <div className="absolute right-2 w-2 h-2 rounded bg-indigo-400" />}
            </NavLink>
        </li>
    );
}
