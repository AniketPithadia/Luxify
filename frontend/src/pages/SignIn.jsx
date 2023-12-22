import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
const SignIn = () => {
  const navigate = useNavigate();

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
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
      return;
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <>
      <div className=" w-96 mx-auto mt-16">
        {error && <h3 className="text-red-800">{error}</h3>}
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
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-4">
            <button
              disabled={loading}
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
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
