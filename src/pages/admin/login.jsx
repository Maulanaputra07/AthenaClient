import React, { useEffect, useState } from "react";
import "../../App.css";
import icon from "../../assets/athenaicon.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { useAuth, useAxios } from "../../config/hooks";

function Login() {
  const beaxios = useAxios();
  const navigate = useNavigate();
  const auth = useAuth();
  const [alert, setAlert] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    beaxios
      .post("/auth/login", {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        auth.setUser(res.data.data);
        navigate("/admin");
      })
      .catch((err) => {
        console.error(err);
        setAlert(err.response.data.message);
      });
  }

  useEffect(() => {
    if (auth) {
      return navigate("/admin");
    }
  }, []);

  return (
    <div className="max-w-full h-screen bg-white-yellow flex flex-col justify-center items-center">
      <div className="gap-5 flex flex-col w-full items-center justify-center">
        <div className="w-full max-w-xl bg-[#F1F1F1] rounded-md shadow-xl p-5">
          <h1 className="text-center mt-2 font-bold text-2xl">Login</h1>
          <form className="rounded px-8 pt-6 pb-8 mb-1" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <div className="input-group flex items-center justify-center">
                <input
                  className="w-full border-1 py-3 px-2 bg-[#F1F1F1] shadow rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  name="username"
                  autoComplete="username"
                  placeholder="Username"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="username"
              >
                Password
              </label>
              <div className="input-group flex items-center justify-center">
                <input
                  inputMode="text"
                  className="w-full border-1 py-3 px-2 bg-[#F1F1F1] shadow rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Password"
                />
              </div>
            </div>
            {alert && <Alert color="red" message={alert} />}
            <div className="flex items-center justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">&copy;2024</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
