import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
const SignIn = () => {
  const navigate = useNavigate();
  const [canUserSeePassword, setCanUserSeePassword] = useState(false);

  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  // Function to handle the input and handle errors on the form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  // Function to handle the form submit to add new user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        enqueueSnackbar(data.message, { variant: "error" });

        dispatch(signInFailure(data.message));
        return;
      }

      enqueueSnackbar("Signed In Successfully", { variant: "success" });
      dispatch(signInSuccess(data));
      setTimeout(() => {
        navigate("/");
      }, 2000);

      return;
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <>
      <div className=" w-96 mx-auto mt-52 mb-56 h-full">
        <SnackbarProvider maxSnack={2} />

        <h2 className="text-2xl font-semibold mb-6">
          Welcome Back👋 , Sign In
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-orange-950"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between bg-white w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-orange-950">
            <input
              type={canUserSeePassword ? "text" : "password"}
              id="password"
              className="w-full outline-none"
              name="password"
              onChange={handleChange}
            />

            {canUserSeePassword ? (
              <IoMdEye
                size={25}
                className="cursor-pointer"
                onClick={() => setCanUserSeePassword(false)}
              />
            ) : (
              <IoMdEyeOff
                size={25}
                className="cursor-pointer"
                onClick={() => setCanUserSeePassword(true)}
              />
            )}
          </div>
          <div className="flex flex-col gap-4 mt-3">
            <button
              disabled={loading}
              type="submit"
              className="bgBaseBrown  text-white p-2 rounded hover:bg-yellow-900 focus:outline-none focus:ring focus:border-orange-950"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
            <OAuth />
          </div>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-800">Sign Up Here</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignIn;
