import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../Provider/AuthProvider";

const PublicRequests = () => {
  const axiosInstance = useAxios();
  const [requests, setRequests] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("/public-requests").then((res) => {
      setRequests(res.data);
    });
  }, [axiosInstance]);

  const handleView = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/dashboard/request-details/${id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Pending Blood Donation Requests
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {requests.map((req) => (
          <div
            key={req._id}
            className="border rounded-xl p-6 bg-white hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold mb-2">
              {req.recipient_name}
            </h3>

            <p className="text-sm text-gray-600 mb-1">
              📍 {req.recipient_district}, {req.recipient_upazila}
            </p>

            <p className="text-sm mb-1">
              🩸 <b>{req.blood_group}</b>
            </p>

            <p className="text-sm">
              📅 {req.donation_date} | ⏰ {req.donation_time}
            </p>

            <button
              onClick={() => handleView(req._id)}
              className="btn btn-error btn-sm mt-4 w-full"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicRequests;
