import { useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      toast.success("Registered! Check console to verify email.");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-2 border rounded"
      />
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
      <button className="w-full bg-blue-500 text-white py-2 rounded">Register</button>
    </form>
  );
}

export default Register;
