import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { 
  FaUsers, 
  FaUserShield, 
  FaUserTie, 
  FaHandsHelping,
  FaBan,
  FaCheck,
  FaEllipsisV
} from "react-icons/fa";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: loggedInUser } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Color theme matching project
  const colors = {
    primary: '#818281',
    accent: '#871e14',
    dark: '#211e1e',
    light: '#fdfdfd'
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get(`/users${statusFilter ? `?status=${statusFilter}` : ""}`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure, statusFilter]);

  const handleStatusChange = async (email, status) => {
    try {
      await axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleRoleChange = async (email, role) => {
    try {
      await axiosSecure.patch(`/update/user/role?email=${email}&role=${role}`);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <FaUserShield className="text-purple-600" />;
      case 'volunteer': return <FaHandsHelping className="text-blue-600" />;
      default: return <FaUsers className="text-green-600" />;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'volunteer': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: colors.accent }}></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${colors.accent}15` }}
          >
            <FaUsers className="text-xl" style={{ color: colors.accent }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: colors.dark }}>All Users</h1>
            <p className="text-gray-600">Manage user accounts and permissions</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-bordered w-full sm:max-w-xs bg-white"
            style={{ borderColor: colors.primary }}
          >
            <option value="">All Users ({users.length})</option>
            <option value="active">Active Users</option>
            <option value="blocked">Blocked Users</option>
          </select>
        </div>
      </div>

      {/* Mobile View */}
      <div className="grid gap-4 md:hidden">
        {users.map((user) => (
          <div
            key={user?.email}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-200"
          >
            {/* User Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img
                  src={user?.mainPhotoUrl || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                  className="w-16 h-16 rounded-full object-cover border-2"
                  style={{ borderColor: `${colors.accent}30` }}
                  alt={user?.name}
                />
                <div className="absolute -bottom-1 -right-1">
                  {getRoleIcon(user?.role)}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg" style={{ color: colors.dark }}>
                  {user?.name}
                </h3>
                <p className="text-gray-600 text-sm">{user?.email}</p>
              </div>
            </div>

            {/* Role & Status Badges */}
            <div className="flex gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user?.role)}`}>
                {user?.role}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  user?.status === "active" 
                    ? "bg-green-100 text-green-800 border-green-200" 
                    : "bg-red-100 text-red-800 border-red-200"
                }`}
              >
                {user?.status}
              </span>
            </div>

            {/* Actions */}
            {user?.email !== loggedInUser?.email && (
              <div className="flex flex-wrap gap-2">
                {user?.status === "active" ? (
                  <button
                    onClick={() => handleStatusChange(user?.email, "blocked")}
                    className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                  >
                    <FaBan className="text-xs" />
                    Block
                  </button>
                ) : (
                  <button
                    onClick={() => handleStatusChange(user?.email, "active")}
                    className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                  >
                    <FaCheck className="text-xs" />
                    Unblock
                  </button>
                )}

                {user?.role === "donar" && (
                  <button
                    onClick={() => handleRoleChange(user?.email, "volunteer")}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                  >
                    <FaHandsHelping className="text-xs" />
                    Make Volunteer
                  </button>
                )}

                {user?.role !== "admin" && (
                  <button
                    onClick={() => handleRoleChange(user?.email, "admin")}
                    className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                  >
                    <FaUserShield className="text-xs" />
                    Make Admin
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead style={{ backgroundColor: `${colors.accent}08` }}>
              <tr>
                <th className="text-left py-4 px-6" style={{ color: colors.dark }}>User</th>
                <th className="text-left py-4 px-6" style={{ color: colors.dark }}>Role</th>
                <th className="text-left py-4 px-6" style={{ color: colors.dark }}>Status</th>
                <th className="text-center py-4 px-6" style={{ color: colors.dark }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr 
                  key={user?.email} 
                  className={`hover:bg-gray-50 transition-colors ${index !== users.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={user?.mainPhotoUrl || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                          className="w-12 h-12 rounded-full object-cover border-2"
                          style={{ borderColor: `${colors.accent}30` }}
                          alt={user?.name}
                        />
                        <div className="absolute -bottom-1 -right-1">
                          {getRoleIcon(user?.role)}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-lg" style={{ color: colors.dark }}>
                          {user?.name}
                        </p>
                        <p className="text-gray-600 text-sm">{user?.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleBadgeColor(user?.role)}`}>
                      {user?.role}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${
                        user?.status === "active"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      }`}
                    >
                      {user?.status}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    {user?.email !== loggedInUser?.email ? (
                      <div className="flex justify-center">
                        <div className="dropdown dropdown-left">
                          <label tabIndex={0} className="btn btn-sm btn-ghost">
                            <FaEllipsisV />
                          </label>
                          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52 border">
                            {user?.status === "active" ? (
                              <li>
                                <button
                                  onClick={() => handleStatusChange(user?.email, "blocked")}
                                  className="flex items-center gap-2 text-red-600 hover:bg-red-50"
                                >
                                  <FaBan />
                                  Block User
                                </button>
                              </li>
                            ) : (
                              <li>
                                <button
                                  onClick={() => handleStatusChange(user?.email, "active")}
                                  className="flex items-center gap-2 text-green-600 hover:bg-green-50"
                                >
                                  <FaCheck />
                                  Unblock User
                                </button>
                              </li>
                            )}

                            {user?.role === "donar" && (
                              <li>
                                <button
                                  onClick={() => handleRoleChange(user?.email, "volunteer")}
                                  className="flex items-center gap-2 text-blue-600 hover:bg-blue-50"
                                >
                                  <FaHandsHelping />
                                  Make Volunteer
                                </button>
                              </li>
                            )}

                            {user?.role !== "admin" && (
                              <li>
                                <button
                                  onClick={() => handleRoleChange(user?.email, "admin")}
                                  className="flex items-center gap-2 text-purple-600 hover:bg-purple-50"
                                >
                                  <FaUserShield />
                                  Make Admin
                                </button>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-400 text-sm">
                        Current User
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="text-center py-12">
          <FaUsers className="mx-auto text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Users Found</h3>
          <p className="text-gray-500">No users match the current filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
