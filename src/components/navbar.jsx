import React from "react";

function Navbar(){
    return(
        <>
            <div className="flex justify-between">
                <div className="title text-lg font-semibold text-white ">
                    <a href="" className="flex items-center">
                        <img src="https://ppdb.smkthpati.sch.id/img/logo.png" alt="" className="w-10"/>
                        PPDB SMKTH
                    </a>
                </div>
                <div>
                    <input placeholder="Cari nik" className="border shadow-md border-gray-100 text-black px-3 py-2 rounded"/>
                </div>
            </div>
        </>
    )
}

export default Navbar