import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [request, setRequest] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axiosSecure.get(`/requests/${id}`).then((res) => {
      setRequest(res.data);
    });
  }, [id, axiosSecure]);

  if (!request) return <p className="text-center">Loading...</p>;

  const handleConfirmDonation = () => {
    axiosSecure
      .patch(`/donation-confirm/${id}`, {
        donorName: user.displayName,
        donorEmail: user.email,
      })
      .then(() => {
        setRequest({
          ...request,
          donation_status: "inprogress",
          donor_name: user.displayName,
          donor_email: user.email,
        });
        setOpenModal(false);
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow rounded-xl p-6 space-y-3">
        <h2 className="text-2xl font-bold mb-4">
          Donation Request Details
        </h2>

        <p><b>Recipient:</b> {request.recipient_name}</p>
        <p><b>Blood Group:</b> {request.blood_group}</p>
        <p><b>Hospital:</b> {request.hospital_name}</p>
        <p><b>Address:</b> {request.full_address}</p>
        <p><b>Date:</b> {request.donation_date}</p>
        <p><b>Time:</b> {request.donation_time}</p>
        <p><b>Message:</b> {request.request_message}</p>
        <p><b>Status:</b> {request.donation_status}</p>

        {request.donation_status === "pending" && (
          <button
            onClick={() => setOpenModal(true)}
            className="btn btn-error mt-4"
          >
            Donate
          </button>
        )}
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Confirm Donation
            </h3>

            <input
              value={user.displayName}
              readOnly
              className="input input-bordered w-full mb-3"
            />

            <input
              value={user.email}
              readOnly
              className="input input-bordered w-full mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                className="btn btn-outline"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-error"
                onClick={handleConfirmDonation}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
