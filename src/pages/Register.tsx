import React, { ChangeEvent, FormEvent } from "react";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

interface RegisterData {
  username: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = React.useState<RegisterData>({
    username: "",
    password: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  const registerHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${api}auth/api/v1/register`, {
      method: "POST",
      body: JSON.stringify(registrationData),
    });
    console.log(response);

    if (response.status === 200) {
      navigate("/login");
    }
  };

  return (
    <div className="bg-white min-h-screen flex justify-center">
      <form
        onSubmit={registerHandler}
        className="mt-20 shadow-2xl max-h-[23rem] py-5 px-6 rounded-lg"
      >
        <h1 className="text-[#0275FF] text-3xl font-semibold text-center">
          Register
        </h1>

        <div className="mt-7">
          <label className="block font-semibold text-[#0275FF]">Username</label>
          <input
            type="text"
            className="bg-white border border-[#0275FF] outline-none py-2 rounded-md min-w-[16rem] px-2"
            value={registrationData.username}
            onChange={onChangeHandler}
            name="username"
          />
        </div>

        <div className="mt-7">
          <label className="block font-semibold text-[#0275FF]">Password</label>
          <input
            type="password"
            className="bg-white border border-[#0275FF] outline-none py-2 rounded-md min-w-[16rem] px-2"
            value={registrationData.password}
            onChange={onChangeHandler}
            name="password"
          />
        </div>

        <button className="bg-[#0275FF] text-white min-w-full mt-9 py-2 rounded-md">
          Register
        </button>
        <p className="text-xs mt-4 text-black-800 text-center">you have an account? <Link to='/login' className="font-bold">Login</Link></p>

      </form>
    </div>
  );
};

export default Register;
