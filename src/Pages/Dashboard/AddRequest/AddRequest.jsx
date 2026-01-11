import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddRequest = () => {
  const { user } = useContext(AuthContext);

  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handleRequest = (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = {
      requester_name: user?.displayName,
      requester_email: user?.email,

      recipient_name: form.recipient_name.value,
      recipient_district: district,
      recipient_upazila: upazila,

      hospital_name: form.hospital_name.value,
      full_address: form.full_address.value,
      blood_group: form.blood_group.value,

      donation_date: form.donationDate.value,
      donation_time: form.donationTime.value,

      request_message: form.requestMessage.value,

      donation_status: "pending",
      createdAt: new Date(),
    };

    axiosSecure
      .post("/requests", formData)
      .then((res) => {
        console.log(res.data);
        alert("Donation request created");
        form.reset();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-red-600 text-center mb-6">
          Blood Donation Request
        </h2>

        <form onSubmit={handleRequest} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Requester Name
              </label>
              <input
                name="requester_name"
                type="text"
                value={user?.displayName}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Requester Email
              </label>
              <input
                name="requester_email"
                type="email"
                value={user?.email}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Recipient Name
            </label>
            <input
              type="text"
              name="recipient_name"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                name="recipient_district"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              >
                <option disabled selected value="">
                  Select Your District
                </option>
                {districts.map((d) => (
                  <option value={d?.name} key={d.id}>
                    {d?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Upazila</label>
              <select
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                name="recipient_upazila"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              >
                <option disabled selected value="">
                  Select Your Upazila
                </option>
                {upazilas.map((u) => (
                  <option value={u?.name} key={u.id}>
                    {u?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Hospital Name
            </label>
            <input
              type="text"
              name="hospital_name"
              placeholder="Dhaka Medical College Hospital"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Full Address
            </label>
            <input
              type="text"
              name="full_address"
              placeholder="Zahir Raihan Rd, Dhaka"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Blood Group
            </label>
            <select
              name="blood_group"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="">Choose Blood Group</option>

              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Donation Date
              </label>
              <input
                type="date"
                name="donationDate"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Donation Time
              </label>
              <input
                type="time"
                name="donationTime"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Request Message
            </label>
            <textarea
              name="requestMessage"
              rows="4"
              required
              placeholder="Explain why blood is needed in detail..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Request Blood
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRequest;
