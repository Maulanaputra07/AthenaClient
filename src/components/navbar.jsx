import React from "react";

function Navbar(){
    return(
        <>
            <div className="flex justify-between">
                <div className="title text-xl">
                    Athena
                </div>
                <div>
                    <input placeholder="Cari nik" className="border shadow-md border-gray-100 text-black px-3 py-2 rounded"/>
                </div>
            </div>
        </>
    )
}

export default Navbar