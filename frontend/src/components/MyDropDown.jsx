import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SnackbarProvider, closeSnackbar, enqueueSnackbar } from "notistack";

import { useState, useEffect, useRef } from "react";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice.js";

export default function MyDropDown({ currentUser }) {
  const [open, setOpen] = useState(false);
  const { _id } = currentUser;
  const dispatch = useDispatch();
  // Creating action for the notistack to show the notification before deleting the user
  const action = (snackbarId) => (
    <>
      <button
        className=" text-red-500 px-4 py-2 rounded-lg mr-4"
        onClick={() => {
          deleteUser();
        }}
      >
        Delete
      </button>
      <button
        className=" text-slate-300 px-4 py-2 rounded-lg"
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        Cancel
      </button>
    </>
  );
  let menuRef = useRef();
  const signOutUser = async () => {
    try {
      setOpen(!open);
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data.message));
    } catch (err) {
      setOpen(!open);
      dispatch(signOutUserFailure(err.message));
    }
  };
  const deleteUser = async () => {
    try {
      setOpen(!open);
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${_id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(null));
    } catch (err) {
      setOpen(!open);
      dispatch(deleteUserFailure(err.message));
    }
  };

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="relative block ">
      <SnackbarProvider />
      <div className="menu-container relative " ref={menuRef}>
        <div
          className="menu-trigger cursor-pointer"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <img
            src={currentUser.avatar}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>

        <div
          className={`dropdown-menu transition-all duration-300 ease-in-out ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="py-1">
            <ul>
              <Link to="/profile">
                <li
                  onClick={() => setOpen(!open)}
                  className="px-4 py-2 text-md "
                >
                  {" "}
                  {currentUser.username}
                </li>
              </Link>
              <Link to="/profile">
                <li
                  onClick={() => setOpen(!open)}
                  className="block px-4 py-2 text-sm text-gray-700  "
                >
                  Profile
                </li>
              </Link>
              <Link to="/create-listing">
                <li
                  onClick={() => setOpen(!open)}
                  className="block px-4 py-2 text-sm text-gray-700  "
                >
                  Post a new Listing
                </li>
              </Link>
              <Link to="/personal-listings">
                <li
                  onClick={() => setOpen(!open)}
                  className="block px-4 py-2 text-sm text-gray-700  "
                >
                  View your Listings
                </li>
              </Link>
              <li
                onClick={signOutUser}
                className="block px-4 py-2 text-sm text-gray-700  "
              >
                Logout
              </li>

              <li
                onClick={() =>
                  enqueueSnackbar(
                    "Are you sure, you want to delete your account?",
                    {
                      action,
                    }
                  )
                }
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-900"
              >
                Delete Account
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
