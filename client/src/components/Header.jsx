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
              className="md:w-12 w-6"
            />
          </div>
          <div>
            <h4 className="md:text-3xl text-sm">MERN Auth</h4>
          </div>
        </Link>
        <div>
          <ul className="flex items-center md:gap-10 gap-3 text-gray-60 text-sm md:text-base">
            <Link to={"/"} className="hover:text-[#2680f0]">
              <li>Home</li>
            </Link>
            <Link to={"/about"} className="hover:text-[#2680f0]">
              <li>About</li>
            </Link>
            {currentUser ? (
              <Link to={"/profile"} className="hover:text-[#2680f0]">
                <img
                  src={currentUser.profilePicture}
                  alt={currentUser.username}
                  title={currentUser.username}
                  className="md:h-14 md:w-14 h-10 w-10 rounded-full border border-gray-400 p-1 object-cover"
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