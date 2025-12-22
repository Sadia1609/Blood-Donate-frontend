import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const MainDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/my-request?page=0&size=3")
      .then((res) => setRequests(res.data.request));
  }, [axiosSecure]);


  


  //done
  const handleStatusUpdate = (id, status) => {
  axiosSecure
    .patch(`/request-status/${id}`, { status })
    .then(() => {
      // refetch data
      axiosSecure
        .get("/my-request?page=0&size=3")
        .then((res) => setRequests(res.data.request));
    });
};


//delete

const handleDelete = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this donation request?"
  );

  if (!confirmDelete) return;

  axiosSecure.delete(`/requests/${id}`).then(() => {
    // 🔥 remove only deleted item from dashboard state
    setRequests((prev) =>
      prev.filter((request) => request._id !== id)
    );
  });
};



  return (
    <div>
      {/* Welcome */}
      <h2 className="text-2xl font-bold mb-6">
        Welcome, {user?.displayName} 👋
      </h2>

      {/* Recent Requests */}
      {requests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            My Recent Donation Requests
          </h3>

          <div className="overflow-x-auto">
  <table className="table">
    <thead>
      <tr>
        <th>Recipient Name</th>
        <th>Recipient Location</th>
        <th>Donation Date</th>
        <th>Donation Time</th>
        <th>Blood Group</th>
        <th>Status</th>
        <th>Donor Info</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {requests.map((req) => (
        <tr key={req._id}>
          {/* Recipient Name */}
          <td>{req.recipient_name}</td>

          {/* Location */}
          <td>
            {req.recipient_district}, {req.recipient_upazila}
          </td>

          {/* Date */}
          <td>{req.donation_date || "—"}</td>

          {/* Time */}
          <td>{req.donation_time || "—"}</td>

          {/* Blood */}
          <td>{req.blood_group}</td>

          {/* Status */}
          <td className="capitalize font-medium">
            {req.donation_status}
          </td>

          {/* Donor Info (ONLY inprogress) */}
          <td>
            {req.donation_status === "inprogress" ? (
              <div className="text-sm">
                <p>{req.requester_name}</p>
                <p className="text-gray-500">{req.requester_email}</p>
              </div>
            ) : (
              "—"
            )}
          </td>

          {/* Actions */}
          <td className="flex flex-wrap gap-2">
            {/* View */}
            <Link
              to={`/dashboard/request-details/${req._id}`}
              className="btn btn-xs"
            >
              View
            </Link>

            {/* Edit */}
           <Link
  to={`/dashboard/edit-request/${req._id}`}
  className="btn btn-xs"
>
  Edit
</Link>


            {/* Delete */}
           <button
  className="btn btn-xs btn-error"
  onClick={() => handleDelete(req._id)}
>
  Delete
</button>

            {/* Done / Cancel (ONLY inprogress) */}
            {req.donation_status === "inprogress" && (
  <>
    <button
      className="btn btn-xs btn-success"
      onClick={() => handleStatusUpdate(req._id, "done")}
    >
      Done
    </button>
    <button
      className="btn btn-xs btn-warning"
      onClick={() => handleStatusUpdate(req._id, "canceled")}
    >
      Cancel
    </button>
  </>
)}

          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


          <Link
            to="/dashboard/my-donation-request"
            className="btn btn-sm mt-4"
          >
            View My All Requests
          </Link>
        </div>
      )}
    </div>
  );
};

export default MainDashboard;
