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
} from "../redux/user/userSlice.js";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState(false);

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

  return (
    <div className="p-3 max-w-lg mx-auto mt-20 mb-40">
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

      {error ? <p className="text-center text-red-700">{error}</p> : ""}
      {updateSuccessMessage ? (
        <p className="text-center mt-3 text-green-700">
          User Updated Succesfully
        </p>
      ) : (
        ""
      )}
      {/* <button
        onClick={handleShowListings}
        className="bg-blue-500 w-full text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Show Listings
      </button> */}
    </div>
  );
};

export default Profile;
