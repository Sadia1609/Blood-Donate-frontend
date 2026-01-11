import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: loggedInUser } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchUsers = () => {
    axiosSecure
      .get(`/users${statusFilter ? `?status=${statusFilter}` : ""}`)
      .then((res) => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure, statusFilter]);

  const handleStatusChange = (email, status) => {
    axiosSecure
      .patch(`/update/user/status?email=${email}&status=${status}`)
      .then(() => fetchUsers());
  };

  const handleRoleChange = (email, role) => {
    axiosSecure
      .patch(`/update/user/role?email=${email}&role=${role}`)
      .then(() => fetchUsers());
  };

  console.log(users[0]);

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex justify-end">
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select select-bordered w-full sm:max-w-xs"
        >
          <option value="">All Users</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="grid gap-4 md:hidden">
        {users.map((user) => (
          <div
            key={user?.email}
            className="bg-white rounded-xl shadow p-4 space-y-3"
          >
            {/* USER */}
            <div className="flex items-center gap-3">
              <img
                src={
                  user?.mainPhotoUrl || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"
                }
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            {/* ROLE & STATUS */}
            <div className="flex gap-2 flex-wrap">
              <span className="badge badge-outline capitalize">
                {user?.role}
              </span>
              <span
                className={`badge capitalize ${
                  user?.status === "active" ? "badge-success" : "badge-error"
                }`}
              >
                {user?.status}
              </span>
            </div>

            {/* ACTIONS */}
            {user?.email !== loggedInUser?.email && (
              <div className="flex flex-wrap gap-2">
                {user?.status === "active" ? (
                  <button
                    onClick={() => handleStatusChange(user?.email, "blocked")}
                    className="btn btn-xs btn-error"
                  >
                    Block
                  </button>
                ) : (
                  <button
                    onClick={() => handleStatusChange(user?.email, "active")}
                    className="btn btn-xs btn-success"
                  >
                    Unblock
                  </button>
                )}

                {user?.role === "donar" && (
                  <button
                    onClick={() => handleRoleChange(user?.email, "volunteer")}
                    className="btn btn-xs btn-warning"
                  >
                    Make Volunteer
                  </button>
                )}

                {user?.role !== "admin" && (
                  <button
                    onClick={() => handleRoleChange(user?.email, "admin")}
                    className="btn btn-xs btn-info"
                  >
                    Make Admin
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ========== DESKTOP VIEW (TABLE) ========== */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user?.email}>
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        user?.mainPhotoUrl ||
                        "https://i.ibb.co/MBtjqXQ/no-avatar.gif"
                      }
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </td>

                <td className="capitalize">{user?.role}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                      user?.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user?.status}
                  </span>
                </td>

                <td>
                  {user?.email !== loggedInUser?.email && (
                    <div className="flex flex-wrap justify-center gap-2">
                      {user?.status === "active" ? (
                        <button
                          onClick={() =>
                            handleStatusChange(user?.email, "blocked")
                          }
                          className="btn btn-xs btn-error"
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleStatusChange(user?.email, "active")
                          }
                          className="btn btn-xs btn-success"
                        >
                          Unblock
                        </button>
                      )}

                      {user?.role === "donar" && (
                        <button
                          onClick={() =>
                            handleRoleChange(user?.email, "volunteer")
                          }
                          className="btn btn-xs btn-warning"
                        >
                          Make Volunteer
                        </button>
                      )}

                      {user?.role !== "admin" && (
                        <button
                          onClick={() => handleRoleChange(user?.email, "admin")}
                          className="btn btn-xs btn-info"
                        >
                          Make Admin
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
