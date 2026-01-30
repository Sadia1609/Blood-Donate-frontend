import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router";

const MyRequest = () => {
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState("");
  const [totalRequest, setTotalRequest] = useState(0);
  const [myRequests, setMyRequests] = useState([]);
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(
          `/my-request?email=${user.email}&page=${currentPage - 1}&size=${itemsPerPage}&status=${status}`
        )
        .then((res) => {
          setMyRequests(res.data.request);
          setTotalRequest(res.data.totalRequest);
        });
    }
  }, [axiosSecure, currentPage, itemsPerPage, status, user?.email]);



  const numberOfPages = Math.ceil(totalRequest / itemsPerPage);
  
  const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pages.length) setCurrentPage(currentPage + 1);
  };



  const handleStatusUpdate = (id, newStatus) => {
    axiosSecure.patch(`/request-status/${id}`, { status: newStatus }).then(() => {
      if (user?.email) {
        axiosSecure
          .get(
            `/my-request?email=${user.email}&page=${currentPage - 1}&size=${itemsPerPage}&status=${status}`
          )
          .then((res) => {
            setMyRequests(res.data.request);
            setTotalRequest(res.data.totalRequest);
          });
      }
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    axiosSecure.delete(`/requests/${id}`).then(() => {
      if (user?.email) {
        axiosSecure
          .get(
            `/my-request?email=${user.email}&page=${currentPage - 1}&size=${itemsPerPage}&status=${status}`
          )
          .then((res) => {
            setMyRequests(res.data.request);
            setTotalRequest(res.data.totalRequest);
          });
      }
    });
  };

  return (
    <div className="p-3 sm:p-4 md:p-6">

     
      <div className="mb-4 flex justify-end">
        <select
          className="select select-bordered w-full sm:max-w-xs"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      
      <div className="grid gap-4 md:hidden">
        {myRequests.map((request) => (
          <div
            key={request._id}
            className="bg-white rounded-xl shadow p-4 space-y-2"
          >
            <h3 className="font-semibold text-lg">
              {request.recipient_name}
            </h3>

            <p className="text-sm text-gray-600">
              📍 {request.recipient_district}, {request.recipient_upazila}
            </p>

            <p className="text-sm">
              🩸 <b>{request.blood_group}</b>
            </p>

            <p className="text-sm">
              📅 {request.donation_date || "—"} | ⏰{" "}
              {request.donation_time || "—"}
            </p>

            <p className="capitalize font-medium">
              Status: {request.donation_status}
            </p>

            {request.donation_status === "inprogress" && (
              <div className="text-sm text-gray-500">
                <p>{request.requester_name}</p>
                <p>{request.requester_email}</p>
              </div>
            )}

           
            <div className="flex flex-wrap gap-2 pt-2">
              <Link
                to={`/dashboard/request-details/${request._id}`}
                className="btn btn-xs"
              >
                View
              </Link>

              <Link
                to={`/dashboard/edit-request/${request._id}`}
                className="btn btn-xs"
              >
                Edit
              </Link>

              <button
                className="btn btn-xs btn-error"
                onClick={() => handleDelete(request._id)}
              >
                Delete
              </button>

              {request.donation_status === "inprogress" && (
                <>
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() =>
                      handleStatusUpdate(request._id, "done")
                    }
                  >
                    Done
                  </button>
                  <button
                    className="btn btn-xs btn-warning"
                    onClick={() =>
                      handleStatusUpdate(request._id, "canceled")
                    }
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
              <th>Donar Info</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {myRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.recipient_name}</td>
                <td>
                  {request.recipient_district},{" "}
                  {request.recipient_upazila}
                </td>
                <td>{request.donation_date || "—"}</td>
                <td>{request.donation_time || "—"}</td>
                <td>{request.blood_group}</td>
                <td className="capitalize">
                  {request.donation_status}
                </td>

                <td>
                  {request.donation_status === "inprogress" ? (
                    <div className="text-sm">
                      <p>{request.requester_name}</p>
                      <p className="text-gray-500">
                        {request.requester_email}
                      </p>
                    </div>
                  ) : (
                    "—"
                  )}
                </td>

                <td>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Link
                      to={`/dashboard/request-details/${request._id}`}
                      className="btn btn-xs"
                    >
                      View
                    </Link>

                    <Link
                      to={`/dashboard/edit-request/${request._id}`}
                      className="btn btn-xs"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(request._id)}
                    >
                      Delete
                    </button>

                    {request.donation_status === "inprogress" && (
                      <>
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() =>
                            handleStatusUpdate(request._id, "done")
                          }
                        >
                          Done
                        </button>
                        <button
                          className="btn btn-xs btn-warning"
                          onClick={() =>
                            handleStatusUpdate(
                              request._id,
                              "canceled"
                            )
                          }
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
      <div className="flex flex-wrap justify-center mt-8 gap-2">
        <button onClick={handlePrev} className="btn btn-sm">
          Prev
        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={`btn btn-sm ${
              page === currentPage
                ? "bg-[#435585] text-white"
                : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button onClick={handleNext} className="btn btn-sm">
          Next
        </button>
      </div>
    </div>
  );
};

export default MyRequest;


