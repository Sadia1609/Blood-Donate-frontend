import React from "react";
import { NavLink } from "react-router";


const Aside = () => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
     { name: "Add Request", path: "/dashboard/add-request", icon: "📊" },
      { name: "Manage Product", path: "/dashboard/manage-product", icon: "📊" },
    { name: "Users", path: "/admin/users", icon: "👥" },
    { name: "Orders", path: "/admin/orders", icon: "📦" },
    { name: "Products", path: "/admin/products", icon: "🛒" },
    { name: "Reports", path: "/admin/reports", icon: "📈" },
    { name: "Settings", path: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-slate-100 left-0 top-0 flex flex-col">
      
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-wide">Admin Panel</h1>
        <p className="text-xs text-slate-400">Dashboard Control</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition
                  ${
                    isActive
                      ? "bg-slate-800 text-white"
                      : "hover:bg-slate-800 text-slate-300"
                  }`
                }
              >
                <span>{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>




      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-700">
        <button
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default Aside;
