import React, { useContext, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router";
import Footer from "../../components/Footer/Footer";
import { 
  FaTint, 
  FaHeart, 
  FaHandHoldingHeart, 
  FaDollarSign, 
  FaUser, 
  FaEnvelope,
  FaSpinner,
  FaCheckCircle,
  FaUsers,
  FaHospital
} from "react-icons/fa";

const Donate = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("");

  // Project color theme
  const colors = {
    primary: '#818281',
    accent: '#871e14',
    dark: '#211e1e',
    light: '#fdfdfd'
  };

  // Predefined donation amounts
  const predefinedAmounts = [100, 250, 500, 1000, 2500, 5000];

  const handleCheckout = (e) => {
    e.preventDefault();
    setLoading(true);

    const donateAmount = e.target.donateAmount.value;
    const donarEmail = user?.email;
    const donarName = user?.displayName;

    if (!donateAmount || donateAmount <= 0) {
      setLoading(false);
      return;
    }

    const formData = {
      donateAmount,
      donarEmail,
      donarName,
    };

    axiosInstance.post("/create-payment-checkout", formData).then((res) => {
      console.log(res.data);
      window.location.href = res.data.url;
    }).catch((error) => {
      console.error("Payment error:", error);
      setLoading(false);
    });
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount.toString());
    // Update the input field
    const amountInput = document.querySelector('input[name="donateAmount"]');
    if (amountInput) {
      amountInput.value = amount.toString();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: colors.accent }}
            >
              <FaHeart className="text-2xl sm:text-3xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: colors.dark }}>
                Make a Donation
              </h1>
              <p className="text-base sm:text-lg" style={{ color: colors.primary }}>
                Your generosity saves lives
              </p>
            </div>
          </div>
          
          <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: colors.primary }}>
            Every donation helps us maintain our blood donation platform, organize donation drives, 
            and connect donors with those in need. Your contribution makes a real difference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Side - Impact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: colors.dark }}>
                <FaHandHoldingHeart style={{ color: colors.accent }} />
                Your Impact
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${colors.accent}15` }}
                  >
                    <FaTint style={{ color: colors.accent }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: colors.dark }}>
                      ৳100 Donation
                    </h3>
                    <p className="text-gray-600">
                      Helps maintain our platform for 10 blood donation requests and connects donors with patients in need.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${colors.accent}15` }}
                  >
                    <FaUsers style={{ color: colors.accent }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: colors.dark }}>
                      ৳500 Donation
                    </h3>
                    <p className="text-gray-600">
                      Supports organizing a community blood donation drive and helps 50+ donation requests.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${colors.accent}15` }}
                  >
                    <FaHospital style={{ color: colors.accent }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: colors.dark }}>
                      ৳1000+ Donation
                    </h3>
                    <p className="text-gray-600">
                      Enables us to partner with hospitals and expand our reach to save more lives in emergency situations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Donor Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: colors.dark }}>
                <FaUser style={{ color: colors.accent }} />
                Donor Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaUser className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold" style={{ color: colors.dark }}>
                      {user?.displayName || "Anonymous Donor"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaEnvelope className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold" style={{ color: colors.dark }}>
                      {user?.email || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Donation Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.accent }}
              >
                <FaDollarSign className="text-2xl text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                Choose Amount
              </h2>
              <p className="text-gray-600">
                Select or enter your donation amount
              </p>
            </div>

            <form onSubmit={handleCheckout} className="space-y-6">
              
              {/* Predefined Amount Buttons */}
              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: colors.dark }}>
                  Quick Select Amount
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-3 rounded-lg border-2 font-semibold transition-all duration-200 hover:shadow-md ${
                        selectedAmount === amount.toString()
                          ? 'text-white shadow-lg'
                          : 'bg-white hover:bg-red-50'
                      }`}
                      style={{
                        backgroundColor: selectedAmount === amount.toString() ? colors.accent : 'white',
                        borderColor: selectedAmount === amount.toString() ? colors.accent : '#e5e7eb',
                        color: selectedAmount === amount.toString() ? 'white' : colors.dark
                      }}
                    >
                      ৳{amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount Input */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                  Or Enter Custom Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-semibold">৳</span>
                  </div>
                  <input
                    name="donateAmount"
                    type="number"
                    min="1"
                    step="1"
                    className="w-full pl-8 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                    style={{ focusRingColor: `${colors.accent}50` }}
                    placeholder="Enter amount"
                    value={selectedAmount}
                    onChange={(e) => setSelectedAmount(e.target.value)}
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Minimum donation amount is ৳1
                </p>
              </div>

              {/* Donation Summary */}
              {selectedAmount && (
                <div className="bg-red-50 rounded-xl p-4 border-2 border-red-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium" style={{ color: colors.dark }}>Donation Amount:</span>
                    <span className="text-2xl font-bold" style={{ color: colors.accent }}>
                      ৳{selectedAmount}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCheckCircle className="text-green-500" />
                    <span>Your donation will help save lives</span>
                  </div>
                </div>
              )}

              {/* Donate Button */}
              <button 
                type="submit" 
                disabled={loading || !selectedAmount}
                className="w-full py-4 px-6 text-white font-bold text-lg rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                style={{ backgroundColor: colors.accent }}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FaHeart />
                    Donate ৳{selectedAmount || '0'}
                  </>
                )}
              </button>

              {/* Security Note */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  🔒 Your payment is secure and encrypted. You will be redirected to our payment processor.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section - Thank You Message */}
        <div className="mt-12 text-center bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: colors.dark }}>
              Thank You for Your Generosity! 🙏
            </h3>
            <p className="text-lg leading-relaxed" style={{ color: colors.primary }}>
              Your donation helps us maintain this platform, organize blood donation drives, 
              and connect donors with patients in critical need. Together, we're building a 
              community that saves lives every day.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div 
                  className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colors.accent}15` }}
                >
                  <FaTint style={{ color: colors.accent }} className="text-2xl" />
                </div>
                <h4 className="font-bold mb-1" style={{ color: colors.dark }}>Platform Maintenance</h4>
                <p className="text-sm text-gray-600">Keep the system running smoothly</p>
              </div>
              
              <div className="text-center">
                <div 
                  className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colors.accent}15` }}
                >
                  <FaUsers style={{ color: colors.accent }} className="text-2xl" />
                </div>
                <h4 className="font-bold mb-1" style={{ color: colors.dark }}>Community Drives</h4>
                <p className="text-sm text-gray-600">Organize donation events</p>
              </div>
              
              <div className="text-center">
                <div 
                  className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colors.accent}15` }}
                >
                  <FaHospital style={{ color: colors.accent }} className="text-2xl" />
                </div>
                <h4 className="font-bold mb-1" style={{ color: colors.dark }}>Emergency Support</h4>
                <p className="text-sm text-gray-600">Help in critical situations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Donate;
