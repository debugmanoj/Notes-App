import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");

useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("Invalid link");
      toast.error("Invalid verification link");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await api.post(`/auth/verify`, { token });
        toast.success(res.data.message || "Email verified!");
        setStatus("Email verified! Redirecting to login...");
         setTimeout(() => navigate("/verified"), 2000);
      } catch (err) {
        toast.error(err.response?.data?.message || "Verification failed");
        setStatus("Verification failed.");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-xl font-semibold">{status}</h1>
    </div>
  );
}

export default VerifyEmail;
