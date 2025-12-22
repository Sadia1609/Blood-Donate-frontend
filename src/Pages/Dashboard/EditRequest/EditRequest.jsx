import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EditRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    recipient_name: "",
    recipient_district: "",
    recipient_upazila: "",
    hospital_name: "",
    full_address: "",
    blood_group: "",
    donation_date: "",
    donation_time: "",
    request_message: "",
  });

  // 🔹 Load existing request
  useEffect(() => {
    axiosSecure.get(`/requests/${id}`).then((res) => {
      const data = res.data;
      setFormData({
        recipient_name: data.recipient_name,
        recipient_district: data.recipient_district,
        recipient_upazila: data.recipient_upazila,
        hospital_name: data.hospital_name,
        full_address: data.full_address,
        blood_group: data.blood_group,
        donation_date: data.donation_date || "",
        donation_time: data.donation_time || "",
        request_message: data.request_message,
      });
      setLoading(false);
    });
  }, [id, axiosSecure]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Submit update
  const handleSubmit = (e) => {
    e.preventDefault();

    axiosSecure.put(`/requests/${id}`, formData).then(() => {
      alert("Donation request updated successfully");
      navigate("/dashboard/my-donation-request");
    });
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">
        Edit Donation Request
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="recipient_name"
          value={formData.recipient_name}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Recipient Name"
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="recipient_district"
            value={formData.recipient_district}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="District"
            required
          />

          <input
            type="text"
            name="recipient_upazila"
            value={formData.recipient_upazila}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Upazila"
            required
          />
        </div>

        <input
          type="text"
          name="hospital_name"
          value={formData.hospital_name}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Hospital Name"
          required
        />

        <input
          type="text"
          name="full_address"
          value={formData.full_address}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Full Address"
          required
        />

        <select
          name="blood_group"
          value={formData.blood_group}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Blood Group</option>
          <option>A+</option><option>A-</option>
          <option>B+</option><option>B-</option>
          <option>AB+</option><option>AB-</option>
          <option>O+</option><option>O-</option>
        </select>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            name="donation_date"
            value={formData.donation_date}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <input
            type="time"
            name="donation_time"
            value={formData.donation_time}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <textarea
          name="request_message"
          value={formData.request_message}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          rows="4"
          placeholder="Why do you need blood?"
          required
        />

        <button className="btn btn-primary w-full">
          Update Donation Request
        </button>
      </form>
    </div>
  );
};

export default EditRequest;
