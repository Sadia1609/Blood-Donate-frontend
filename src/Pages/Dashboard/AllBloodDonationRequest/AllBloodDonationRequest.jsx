import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";

const AllBloodDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useContext(AuthContext);

  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("");
  const [totalRequest, setTotalRequest] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const fetchRequests = () => {
    axiosSecure
      .get(
        `/all-requests?page=${currentPage - 1}&size=${itemsPerPage}${
          status ? `&status=${status}` : ""
        }`
      )
      .then((res) => {
        setRequests(res.data.request);
        setTotalRequest(res.data.totalRequest);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, [axiosSecure, currentPage, status]);

  const handleStatusUpdate = (id, newStatus) => {
    axiosSecure
      .patch(`/request-status/${id}`, { status: newStatus })
      .then(() => fetchRequests());
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;
    axiosSecure.delete(`/requests/${id}`).then(fetchRequests);
  };

  const numberOfPages = Math.ceil(totalRequest / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((n) => n + 1);

  return (
    <div className="p-3 sm:p-4 md:p-6">

      {/* FILTER */}
      <div className="mb-4 flex justify-end">
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="select select-bordered w-full sm:max-w-xs"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      
      <div className="grid gap-4 md:hidden">
        {requests.map((req) => (
          <div
            key={req._id}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >
            <h3 className="font-semibold text-lg mb-1">
              {req.recipient_name}
            </h3>

            <p className="text-sm text-gray-600">
              📍 {req.recipient_district}, {req.recipient_upazila}
            </p>

            <p className="text-sm mt-1">
              🩸 <b>{req.blood_group}</b>
            </p>

            <p className="text-sm">
              📅 {req.donation_date || "—"} | ⏰ {req.donation_time || "—"}
            </p>

            <p className="mt-2 capitalize font-medium">
              Status: {req.donation_status}
            </p>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-2 mt-3">
              <Link
                to={`/dashboard/request-details/${req._id}`}
                className="btn btn-xs"
              >
                View
              </Link>

              {role === "admin" && (
                <>
                  <Link
                    to={`/dashboard/edit-request/${req._id}`}
                    className="btn btn-xs"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </>
              )}

              {(role === "admin" || role === "volunteer") &&
                req.donation_status === "inprogress" && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(req._id, "done")}
                      className="btn btn-xs btn-success"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(req._id, "canceled")}
                      className="btn btn-xs btn-warning"
                    >
                      Cancel
                    </button>
                  </>
                )}
            </div>
          </div>
        ))}
      </div>

      
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Blood</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.recipient_name}</td>
                <td>
                  {req.recipient_district}, {req.recipient_upazila}
                </td>
                <td>{req.donation_date || "—"}</td>
                <td>{req.donation_time || "—"}</td>
                <td>{req.blood_group}</td>
                <td className="capitalize font-medium">
                  {req.donation_status}
                </td>

                <td>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Link
                      to={`/dashboard/request-details/${req._id}`}
                      className="btn btn-xs"
                    >
                      View
                    </Link>

                    {role === "admin" && (
                      <>
                        <Link
                          to={`/dashboard/edit-request/${req._id}`}
                          className="btn btn-xs"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(req._id)}
                          className="btn btn-xs btn-error"
                        >
                          Delete
                        </button>
                      </>
                    )}

                    {(role === "admin" || role === "volunteer") &&
                      req.donation_status === "inprogress" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusUpdate(req._id, "done")
                            }
                            className="btn btn-xs btn-success"
                          >
                            Done
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(req._id, "canceled")
                            }
                            className="btn btn-xs btn-warning"
                          >
                            Cancel
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

      {/* PAGINATION */}
      <div className="flex flex-wrap justify-center mt-6 gap-2">
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          className="btn btn-sm"
        >
          Prev
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn btn-sm ${
              page === currentPage ? "bg-[#435585] text-white" : ""
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() =>
            currentPage < pages.length && setCurrentPage(currentPage + 1)
          }
          className="btn btn-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllBloodDonationRequest;
