import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Footer from "../../components/Footer/Footer";
import { 
  FaTint, 
  FaHospital, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaClock, 
  FaUser, 
  FaEnvelope,
  FaCommentDots,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaHourglassHalf
} from "react-icons/fa";

const DonationRequestDetails = () => {
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
    if (id) {
      axiosSecure
        .get(`/requests/${id}`)
        .then((res) => {
          setRequest(res.data);
          setError(null);
        })
        .catch((err) => {
          console.error("Error fetching request details:", err);
          setError("Failed to load request details. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, axiosSecure]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FaHourglassHalf className="text-yellow-500" />;
      case 'inprogress': return <FaSpinner className="text-blue-500" />;
      case 'done': return <FaCheckCircle className="text-green-500" />;
      case 'canceled': return <FaTimesCircle className="text-red-500" />;
      default: return <FaHourglassHalf className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'inprogress': return 'text-blue-600 bg-blue-50';
      case 'done': return 'text-green-600 bg-green-50';
      case 'canceled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex items-center gap-3">
          <FaSpinner className="animate-spin text-2xl" style={{ color: colors.accent }} />
          <span className="text-lg">Loading request details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <FaTimesCircle className="text-4xl text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-700 mb-2">Error Loading Request</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn bg-red-600 text-white hover:bg-red-700 border-0"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
          <FaTimesCircle className="text-4xl text-gray-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700 mb-2">Request Not Found</h2>
          <p className="text-gray-600">The requested donation request could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-lg rounded-xl sm:rounded-2xl overflow-hidden">
        {/* Header */}
        <div 
          className="p-4 sm:p-6 text-white"
          style={{ 
            background: `linear-gradient(135deg, ${colors.accent} 0%, #a91e1e 100%)`
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center">
              <FaTint className="text-xl sm:text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                Donation Request Details
              </h1>
              <p className="text-white/90 text-sm sm:text-base">
                Blood donation request information
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Status Badge */}
          <div className="mb-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium ${getStatusColor(request.donation_status)}`}>
              {getStatusIcon(request.donation_status)}
              <span className="capitalize">Status: {request.donation_status}</span>
            </div>
          </div>

          {/* Main Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Recipient Information */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.dark }}>
                  <FaUser style={{ color: colors.accent }} />
                  Recipient Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Name</label>
                    <p className="text-base font-semibold" style={{ color: colors.dark }}>
                      {request.recipient_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Blood Group</label>
                    <p className="text-2xl font-bold" style={{ color: colors.accent }}>
                      {request.blood_group}
                    </p>
                  </div>
                  {request.recipient_email && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-base flex items-center gap-2" style={{ color: colors.dark }}>
                        <FaEnvelope className="text-sm" />
                        {request.recipient_email}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Location Information */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.dark }}>
                  <FaMapMarkerAlt style={{ color: colors.accent }} />
                  Location Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Hospital</label>
                    <p className="text-base font-semibold flex items-center gap-2" style={{ color: colors.dark }}>
                      <FaHospital className="text-sm" />
                      {request.hospital_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Full Address</label>
                    <p className="text-base" style={{ color: colors.dark }}>
                      {request.full_address}
                    </p>
                  </div>
                  {request.recipient_district && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">District</label>
                      <p className="text-base" style={{ color: colors.dark }}>
                        {request.recipient_district}
                      </p>
                    </div>
                  )}
                  {request.recipient_upazila && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Upazila</label>
                      <p className="text-base" style={{ color: colors.dark }}>
                        {request.recipient_upazila}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Date & Time Information */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.dark }}>
                  <FaCalendarAlt style={{ color: colors.accent }} />
                  Schedule
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Donation Date</label>
                    <p className="text-base font-semibold flex items-center gap-2" style={{ color: colors.dark }}>
                      <FaCalendarAlt className="text-sm" />
                      {request.donation_date}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Donation Time</label>
                    <p className="text-base font-semibold flex items-center gap-2" style={{ color: colors.dark }}>
                      <FaClock className="text-sm" />
                      {request.donation_time}
                    </p>
                  </div>
                </div>
              </div>

              {/* Request Message */}
              {request.request_message && (
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.dark }}>
                    <FaCommentDots style={{ color: colors.accent }} />
                    Request Message
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: colors.dark }}>
                    {request.request_message}
                  </p>
                </div>
              )}

              {/* Requester Information */}
              {request.requester_name && (
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.dark }}>
                    <FaUser style={{ color: colors.accent }} />
                    Requested By
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Name</label>
                      <p className="text-base font-semibold" style={{ color: colors.dark }}>
                        {request.requester_name}
                      </p>
                    </div>
                    {request.requester_email && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <p className="text-base flex items-center gap-2" style={{ color: colors.dark }}>
                          <FaEnvelope className="text-sm" />
                          {request.requester_email}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-center">
              <button
                onClick={() => window.history.back()}
                className="btn bg-gray-600 text-white hover:bg-gray-700 border-0 px-8"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DonationRequestDetails;
