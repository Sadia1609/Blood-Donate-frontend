import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const Aside = () => {
  const { role } = useContext(AuthContext);

  const handleLogout = ()=>{
    signOut(auth)
  }

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-slate-100 flex flex-col">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-700">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <p className="text-xs text-slate-400 capitalize">{role} dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-2 px-4">

          {/* Dashboard (everyone) */}
          <li>
            <NavLink to="/dashboard" className={navClass}>
              <span>📊</span>
              <span>Dashboard</span>
            </NavLink>
          </li>

          {/* Add Request (DONAR only) */}
          {role === "donar" && (
            <li>
              <NavLink to="/dashboard/add-request" className={navClass}>
                <span>🩸</span>
                <span>Add Request</span>
              </NavLink>
            </li>
          )}

          {/* All Users (ADMIN only) */}
          {role === "admin" && (
            <li>
              <NavLink to="/dashboard/all-users" className={navClass}>
                <span>👥</span>
                <span>All Users</span>
              </NavLink>
            </li>
          )}

          {/* Manage Product (ADMIN only) */}
          {role === "admin" && (
            <li>
              <NavLink to="/dashboard/manage-product" className={navClass}>
                <span>🛒</span>
                <span>Manage Product</span>
              </NavLink>
            </li>
          )}

          {/* Settings (everyone) */}
          <li>
            <NavLink to="/admin/settings" className={navClass}>
              <span>⚙️</span>
              <span>Settings</span>
            </NavLink>
          </li>

        </ul>
      </nav>





      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-700">
        <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg">
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

const navClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-lg transition
   ${isActive ? "bg-slate-800 text-white" : "hover:bg-slate-800 text-slate-300"}`;

export default Aside;
