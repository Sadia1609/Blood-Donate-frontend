import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MainDashboard = () => {
  const { user, role } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunding: 0,
    totalRequests: 0,
    pending: 0,
    inprogress: 0,
    done: 0,
    canceled: 0,
  });

  

  useEffect(() => {
    if (role === "donor") {
      axiosSecure
        .get("/my-request?page=0&size=3")
        .then((res) => setRequests(res.data.request || []));
    }
  }, [axiosSecure, role]);

  useEffect(() => {
    if (role === "admin" || role === "volunteer") {
      axiosSecure.get("/admin-stats").then((res) => {
        setStats(res.data);
      });
    }
  }, [axiosSecure, role]);



  const chartData = [
    { label: "Pending", count: stats.pending },
    { label: "In Progress", count: stats.inprogress },
    { label: "Done", count: stats.done },
    { label: "Canceled", count: stats.canceled },
  ];

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-10">

      
      <h2 className="text-xl sm:text-2xl font-bold">
        Welcome, {user?.displayName} 👋
      </h2>

      
      {(role === "admin" || role === "volunteer") && (
        <>
        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard title="Total Users" value={stats.totalUsers} />
            <StatCard title="Total Funding" value={`৳${stats.totalFunding}`} />
            <StatCard title="Total Requests" value={stats.totalRequests} />
          </div>

        
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
            <h3 className="text-base sm:text-lg font-semibold mb-4">
              Donation Request Overview
            </h3>

            <div className="w-full h-[260px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#dc2626" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      
      {role === "donor" && requests.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            My Recent Donation Requests
          </h3>

          
          <div className="grid gap-4 md:hidden">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-xl shadow p-4 space-y-1"
              >
                <p className="font-semibold">{req.recipient_name}</p>
                <p className="text-sm text-gray-500">
                  📍 {req.recipient_district}, {req.recipient_upazila}
                </p>
                <p className="text-sm">
                  🩸 {req.blood_group}
                </p>
                <p className="text-sm">
                  📅 {req.donation_date} ⏰ {req.donation_time}
                </p>
                <p className="capitalize text-sm font-medium">
                  Status: {req.donation_status}
                </p>
              </div>
            ))}
          </div>

         
          <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.recipient_name}</td>
                    <td>
                      {req.recipient_district}, {req.recipient_upazila}
                    </td>
                    <td>{req.donation_date}</td>
                    <td>{req.donation_time}</td>
                    <td>{req.blood_group}</td>
                    <td className="capitalize font-medium">
                      {req.donation_status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link
            to="/dashboard/my-donation-request"
            className="btn btn-sm w-full sm:w-fit"
          >
            View My All Requests
          </Link>
        </div>
      )}
    </div>
  );
};


const StatCard = ({ title, value }) => (
  <div className="bg-white shadow rounded-xl p-4 sm:p-6 text-center">
    <h3 className="text-2xl sm:text-3xl font-bold">{value}</h3>
    <p className="text-gray-500 text-sm sm:text-base">{title}</p>
  </div>
);

export default MainDashboard;
