import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      login(res.data);
      toast.success("Logged in!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };



  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded shadow"
    >
      <h2 className="text-lg font-semibold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <button className="w-full bg-green-500 text-white py-2 rounded">
        Login
      </button>
    </form>
  );
}

export default Login;
