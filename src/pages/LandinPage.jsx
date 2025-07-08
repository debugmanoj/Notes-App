import { useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

function LandingPage() {


  const tryReAuthenticate = async () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return;

  const { email, id } = JSON.parse(storedUser);

  try {
    const res = await api.post("/auth/relogin", { email, id });
    localStorage.setItem("token", res.data.token);
    return true;
  } catch {

    return false;
  }
};

useEffect(() => {
  const initialize = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      const success = await tryReAuthenticate();
      if (!success) return;
    }

    // fetch(); // ✅ safe now
  };

  initialize();
}, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
        Notes Manager Pro
      </h1>
      <p className="text-white text-lg md:text-xl mb-6 max-w-lg">
        Organize your notes effortlessly. Secure, fast, and beautiful on any device.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/login"
          className="bg-white text-blue-600 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100"
        >
          Log In
        </Link>
        <Link
          to="/register"
          className="bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow hover:bg-blue-800"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
