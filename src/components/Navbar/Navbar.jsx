import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const logout = () => {
    signOut(auth);
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "font-semibold text-red-600" : "text-gray-600";

  return (
    <div className="navbar bg-base-100 shadow sticky top-0 z-50 px-4">
     
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to="/donation-requests">Donation Requests</NavLink>
            </li>
            {user && (
              <li>
              <NavLink to="/donate">Funding</NavLink>
            </li>
            )}
            {!user && (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </div>

        <Link to="/" className="text-xl font-bold text-red-600">
          BloodDonate
        </Link>
      </div>

      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4">
          <li>
            <NavLink to="/donation-requests" className={navLinkClass}>
              Donation Requests
            </NavLink>
          </li>
         {user && (
    <li>
      <NavLink to="/donate" className={navLinkClass}>
        Funding
      </NavLink>
    </li>
  )}
        </ul>
      </div>

      
      <div className="navbar-end gap-3">
        {!user ? (
          <Link to="/login" className="btn btn-sm btn-outline">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/MBtjqXQ/no-avatar.gif"
                  }
                  alt="avatar"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 shadow rounded-box w-40 mt-3"
            >
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

