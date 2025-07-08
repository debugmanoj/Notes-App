import { Link } from "react-router-dom";

function Verified() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-6 max-w-md text-center">
        <h1 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
           Email Verified!
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Your email has been successfully verified. You can now log in to your account.
        </p>
        <Link
          to="/login"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}

export default Verified;
