import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { 
  FaTint, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaClock, 
  FaHospital,
  FaUser,
  FaEnvelope,
  FaArrowLeft,
  FaEdit
} from "react-icons/fa";

const RequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Color theme matching project
  const colors = {
    primary: '#818281',
    accent: '#871e14',
    dark: '#211e1e',
    light: '#fdfdfd'
  };

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/requests/${id}`);
        setRequest(response.data);
      } catch (error) {
        console.error("Error fetching request details:", error);
        setError("Failed to load request details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRequest();
    }
  }, [id, axiosSecure]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inprogress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'done': return 'bg-green-100 text-green-800 border-green-200';
      case 'canceled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: colors.accent }}></div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="p-6 text-center">
        <div className="max-w-md mx-auto">
          <FaTint className="mx-auto text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Request Not Found</h3>
          <p className="text-gray-500 mb-4">{error || "The requested donation request could not be found."}</p>
          <Link
            to="/dashboard/my-donation-request"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200"
            style={{ backgroundColor: colors.accent }}
          >
            <FaArrowLeft />
            Back to My Requests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link
            to="/dashboard/my-donation-request"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaArrowLeft />
            Back to My Requests
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${colors.accent}15` }}
          >
            <FaTint className="text-xl" style={{ color: colors.accent }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: colors.dark }}>
              Donation Request Details
            </h1>
            <p className="text-gray-600">View complete information about this blood donation request</p>
          </div>
        </div>
      </div>

      {/* Request Details Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: colors.dark }}>
                {request.recipient_name}
              </h2>
              <p className="text-gray-600 mt-1">
                Blood donation request for {request.recipient_name}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(request.donation_status)}`}>
                {request.donation_status}
              </span>
              
              <Link
                to={`/dashboard/edit-request/${request._id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-red-200 transition-all duration-200"
              >
                <FaEdit className="text-sm" />
                Edit
              </Link>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Blood Group */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-red-50">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.accent }}
              >
                <FaTint className="text-white text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Blood Group</p>
                <p className="text-2xl font-bold" style={{ color: colors.accent }}>
                  {request.blood_group}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="text-lg font-semibold text-blue-600">
                  {request.recipient_district}, {request.recipient_upazila}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-green-50">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <FaCalendarAlt className="text-white text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Donation Date</p>
                <p className="text-lg font-semibold text-green-600">
                  {request.donation_date || "Not specified"}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-purple-50">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                <FaClock className="text-white text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Donation Time</p>
                <p className="text-lg font-semibold text-purple-600">
                  {request.donation_time || "Not specified"}
                </p>
              </div>
            </div>

          </div>

          {/* Hospital Information */}
          <div className="mt-6 p-4 rounded-xl bg-gray-50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center flex-shrink-0">
                <FaHospital className="text-white text-xl" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Hospital Information</p>
                <h3 className="text-lg font-semibold" style={{ color: colors.dark }}>
                  {request.hospital_name}
                </h3>
                <p className="text-gray-600 mt-1">
                  {request.full_address}
                </p>
              </div>
            </div>
          </div>

          {/* Requester Information */}
          <div className="mt-6 p-4 rounded-xl bg-gray-50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                <FaUser className="text-white text-xl" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Requested By</p>
                <h3 className="text-lg font-semibold" style={{ color: colors.dark }}>
                  {request.requester_name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <FaEnvelope className="text-gray-400 text-sm" />
                  <p className="text-gray-600">{request.requester_email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Request Message */}
          {request.request_message && (
            <div className="mt-6 p-4 rounded-xl bg-yellow-50">
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.dark }}>
                Request Message
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {request.request_message}
              </p>
            </div>
          )}

          {/* Timestamps */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500">
              <div>
                <span className="font-medium">Created:</span> {' '}
                {new Date(request.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              {request.updatedAt && request.updatedAt !== request.createdAt && (
                <div>
                  <span className="font-medium">Last Updated:</span> {' '}
                  {new Date(request.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RequestDetails;