import { useAuth } from "../context/AuthContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";

function Header() {
  const { user, logout } = useAuth();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-bold">📝 Notes Manager</h1>
      <div className="flex gap-4 items-center">
        <button onClick={() => setDark(!dark)}>
          {dark ? <FaSun /> : <FaMoon />}
        </button>
        {user && (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
