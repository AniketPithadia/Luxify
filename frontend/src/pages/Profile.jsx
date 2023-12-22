import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase.js";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(filePerc);
  console.log(formData);

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
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-3">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/.*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full w-24 h-24 object-cover hover:cursor-pointer self-center mt-3"
        />

        <input
          type="text"
          id="username"
          placeholder="Username"
          name="username"
          className="mt-3 w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          name="email"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          name="password"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 w-full text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Update
        </button>
      </form>
      <div className="mt-3">
        <button
          type="submit"
          className="bg-red-800 w-full text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Delete Account
        </button>
        <button
          type="submit"
          className="mt-4 bg-slate-500 w-full text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
