import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const SearchRequest = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const axiosInstance = useAxios();

  useEffect(() => {
    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });

    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const bloodGroup = e.target.blood.value;

    setLoading(true);
    setSearched(true);

    axiosInstance
      .get(
        `/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`
      )
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <form
        onSubmit={handleSearch}
        className="grid gap-4 md:grid-cols-4 bg-white p-6 rounded-2xl shadow"
      >
        <select name="blood" required className="select select-bordered">
          <option value="">Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>

        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="select select-bordered"
        >
          <option value="">District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
          className="select select-bordered"
        >
          <option value="">Upazila</option>
          {upazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        <button className="btn btn-error">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="mt-12">
        {!loading && searched && results.length === 0 && (
          <p className="text-center text-gray-500">
            No donation request found.
          </p>
        )}

        {!loading && results.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((req) => (
              <div
                key={req._id}
                className="bg-white border rounded-2xl p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {req.recipient_name}
                  </h3>

                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-semibold">
                    {req.blood_group}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    📍 <b>Location:</b> {req.recipient_district},{" "}
                    {req.recipient_upazila}
                  </p>
                  <p>
                    🏥 <b>Hospital:</b> {req.hospital_name}
                  </p>
                  <p>
                    📅 <b>Date:</b> {req.donation_date || "N/A"}
                  </p>
                  <p>
                    ⏰ <b>Time:</b> {req.donation_time || "N/A"}
                  </p>
                </div>

                <div className="mt-5 flex justify-between items-center">
                  <span
                    className={`px-3 py-1 text-xs rounded-full capitalize
                      ${
                        req.donation_status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : req.donation_status === "inprogress"
                          ? "bg-blue-100 text-blue-700"
                          : req.donation_status === "done"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {req.donation_status}
                  </span>

                  <span className="text-red-600 text-sm font-medium"></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchRequest;
