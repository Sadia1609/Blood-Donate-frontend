import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const Funding = () => {
  const axiosSecure = useAxiosSecure();
  const [fundings, setFundings] = useState([]);

  useEffect(() => {
    axiosSecure.get("/fundings").then((res) => {
      setFundings(res.data || []);
    });
  }, [axiosSecure]);

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-bold">
          Funding History
        </h2>

        <Link to="/donate" className="btn btn-error btn-sm sm:btn-md">
          💖 Give Fund
        </Link>
      </div>

      {/* ================= MOBILE VIEW (CARDS) ================= */}
      <div className="grid gap-4 md:hidden">
        {fundings.length > 0 ? (
          fundings.map((fund, index) => (
            <div
              key={fund._id}
              className="bg-white rounded-xl shadow p-4 space-y-2"
            >
              {/* INDEX */}
              <p className="text-xs text-gray-400">
                #{index + 1}
              </p>

              {/* NAME & AMOUNT */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">
                  {fund.donarName || "Anonymous"}
                </h3>
                <span className="text-sm font-bold text-green-600">
                  ৳{fund.amount}
                </span>
              </div>

              {/* EMAIL */}
              <p className="text-sm text-gray-500 break-all">
                {fund.donarEmail}
              </p>

              {/* DATE */}
              <p className="text-sm">
                📅{" "}
                {fund.paidAt
                  ? new Date(fund.paidAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">
            No funding data found
          </p>
        )}
      </div>

      {/* ================= TABLET & DESKTOP VIEW ================= */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Donor Name</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {fundings.length > 0 ? (
              fundings.map((fund, index) => (
                <tr key={fund._id}>
                  <td>{index + 1}</td>
                  <td className="font-medium">
                    {fund.donarName || "Anonymous"}
                  </td>
                  <td className="break-all">{fund.donarEmail}</td>
                  <td className="font-semibold text-green-600">
                    ৳{fund.amount}
                  </td>
                  <td>
                    {fund.paidAt
                      ? new Date(fund.paidAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No funding data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Funding;
