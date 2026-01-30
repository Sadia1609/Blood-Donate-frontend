import React from "react";
import { Link } from "react-router";
import { FaTimesCircle, FaHome, FaRedo } from "react-icons/fa";

const PaymentError = () => {
  // Color theme matching project
  const colors = {
    primary: '#818281',
    accent: '#871e14',
    dark: '#211e1e',
    light: '#fdfdfd'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
          <FaTimesCircle className="text-4xl text-red-500" />
        </div>

        {/* Error Message */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: colors.dark }}>
          Payment Failed 😞
        </h1>

        <p className="text-gray-600 mb-6">
          We're sorry, but your payment could not be processed at this time. Please try again.
        </p>

        {/* Error Details */}
        <div className="bg-red-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-red-700 mb-2 font-medium">
            Possible reasons:
          </p>
          <ul className="text-xs text-red-600 text-left space-y-1">
            <li>• Insufficient funds</li>
            <li>• Network connection issue</li>
            <li>• Payment gateway timeout</li>
            <li>• Card details incorrect</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/donate"
            className="w-full btn text-white border-0"
            style={{ backgroundColor: colors.accent }}
          >
            <FaRedo className="mr-2" />
            Try Again
          </Link>
          
          <Link
            to="/dashboard"
            className="w-full btn btn-outline"
            style={{ borderColor: colors.accent, color: colors.accent }}
          >
            <FaHome className="mr-2" />
            Go to Dashboard
          </Link>
        </div>

        {/* Support Note */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-600">
            Need help? Contact our support team at{" "}
            <a 
              href="mailto:support@blooddonate.com" 
              className="font-medium"
              style={{ color: colors.accent }}
            >
              support@blooddonate.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentError;