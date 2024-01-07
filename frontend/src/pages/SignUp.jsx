import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [canUserSeePassword, setCanUserSeePassword] = useState(false);

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
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        enqueueSnackbar(data.message, { variant: "error" });
        setError(data.message);
        return;
      }
      setLoading(false);
      enqueueSnackbar("You're Signed Up", { variant: "success" });
      setError(null);
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
      return;
    } catch (error) {
      setLoading(false);
      setError("Invalid Credentials");
    }
  };
  return (
    <div className=" w-96 mx-auto mt-28 mb-24 h-full p-5 md:p-0">
      <SnackbarProvider />
      <h2 className="text-2xl font-semibold mb-6">Hey there!😀 Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-600 text-md font-medium mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-orange-950"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-600 text-md font-medium mb-1"
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

        <div className="mb-6 ">
          <label
            htmlFor="password"
            className="block text-gray-600 text-md font-medium mb-2"
          >
            Password
          </label>
          <div className="flex items-center justify-between w-full bg-white border border-gray-300 p-2 rounded focus:outline-none focus:border-orange-950">
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
        </div>

        <div className="flex flex-col gap-4">
          <button
            disabled={loading}
            type="submit"
            className="bgBaseBrown  text-white p-2 rounded hover:bg-yellow-900 focus:outline-none focus:ring focus:border-orange-950"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <h5 className="text-center">OR</h5>
          <OAuth />
        </div>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-800">Sign In Here</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
