import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { 
  FaTint, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaCheck, 
  FaTimes,
  FaFilter,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

const AllBloodDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useContext(AuthContext);

  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("");
  const [totalRequest, setTotalRequest] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;

  // Color theme matching project
  const colors = {
    primary: '#818281',
    accent: '#871e14',
    dark: '#211e1e',
    light: '#fdfdfd'
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get(
        `/all-requests?page=${currentPage - 1}&size=${itemsPerPage}${
          status ? `&status=${status}` : ""
        }`
      );
      setRequests(response.data.request);
      setTotalRequest(response.data.totalRequest);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [axiosSecure, currentPage, status]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/request-status/${id}`, { status: newStatus });
      fetchRequests();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await axiosSecure.delete(`/requests/${id}`);
      fetchRequests();
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inprogress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'done': return 'bg-green-100 text-green-800 border-green-200';
      case 'canceled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const numberOfPages = Math.ceil(totalRequest / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((n) => n + 1);

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
            <FaTint className="text-xl" style={{ color: colors.accent }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: colors.dark }}>
              All Blood Donation Requests
            </h1>
            <p className="text-gray-600">Manage and track all donation requests</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex justify-end">
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-500" />
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="select select-bordered w-full sm:max-w-xs bg-white"
              style={{ borderColor: colors.primary }}
            >
              <option value="">All Status ({totalRequest})</option>
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="grid gap-4 md:hidden">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg" style={{ color: colors.dark }}>
                {req.recipient_name}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(req.donation_status)}`}>
                {req.donation_status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                📍 {req.recipient_district}, {req.recipient_upazila}
              </p>
              <p className="text-sm flex items-center gap-2">
                🩸 <span className="font-medium" style={{ color: colors.accent }}>
                  {req.blood_group}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                📅 {req.donation_date || "—"} | ⏰ {req.donation_time || "—"}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Link
                to={`/dashboard/request-details/${req._id}`}
                className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                <FaEye className="text-xs" />
                View
              </Link>

              {role === "admin" && (
                <>
                  <Link
                    to={`/dashboard/edit-request/${req._id}`}
                    className="flex items-center gap-2 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors"
                  >
                    <FaEdit className="text-xs" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                  >
                    <FaTrash className="text-xs" />
                    Delete
                  </button>
                </>
              )}

              {(role === "admin" || role === "volunteer") &&
                req.donation_status === "inprogress" && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(req._id, "done")}
                      className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                    >
                      <FaCheck className="text-xs" />
                      Done
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(req._id, "canceled")}
                      className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                    >
                      <FaTimes className="text-xs" />
                      Cancel
                    </button>
                  </>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead style={{ backgroundColor: `${colors.accent}08` }}>
              <tr>
                <th className="text-left py-4 px-6" style={{ color: colors.dark }}>Recipient</th>
                <th className="text-left py-4 px-6" style={{ color: colors.dark }}>Location</th>
                <th className="text-left py-4 px-6" style={{ color: colors.dark }}>Date</th>
                <th className="text-left py-4 px-6" style={{ color: colors.dark }}>Time</th>
                <th className="text-left py-4 px-6" style={{ color: colors.dark }}>Blood</th>
                <th className="text-left py-4 px-6" style={{ color: colors.dark }}>Status</th>
                <th className="text-center py-4 px-6" style={{ color: colors.dark }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req, index) => (
                <tr 
                  key={req._id} 
                  className={`hover:bg-gray-50 transition-colors ${index !== requests.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <td className="py-4 px-6">
                    <span className="font-semibold" style={{ color: colors.dark }}>
                      {req.recipient_name}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {req.recipient_district}, {req.recipient_upazila}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{req.donation_date || "—"}</td>
                  <td className="py-4 px-6 text-gray-600">{req.donation_time || "—"}</td>
                  <td className="py-4 px-6">
                    <span className="font-bold" style={{ color: colors.accent }}>
                      {req.blood_group}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(req.donation_status)}`}>
                      {req.donation_status}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/dashboard/request-details/${req._id}`}
                        className="btn btn-sm btn-ghost text-blue-600 hover:bg-blue-50"
                        title="View Details"
                      >
                        <FaEye />
                      </Link>

                      {role === "admin" && (
                        <>
                          <Link
                            to={`/dashboard/edit-request/${req._id}`}
                            className="btn btn-sm btn-ghost text-yellow-600 hover:bg-yellow-50"
                            title="Edit Request"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(req._id)}
                            className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50"
                            title="Delete Request"
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}

                      {(role === "admin" || role === "volunteer") &&
                        req.donation_status === "inprogress" && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(req._id, "done")}
                              className="btn btn-sm btn-ghost text-green-600 hover:bg-green-50"
                              title="Mark as Done"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(req._id, "canceled")}
                              className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50"
                              title="Cancel Request"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {requests.length === 0 && (
        <div className="text-center py-12">
          <FaTint className="mx-auto text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Requests Found</h3>
          <p className="text-gray-500">No donation requests match the current filter criteria.</p>
        </div>
      )}

      {/* Pagination */}
      {numberOfPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-sm bg-white border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>

            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`btn btn-sm ${
                  page === currentPage 
                    ? 'text-white' 
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
                style={page === currentPage ? { backgroundColor: colors.accent } : {}}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => currentPage < numberOfPages && setCurrentPage(currentPage + 1)}
              disabled={currentPage === numberOfPages}
              className="btn btn-sm bg-white border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBloodDonationRequest;
