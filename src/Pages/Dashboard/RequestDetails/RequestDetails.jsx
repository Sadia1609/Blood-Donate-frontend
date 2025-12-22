import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/requests/${id}`).then((res) => {
      setRequest(res.data);
    });
  }, [id, axiosSecure]);

  if (!request) return <p className="text-center">Loading...</p>;

  return (
    <div className="flex justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6 space-y-6">

      
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Donation Request Details
          </h2>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize
              ${
                request.donation_status === "pending" && "bg-yellow-100 text-yellow-700"
              }
              ${
                request.donation_status === "inprogress" && "bg-blue-100 text-blue-700"
              }
              ${
                request.donation_status === "done" && "bg-green-100 text-green-700"
              }
              ${
                request.donation_status === "canceled" && "bg-red-100 text-red-700"
              }
            `}
          >
            {request.donation_status}
          </span>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-semibold">Recipient Name:</span>{" "}
            {request.recipient_name}
          </p>

          <p>
            <span className="font-semibold">Blood Group:</span>{" "}
            {request.blood_group}
          </p>

          <p>
            <span className="font-semibold">District:</span>{" "}
            {request.recipient_district}
          </p>

          <p>
            <span className="font-semibold">Upazila:</span>{" "}
            {request.recipient_upazila}
          </p>

          <p>
            <span className="font-semibold">Donation Date:</span>{" "}
            {request.donation_date || "—"}
          </p>

          <p>
            <span className="font-semibold">Donation Time:</span>{" "}
            {request.donation_time || "—"}
          </p>

          <p className="sm:col-span-2">
            <span className="font-semibold">Hospital Name:</span>{" "}
            {request.hospital_name}
          </p>

          <p className="sm:col-span-2">
            <span className="font-semibold">Full Address:</span>{" "}
            {request.full_address}
          </p>
        </div>

      
        <div>
          <p className="font-semibold text-gray-800 mb-1">
            Request Message:
          </p>
          <p className="bg-gray-100 rounded-md p-4 text-gray-700 whitespace-pre-line">
            {request.request_message}
          </p>
        </div>

      </div>
    </div>
  );
};

export default RequestDetails;
