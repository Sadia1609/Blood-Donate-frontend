import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h2 className="text-3xl font-bold text-red-500 mb-4">
        ❌ Payment Cancelled
      </h2>

      <p className="text-gray-600 mb-6">
        You cancelled the payment. No amount was charged.
      </p>

      <div className="flex gap-4">
        <Link to="/donate" className="btn btn-error">
          Try Again
        </Link>

        <Link to="/" className="btn btn-outline">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
