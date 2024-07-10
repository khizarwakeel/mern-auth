import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <nav className="bg-gray-200">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-5 md:py-3 py-5">
        <Link to={"/"} className="flex items-center gap-2">
          <div>
            <img
              src="/assets/logo.png"
              alt="MERN Auth"
              className="md:w-12 w-10"
            />
          </div>
          <div>
            <h4 className="md:text-3xl text-xl font-semibold">MERN Auth</h4>
          </div>
        </Link>
        <div>
          <ul className="flex items-center md:gap-10 gap-3 text-gray-60 text-base">
            {currentUser ? (
              <Link to={"/profile"} className="hover:text-[#2680f0]">
                <img
                  src={currentUser.profilePicture}
                  alt={currentUser.username}
                  title={currentUser.username}
                  className="h-14 w-14 rounded-full object-cover bg-teal-700"
                />
              </Link>
            ) : (
              <Link to={"/sign-in"} className="hover:text-[#2680f0]">
                <li>Sign in</li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;