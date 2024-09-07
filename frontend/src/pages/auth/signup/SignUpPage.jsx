import { Link } from "react-router-dom";
import { useState } from "react";

// TODO - add terms of service and privacy policy links
// TODO - add email verification

import UploreLogoSvg from "../../../components/svgs/uplore_logo";
import UploreHeaderSvg from "../../../components/svgs/uplore_header";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isError = false;

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col items-center h-screen px-10">
      <div className="flex items-center justify-center mt-20">
        <Link to="/">
          <UploreLogoSvg className="w-24 fill-black dark:fill-white" />
        </Link>
        <Link to="/">
          <UploreHeaderSvg className="w-48 fill-black dark:fill-white ml-4" />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center mt-20 w-full">
        <form
          className="w-full max-w-md mx-auto flex gap-6 flex-col"
          onSubmit={handleSubmit}
        >
          <h1 className="text-5xl font-extrabold text-black dark:text-white text-center">
            Create an account
          </h1>
          <label className="input input-bordered rounded flex items-center gap-2 text-lg text-black dark:text-white">
            <MdOutlineMail className="text-black dark:text-white" />
            <input
              type="email"
              className="grow p-3 text-black dark:text-white"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </label>
          <label className="input input-bordered rounded flex items-center gap-2 text-lg text-black dark:text-white">
            <FaUser className="text-black dark:text-white" />
            <input
              type="text"
              className="grow p-3 text-black dark:text-white"
              placeholder="Username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
            />
          </label>
          <label className="input input-bordered rounded flex items-center gap-2 text-lg text-black dark:text-white">
            <MdPassword className="text-black dark:text-white" />
            <input
              type="password"
              className="grow p-3 text-black dark:text-white"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button className="btn rounded-full btn-primary text-white text-lg">
            Sign up
          </button>
          {isError && <p className="text-red-500">Something went wrong</p>}
        </form>
        <div className="flex flex-col gap-4 mt-8 w-full max-w-md">
          <p className="text-black dark:text-white text-lg text-center">
            Already have an account?
          </p>
          <Link to="/login">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full text-lg">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
