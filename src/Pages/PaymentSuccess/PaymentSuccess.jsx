import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { FaCheckCircle, FaHeart, FaHome } from "react-icons/fa";

const PaymentSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const amount = searchParams.get('amount');
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Color theme matching project
  const colors = {
    primary: '#818281',
    accent: '#871e14',
    dark: '#211e1e',
    light: '#fdfdfd'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          <div className="confetti">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: i % 2 === 0 ? colors.accent : '#10b981'
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center relative z-20">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <FaCheckCircle className="text-4xl text-green-500" />
        </div>

        {/* Success Message */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: colors.dark }}>
          Payment Successful! 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your generous donation! Your contribution will help save lives.
        </p>

        {/* Amount Display */}
        {amount && (
          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Donation Amount</p>
            <p className="text-3xl font-bold text-green-600">৳{amount}</p>
          </div>
        )}

        {/* Thank You Message */}
        <div className="bg-red-50 rounded-xl p-4 mb-6">
          <FaHeart className="text-2xl mx-auto mb-2" style={{ color: colors.accent }} />
          <p className="text-sm" style={{ color: colors.dark }}>
            Your kindness makes a difference in someone's life. Thank you for being a hero!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/dashboard"
            className="w-full btn text-white border-0"
            style={{ backgroundColor: colors.accent }}
          >
            <FaHome className="mr-2" />
            Go to Dashboard
          </Link>
          
          <Link
            to="/donate"
            className="w-full btn btn-outline"
            style={{ borderColor: colors.accent, color: colors.accent }}
          >
            Donate Again
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-500 mt-6">
          A confirmation email has been sent to your registered email address.
        </p>
      </div>

      <style jsx>{`
        .confetti {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confetti-fall 3s linear infinite;
        }
        
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;