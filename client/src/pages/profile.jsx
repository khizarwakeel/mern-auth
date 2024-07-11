import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [uploadProgress, setUploadProgress] = useState(``);
  const [uploadMessage, setUploadMessage] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  console.log(formData);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(`Upload is ${Math.round(progress)}% done`);
        console.log("Upload is " + Math.round(progress) + "% done");
      },
      (error) => {
        setImageError("Upload failed:", error);
      },
      () => {
        setUploadProgress("");
        setUploadMessage(true);
        setTimeout(() => {
          setUploadMessage(false);
        }, 3000);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };
  const navigate = useNavigate();

  const api = `/api/user/update/${currentUser._id}`;
  const headersData = { "Content-Type": "application/json" };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      const res = await fetch(api, {
        method: "POST",
        headers: headersData,
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateUser(true);
      setTimeout(() => {
        setUpdateUser(false);
      }, 3000);
    } catch (error) {
      dispatch(updateUserFailure(data));
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center lg:h-[85vh] h-[88vh] px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            My Profile
          </h2>
        </div>
        <div className="flex justify-center mt-5 mb-2 ">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <span className="border p-1 rounded-full">
            <img
              src={formData.profilePicture || currentUser.profilePicture}
              alt={currentUser.username}
              title={currentUser.username}
              className="w-16 h-16 rounded-full bg-teal-700 cursor-pointer object-cover hover:opacity-80"
              onClick={() => fileRef.current.click()}
            />
          </span>
        </div>
        <div>
          {imageError ? (
            <p className="text-center text-red-700 font-bold">
              Error uploading image
              <br />
              (File size must be less than 2 MB)
            </p>
          ) : (
            <>
              {uploadProgress && (
                <p className="text-center text-teal-700 font-bold">
                  {uploadProgress}
                </p>
              )}
              {uploadMessage && (
                <p className="text-center text-teal-700 font-bold">
                  Upload completed successfully
                </p>
              )}
            </>
          )}
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  defaultValue={currentUser.username}
                  id="username"
                  name="username"
                  onChange={handleChange}
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none pl-2 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  defaultValue={currentUser.email}
                  id="email"
                  name="email"
                  onChange={handleChange}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none pl-2 sm:text-sm sm:leading-6"
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
                  onChange={handleChange}
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none pl-2 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                disabled={loading}
                type="submit"
                className="flex w-full justify-center uppercase rounded-md bg-[#2680f0] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2680f0]"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
          <div className="flex justify-between gap-5 mt-6">
            <div className="w-full">
              <button
                type="submit"
                className="uppercase bg-red-700 text-white rounded-md w-full px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2680f0]"
              >
                Delete
              </button>
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="uppercase bg-red-700 text-white rounded-md w-full px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2680f0]"
              >
                Sign Out
              </button>
            </div>
          </div>
          {error && (
            <div
              className="flex mt-5 justify-center items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>Something went wrong!</div>
            </div>
          )}
          {updateUser && (
            <div
              className="flex mt-5 justify-center items-center p-4 mb-4 text-sm bg-teal-700 rounded-lg text-white"
              role="alert"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
              <span className="sr-only">Success</span>
              <div>User updated successfully!</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}