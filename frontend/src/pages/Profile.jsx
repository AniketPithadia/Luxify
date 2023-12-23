import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { app } from "../firebase.js";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice.js";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccessMessage(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const deleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(null));
    } catch (err) {
      dispatch(deleteUserFailure(err.message));
    }
  };
  const signOutUser = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data.message));
    } catch (err) {
      dispatch(signOutUserFailure(err.message));
    }
  };
  const handleShowListings = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListings(data);
    } catch (err) {
      setShowListingError(true);
    }
  };
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/.*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full w-24 h-24 object-cover hover:cursor-pointer self-center mt-3"
        />
        {fileUploadError ? (
          <span className="text-center text-red-500">
            Error: Image Not Uploaded(Size should be less than 2MB)
          </span>
        ) : filePerc > 0 && filePerc < 100 ? (
          <span className="text-center text-green-500">{`Uploading ${filePerc}%`}</span>
        ) : filePerc == 100 ? (
          <span className="text-center text-green-500">
            Image Uploaded Successfully
          </span>
        ) : (
          ""
        )}
        <input
          type="text"
          id="username"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          defaultValue={currentUser.username}
          className="mt-3 w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          defaultValue={currentUser.email}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          id="password"
          placeholder="Enter Your New Password"
          name="password"
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-500 w-full text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          {loading ? "Updating ..." : "Update"}
        </button>
      </form>
      <Link to={"/create-listing"}>
        <div className="cursor-pointer mt-3 bg-green-900 w-full text-center uppercase text-white p-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300 ">
          Create a Listing
        </div>
      </Link>
      <div className="flex gap-3 mt-3 text-center">
        <div
          onClick={deleteUser}
          className="bg-red-800 w-full text-white p-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 cursor-pointer"
        >
          Delete Account
        </div>
        <div
          onClick={signOutUser}
          className=" bg-slate-500 w-full text-white p-2 rounded hover:bg-slate-600 focus:outline-none focus:ring focus:border-slate-300 cursor-pointer"
        >
          Sign Out
        </div>
      </div>
      {error ? <p className="text-center text-red-700">{error}</p> : ""}
      {updateSuccessMessage ? (
        <p className="text-center mt-3 text-green-700">
          User Updated Succesfully
        </p>
      ) : (
        ""
      )}
      <button
        onClick={handleShowListings}
        className="bg-blue-500 w-full text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Show Listings
      </button>
      <p className="text-center text-red-700">
        {showListingError ? "Error Fetching Listings" : ""}
      </p>
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col item-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
