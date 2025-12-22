import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import useAxios from "../../hooks/useAxios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosInstance = useAxios();

  useEffect(() => {
    if (sessionId) {
      axiosInstance
        .post(`/success-payment?session_id=${sessionId}`)
        .then((res) => {
          console.log("Payment stored:", res.data);
        });
    }
  }, [axiosInstance, sessionId]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Payment Successful!
      </h2>

      <p className="text-gray-600 mb-6">
        Thank you for your donation. Your contribution helps save lives.
      </p>

      <div className="flex gap-4">
        <Link to="/" className="btn btn-outline">
          Go Home
        </Link>

        <Link to="/dashboard" className="btn btn-primary">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
