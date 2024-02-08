import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/axios";
import toast from "react-hot-toast";

interface RegisterData {
  username: string;
  password: string;
}

const Register: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
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
    try {
      const response = await axiosInstance.post(
        `/auth/api/v1/register`,
        registrationData
      );

      if (response.status === 200) {
        toast.success("register is successfully");
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage((error as any)?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="max-w-[40rem] sm:min-w-[28rem] min-w-[95vw] sm:px-0 px-4 py-4 rounded-lg shadow-2xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create Account
          </h2>
          <p className="text-center text-red-600 mt-4 text-sm">
            {errorMessage}
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={registerHandler} method="POST">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  onChange={onChangeHandler}
                  type="text"
                  required
                  className="block w-full px-1 bg-white rounded-md py-1.5 text-gray-900 shadow-sm border border-gray-300 placeholder:text-gray-400 focus:border-2 focus:border-indigo-600 outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={onChangeHandler}
                  autoComplete="current-password"
                  required
                  className="block w-full px-1 bg-white rounded-md py-1.5 text-gray-900 shadow-sm border border-gray-300 placeholder:text-gray-400 focus:border-2 focus:border-indigo-600 outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            have a account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              login to account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
