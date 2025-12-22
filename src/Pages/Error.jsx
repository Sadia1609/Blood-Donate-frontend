import React from 'react';
import { Link } from 'react-router';


const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6">
      <h1 className="text-9xl font-extrabold text-gray-300">404</h1>

      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-600 mt-2 max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
