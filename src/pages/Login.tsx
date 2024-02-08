import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/axios";

interface LoginData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await axiosInstance.post(`/auth/api/v1/login`, loginData);

    if (data.status === 200) {
      localStorage.setItem("Authorization", data?.data?.token);
      const expireTime = new Date(data?.data?.expiresAt);
      document.cookie = `Authorization= ${data?.data?.token} ; expires=${expireTime}; secure; path=/; `;
      navigate("/room");
    }
  };

  return (
    <div className="bg-white min-h-screen flex justify-center">
      <div className="mt-20 shadow-2xl max-h-[23rem] py-5 px-6 rounded-lg">
        <h1 className="text-[#0275FF] text-3xl font-semibold text-center">
          Login
        </h1>

        <form className="mt-7" onSubmit={loginHandler}>
          <div>
            <label className="block font-semibold text-[#0275FF]">
              Username
            </label>
            <input
              type="text"
              className="bg-white border border-[#0275FF] outline-none py-2 rounded-md min-w-[16rem] px-2"
              value={loginData.username}
              onChange={onChangeHandler}
              name="username"
            />
          </div>

          <div className="mt-7">
            <label className="block mt-4 font-semibold text-[#0275FF]">
              Password
            </label>
            <input
              type="password"
              className="bg-white border border-[#0275FF] outline-none py-2 rounded-md min-w-[16rem] px-2"
              value={loginData.password}
              onChange={onChangeHandler}
              name="password"
            />
          </div>

          <button
            type="submit"
            className="bg-[#0275FF] text-white min-w-full mt-9 py-2 rounded-md"
          >
            Login
          </button>

          <p className="text-xs mt-4 text-black-800 text-center">
            you havent an account?{" "}
            <Link to="/register" className="font-bold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
