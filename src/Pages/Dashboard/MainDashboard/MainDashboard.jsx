import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { 
  FaUsers, 
  FaDollarSign, 
  FaTint, 
  FaChartBar,
  FaUserFriends,
  FaHandHoldingHeart,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaEye,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaHourglassHalf
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
  Legend
} from "recharts";

const MainDashboard = () => {
  const { user, role } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [requests, setRequests] = useState([]);
  const [userDashboardData, setUserDashboardData] = useState(null);
  const [userActivities, setUserActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunding: 0,
    totalRequests: 0,
    pending: 0,
    inprogress: 0,
    done: 0,
    canceled: 0,
  });

  // Color theme matching project
  const colors = {
    primary: '#818281',
    accent: '#871e14',
    dark: '#211e1e',
    light: '#fdfdfd'
  };

  // Chart colors for different statuses
  const chartColors = {
    pending: '#f59e0b',
    inprogress: '#3b82f6', 
    done: '#10b981',
    canceled: '#ef4444'
  };

  // Load user dashboard data for donors
  useEffect(() => {
    if (role === "donar" && user?.email) {
      setLoading(true);
      
      // Load dashboard statistics
      axiosSecure
        .get(`/user-dashboard/${user.email}`)
        .then((res) => {
          setUserDashboardData(res.data);
          setRequests(res.data.recentRequests || []);
        })
        .catch((error) => {
          console.error("Error loading user dashboard:", error);
        });

      // Load user activities
      axiosSecure
        .get(`/user-activities/${user.email}?limit=5`)
        .then((res) => {
          setUserActivities(res.data.activities || []);
        })
        .catch((error) => {
          console.error("Error loading user activities:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [axiosSecure, role, user?.email]);

  // Load admin statistics
  useEffect(() => {
    if (role === "admin" || role === "volunteer") {
      setLoading(true);
      axiosSecure.get("/admin-stats").then((res) => {
        setStats(res.data);
        setLoading(false);
      }).catch((error) => {
        console.error("Error loading admin stats:", error);
        setLoading(false);
      });
    }
  }, [axiosSecure, role]);

  // Prepare chart data for user dashboard
  const getUserChartData = () => {
    if (!userDashboardData) return { barData: [], pieData: [], areaData: [] };

    const stats = userDashboardData.statistics;
    
    const barData = [
      { name: "Pending", value: stats.pendingRequests, color: chartColors.pending },
      { name: "In Progress", value: stats.inProgressRequests, color: chartColors.inprogress },
      { name: "Completed", value: stats.completedRequests, color: chartColors.done },
      { name: "Canceled", value: stats.canceledRequests, color: chartColors.canceled },
    ];

    const pieData = [
      { name: "Pending", value: stats.pendingRequests, color: chartColors.pending },
      { name: "In Progress", value: stats.inProgressRequests, color: chartColors.inprogress },
      { name: "Completed", value: stats.completedRequests, color: chartColors.done },
      { name: "Canceled", value: stats.canceledRequests, color: chartColors.canceled },
    ].filter(item => item.value > 0);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const areaData = userDashboardData.monthlyStats?.map(stat => ({
      month: monthNames[stat._id.month - 1],
      requests: stat.count
    })) || [];

    return { barData, pieData, areaData };
  };

  const adminChartData = [
    { label: "Pending", count: stats.pending || 0, color: chartColors.pending },
    { label: "In Progress", count: stats.inprogress || 0, color: chartColors.inprogress },
    { label: "Done", count: stats.done || 0, color: chartColors.done },
    { label: "Canceled", count: stats.canceled || 0, color: chartColors.canceled },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FaClock className="text-yellow-500" />;
      case 'inprogress': return <FaSpinner className="text-blue-500" />;
      case 'done': return <FaCheckCircle className="text-green-500" />;
      case 'canceled': return <FaTimesCircle className="text-red-500" />;
      default: return <FaHourglassHalf className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex items-center gap-3">
          <FaSpinner className="animate-spin text-2xl" style={{ color: colors.accent }} />
          <span className="text-lg">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8 bg-gray-50 min-h-screen">
      
      {/* Welcome Section */}
      <div 
        className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white shadow-lg"
        style={{ 
          background: `linear-gradient(135deg, ${colors.accent} 0%, #a91e1e 100%)`
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <FaUserFriends className="text-xl sm:text-2xl text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
              Welcome back, {user?.displayName || 'User'}! 👋
            </h1>
            <p className="text-white/90 mt-1 text-sm sm:text-base capitalize">
              {role} Dashboard - Making a difference together
            </p>
          </div>
        </div>
      </div>

      {/* Admin Dashboard Content */}
      {(role === "admin" || role === "volunteer") && (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <StatCard 
              title="Total Users" 
              value={stats.totalUsers} 
              icon={<FaUsers className="text-2xl sm:text-3xl" />}
              color={colors.accent}
              bgColor="bg-blue-50"
              textColor="text-blue-600"
            />
            <StatCard 
              title="Total Funding" 
              value={`৳${stats.totalFunding.toLocaleString()}`} 
              icon={<FaDollarSign className="text-2xl sm:text-3xl" />}
              color={colors.accent}
              bgColor="bg-green-50"
              textColor="text-green-600"
            />
            <StatCard 
              title="Blood Requests" 
              value={stats.totalRequests} 
              icon={<FaTint className="text-2xl sm:text-3xl" />}
              color={colors.accent}
              bgColor="bg-red-50"
              textColor="text-red-600"
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2" style={{ color: colors.dark }}>
              <FaHandHoldingHeart style={{ color: colors.accent }} />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Link 
                to="/dashboard/all-users"
                className="p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-red-200 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${colors.accent}15` }}
                  >
                    <FaUsers className="text-sm sm:text-base" style={{ color: colors.accent }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base" style={{ color: colors.dark }}>Manage Users</h4>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">View and manage all users</p>
                  </div>
                </div>
              </Link>

              <Link 
                to="/dashboard/all-blood-donation-request"
                className="p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-red-200 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${colors.accent}15` }}
                  >
                    <FaTint className="text-sm sm:text-base" style={{ color: colors.accent }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base" style={{ color: colors.dark }}>Blood Requests</h4>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">Manage donation requests</p>
                  </div>
                </div>
              </Link>

              <Link 
                to="/dashboard/funding"
                className="p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-red-200 transition-all duration-200 group sm:col-span-2 lg:col-span-1"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${colors.accent}15` }}
                  >
                    <FaDollarSign className="text-sm sm:text-base" style={{ color: colors.accent }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base" style={{ color: colors.dark }}>Funding</h4>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">View funding details</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2" style={{ color: colors.dark }}>
              <FaChartBar style={{ color: colors.accent }} />
              Donation Request Overview
            </h3>

            {loading ? (
              <div className="flex justify-center items-center h-[300px]">
                <div className="flex items-center gap-3">
                  <FaSpinner className="animate-spin text-2xl" style={{ color: colors.accent }} />
                  <span className="text-lg">Loading chart data...</span>
                </div>
              </div>
            ) : (
              <div className="w-full h-[250px] sm:h-[300px] md:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={adminChartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <XAxis 
                      dataKey="label" 
                      fontSize={10} 
                      tick={{ fontSize: 10 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis fontSize={10} tick={{ fontSize: 10 }} />
                    <Tooltip 
                      contentStyle={{ 
                        fontSize: '12px',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="count" fill={colors.accent} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Chart Summary */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{stats.pending || 0}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stats.inprogress || 0}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.done || 0}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{stats.canceled || 0}</div>
                <div className="text-sm text-gray-600">Canceled</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Donor Dashboard Content */}
      {role === "donar" && (
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {/* User Statistics Cards */}
          {userDashboardData && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <StatCard 
                title="Total Requests" 
                value={userDashboardData.statistics.totalRequests} 
                icon={<FaTint className="text-lg sm:text-2xl md:text-3xl" />}
                bgColor="bg-blue-50"
                textColor="text-blue-600"
              />
              <StatCard 
                title="Pending" 
                value={userDashboardData.statistics.pendingRequests} 
                icon={<FaClock className="text-lg sm:text-2xl md:text-3xl" />}
                bgColor="bg-yellow-50"
                textColor="text-yellow-600"
              />
              <StatCard 
                title="In Progress" 
                value={userDashboardData.statistics.inProgressRequests} 
                icon={<FaSpinner className="text-lg sm:text-2xl md:text-3xl" />}
                bgColor="bg-blue-50"
                textColor="text-blue-600"
              />
              <StatCard 
                title="Completed" 
                value={userDashboardData.statistics.completedRequests} 
                icon={<FaCheckCircle className="text-lg sm:text-2xl md:text-3xl" />}
                bgColor="bg-green-50"
                textColor="text-green-600"
              />
            </div>
          )}

          {/* Charts Section */}
          {userDashboardData && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              {/* Bar Chart */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2" style={{ color: colors.dark }}>
                  <FaChartBar className="text-sm sm:text-base" style={{ color: colors.accent }} />
                  <span className="truncate">Request Status Overview</span>
                </h3>
                <div className="w-full h-[200px] sm:h-[250px] md:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getUserChartData().barData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <XAxis 
                        dataKey="name" 
                        fontSize={10} 
                        tick={{ fontSize: 10 }}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={50}
                      />
                      <YAxis fontSize={10} tick={{ fontSize: 10 }} />
                      <Tooltip 
                        contentStyle={{ 
                          fontSize: '12px',
                          borderRadius: '8px',
                          border: 'none',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Bar dataKey="value" fill={colors.accent} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2" style={{ color: colors.dark }}>
                  <FaTint className="text-sm sm:text-base" style={{ color: colors.accent }} />
                  <span className="truncate">Status Distribution</span>
                </h3>
                <div className="w-full h-[200px] sm:h-[250px] md:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getUserChartData().pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius="70%"
                        dataKey="value"
                        label={({ name, value }) => window.innerWidth > 640 ? `${name}: ${value}` : `${value}`}
                        fontSize={10}
                      >
                        {getUserChartData().pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          fontSize: '12px',
                          borderRadius: '8px',
                          border: 'none',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Area Chart - Monthly Trends */}
              {getUserChartData().areaData.length > 0 && (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 xl:col-span-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2" style={{ color: colors.dark }}>
                    <FaCalendarAlt className="text-sm sm:text-base" style={{ color: colors.accent }} />
                    <span className="truncate">Monthly Request Trends</span>
                  </h3>
                  <div className="w-full h-[200px] sm:h-[250px] md:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={getUserChartData().areaData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <XAxis 
                          dataKey="month" 
                          fontSize={10} 
                          tick={{ fontSize: 10 }}
                        />
                        <YAxis fontSize={10} tick={{ fontSize: 10 }} />
                        <Tooltip 
                          contentStyle={{ 
                            fontSize: '12px',
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="requests" 
                          stroke={colors.accent} 
                          fill={`${colors.accent}30`}
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Recent Requests Table */}
          {requests.length > 0 && (
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2" style={{ color: colors.dark }}>
                <FaTint className="text-sm sm:text-base" style={{ color: colors.accent }} />
                <span className="truncate">Recent Donation Requests</span>
              </h3>

              {/* Mobile Cards View */}
              <div className="grid gap-3 sm:gap-4 xl:hidden">
                {requests.map((req) => (
                  <div
                    key={req._id}
                    className="border rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm sm:text-base md:text-lg truncate" style={{ color: colors.dark }}>
                          {req.recipient_name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <FaMapMarkerAlt className="text-xs flex-shrink-0" />
                          <span className="truncate">{req.recipient_district}, {req.recipient_upazila}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        {getStatusIcon(req.donation_status)}
                        <span className="text-xs sm:text-sm font-medium capitalize" style={{ color: colors.accent }}>
                          {req.donation_status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div>
                        <p className="text-gray-500">Blood Group</p>
                        <p className="font-medium" style={{ color: colors.accent }}>
                          {req.blood_group}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Date & Time</p>
                        <p className="font-medium truncate">
                          {req.donation_date} {req.donation_time}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3 sm:mt-4">
                      <Link
                        to={`/dashboard/request-details/${req._id}`}
                        className="flex-1 btn btn-sm text-xs sm:text-sm bg-blue-600 text-white hover:bg-blue-700 border-0"
                      >
                        <FaEye className="mr-1" /> View
                      </Link>
                      <Link
                        to={`/dashboard/edit-request/${req._id}`}
                        className="flex-1 btn btn-sm text-xs sm:text-sm bg-green-600 text-white hover:bg-green-700 border-0"
                      >
                        <FaEdit className="mr-1" /> Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden xl:block overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr style={{ backgroundColor: `${colors.accent}10` }}>
                      <th style={{ color: colors.dark }} className="text-sm">Recipient</th>
                      <th style={{ color: colors.dark }} className="text-sm">Location</th>
                      <th style={{ color: colors.dark }} className="text-sm">Date & Time</th>
                      <th style={{ color: colors.dark }} className="text-sm">Blood Group</th>
                      <th style={{ color: colors.dark }} className="text-sm">Status</th>
                      <th style={{ color: colors.dark }} className="text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req) => (
                      <tr key={req._id} className="hover:bg-gray-50">
                        <td style={{ color: colors.dark }} className="font-medium text-sm">
                          {req.recipient_name}
                        </td>
                        <td className="text-gray-600 text-sm">
                          <div className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-xs" />
                            <span className="truncate">{req.recipient_district}, {req.recipient_upazila}</span>
                          </div>
                        </td>
                        <td className="text-gray-600 text-sm">
                          <div className="flex items-center gap-1">
                            <FaCalendarAlt className="text-xs" />
                            <span className="truncate">{req.donation_date} {req.donation_time}</span>
                          </div>
                        </td>
                        <td>
                          <span className="font-bold text-base" style={{ color: colors.accent }}>
                            {req.blood_group}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(req.donation_status)}
                            <span className="capitalize font-medium text-sm" style={{ color: colors.accent }}>
                              {req.donation_status}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <Link
                              to={`/dashboard/request-details/${req._id}`}
                              className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 border-0"
                            >
                              <FaEye />
                            </Link>
                            <Link
                              to={`/dashboard/edit-request/${req._id}`}
                              className="btn btn-sm bg-green-600 text-white hover:bg-green-700 border-0"
                            >
                              <FaEdit />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/dashboard/my-donation-request"
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg text-sm sm:text-base"
                  style={{ backgroundColor: colors.accent }}
                >
                  View All My Requests
                </Link>
                <Link
                  to="/dashboard/create-donation-request"
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg border-2 font-medium transition-all duration-200 hover:shadow-lg text-sm sm:text-base"
                  style={{ 
                    borderColor: colors.accent, 
                    color: colors.accent,
                    backgroundColor: 'transparent'
                  }}
                >
                  Create New Request
                </Link>
              </div>
            </div>
          )}

          {/* Recent Activities */}
          {userActivities.length > 0 && (
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2" style={{ color: colors.dark }}>
                <FaHandHoldingHeart className="text-sm sm:text-base" style={{ color: colors.accent }} />
                <span className="truncate">Recent Activities</span>
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                {userActivities.map((activity, index) => (
                  <div key={activity.id || index} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base truncate" style={{ color: colors.dark }}>
                        {activity.title}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                        {activity.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt className="flex-shrink-0" />
                          <span className="truncate">{activity.location}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <FaClock className="flex-shrink-0" />
                          <span>{new Date(activity.date).toLocaleDateString()}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <span 
                        className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${colors.accent}15`,
                          color: colors.accent
                        }}
                      >
                        {activity.bloodGroup}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State for New Users */}
          {!userDashboardData?.statistics.totalRequests && (
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 text-center">
              <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-red-50 flex items-center justify-center">
                <FaTint className="text-2xl sm:text-3xl md:text-4xl" style={{ color: colors.accent }} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: colors.dark }}>
                Welcome to Your Dashboard!
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                You haven't created any donation requests yet. Start by creating your first request to help someone in need.
              </p>
              <Link
                to="/dashboard/create-donation-request"
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg text-sm sm:text-base"
                style={{ backgroundColor: colors.accent }}
              >
                Create Your First Request
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Enhanced StatCard component with better responsive design
const StatCard = ({ title, value, icon, bgColor, textColor }) => (
  <div className={`${bgColor} rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-200`}>
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1 truncate">{title}</p>
        <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${textColor} truncate`}>{value}</p>
      </div>
      <div className={`${textColor} opacity-80 flex-shrink-0 ml-2`}>
        {icon}
      </div>
    </div>
  </div>
);

export default MainDashboard;
