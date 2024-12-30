import React from "react"
import '../../App.css'

function Login() {
    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">

<div className='gap-5 flex flex-col w-full items-center justify-center'>
        <div class="w-full max-w-md border bg-red-100 rounded-md border-black">
            <h1 className="text-center mt-2 font-bold text-2xl">Login</h1>
          <form class="rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                Username
              </label>
              <div className="input-group flex items-center justify-center">
                <input class="w-full border-1 py-2 px-2 bg-white shadow rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                Password
              </label>
              <div className="input-group flex items-center justify-center">
                <input inputMode="text" class="w-full border-1 py-2 px-2 bg-white shadow rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"/>
              </div>
            </div>
            
            <div class="flex items-center justify-center">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Login
              </button>
            </div>
          </form>
          <p class="text-center text-gray-500 text-xs">
            &copy;2024
          </p>
        </div>
      </div>
        </div>
    )
}

export default Login