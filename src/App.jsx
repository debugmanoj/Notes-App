import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandinPage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./context/AuthContext";
import VerifyEmail from "./pages/Verify";
import Verified from "./pages/Verified";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/register"
        element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />}
      />
      <Route path="/verified" element={<Verified />} />
      <Route path="/verify" element={<VerifyEmail />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
