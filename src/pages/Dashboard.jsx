import { useAuth } from "../context/AuthContext";
import NotesList from "../components/NotesList";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
// import { useDarkMode } from "../context/DarkModeContext";

function Dashboard() {
  const { user, logout } = useAuth();
  const { dark, setDark } = useDarkMode();
  // const { dark, setDark } = useDarkMode();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {/* Header */}
      <header className="w-full px-4 py-4 flex flex-col md:flex-row justify-between items-center bg-white dark:bg-gray-800 shadow-md gap-2 md:gap-0">
        <div className="flex items-center gap-2">
          <svg
            className="h-8 w-8 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M6 2a1 1 0 000 2h8a1 1 0 000-2H6zM4 6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2H4zm1 2h10v9H5V8z" />
          </svg>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Notes Manager
          </h1>
          <button
  onClick={() => setDark(!dark)}
  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded"
>
  {dark ? "Light Mode" : "Dark Mode"}
</button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6">
        <section className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">
            Welcome back, {user?.name || "User"}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your notes effortlessly.
          </p>
        </section>
        <NotesList />
      </main>

      <footer className="w-full py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Notes Manager. All rights reserved.
      </footer>
    </div>
  );
}

export default Dashboard;
