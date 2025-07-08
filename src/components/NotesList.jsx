import { useState, useEffect, useCallback } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import NoteModal from "./NoteModal";
import { FaTrash, FaEdit, FaThumbtack, FaFilter, FaTimes } from "react-icons/fa";

/* FilterBar Component */
function FilterBar({ filters, setFilters, onApplyFilters, onResetFilters, onNewNote }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 p-4 rounded-md shadow space-y-3">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <input
          type="text"
          placeholder="Search notes..."
          value={filters.search}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
          className="p-2 border border-gray-300 dark:border-gray-700 rounded-md flex-1"
        />

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
          className="p-2 border border-gray-300 dark:border-gray-700 rounded-md w-full md:w-auto"
        >
          <option value="">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Ideas">Ideas</option>
        </select>

        {/* Toggle Advanced */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-2 rounded"
        >
          <FaFilter />
          {showAdvanced ? "Hide Filters" : "More Filters"}
        </button>
      </div>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Tag (e.g., work)"
            value={filters.tag}
            onChange={(e) => setFilters((prev) => ({ ...prev, tag: e.target.value }))}
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-md"
          />
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters((prev) => ({ ...prev, startDate: e.target.value }))}
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-md"
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters((prev) => ({ ...prev, endDate: e.target.value }))}
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-md"
          />
        </div>
      )}

      {/* Action Buttons */}
  <div className="flex flex-wrap justify-between items-center gap-2 mt-2">
  <div className="flex flex-wrap gap-2">
    <button
      onClick={onApplyFilters}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      Apply Filter
    </button>
    <button
      onClick={onResetFilters}
      className="flex items-center gap-1 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded"
    >
      <FaTimes />
      Reset
    </button>
  </div>
  <div>
    <button
      onClick={onNewNote}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
    >
      + New Note
    </button>
  </div>
</div>
    </div>
  );
}

/* NotesList Component */
function NotesList() {
  const [filters, setFilters] = useState({
    category: "",
    tag: "",
    search: "",
    startDate: "",
    endDate: "",
  });

  const [notes, setNotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchNotes = useCallback(async () => {
    try {
      const res = await api.get("/notes", {
        params: {
          category: filters.category,
          tag: filters.tag,
          search: filters.search,
          startDate: filters.startDate || undefined,
          endDate: filters.endDate || undefined,
        },
      });
      setNotes(res.data);
      localStorage.setItem("cachedNotes", JSON.stringify(res.data));
    } catch {
      toast.error("Failed to load notes");
      const cached = localStorage.getItem("cachedNotes");
      if (cached) setNotes(JSON.parse(cached));
      else setNotes([]);
    }
  }, [filters]);

  useEffect(() => {
    fetchNotes();
    const handleOnline = () => {
      toast.success("Back online - syncing notes...");
      fetchNotes();
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [fetchNotes]);

  const handleSave = async (data) => {
    try {
      if (editing) {
        await api.put(`/notes/${editing._id}`, data);
        toast.success("Note updated");
      } else {
        await api.post("/notes", data);
        toast.success("Note created");
      }
      setModalOpen(false);
      setEditing(null);
      fetchNotes();
    } catch {
      toast.error("Error saving note");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Deleted");
      fetchNotes();
    } catch {
      toast.error("Error deleting");
    }
  };

  const togglePin = async (id) => {
    try {
      await api.patch(`/notes/${id}/pin`);
      fetchNotes();
    } catch {
      toast.error("Error pinning note");
    }
  };

  const handleResetFilters = () => {
    setFilters({
      category: "",
      tag: "",
      search: "",
      startDate: "",
      endDate: "",
    });
    fetchNotes();
  };

  return (
    <div className="mt-4 space-y-6">
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        onApplyFilters={fetchNotes}
        onResetFilters={handleResetFilters}
        onNewNote={() => {
          setEditing(null);
          setModalOpen(true);
        }}
      />

      <div className="overflow-y-auto max-h-[70vh] pr-2">
        {notes.length === 0 ? (
          <p className="text-center text-gray-500">No notes found.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {notes
              .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
              .map((note) => (
                <div
                  key={note._id}
                  className={`p-4 rounded-md shadow flex flex-col justify-between bg-white dark:bg-gray-800 border ${
                    note.pinned
                      ? "border-yellow-400 dark:border-yellow-500"
                      : "border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{note.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => togglePin(note._id)}
                        className={`${
                          note.pinned ? "text-yellow-500" : "text-gray-400"
                        } hover:text-yellow-600`}
                        title="Pin/Unpin"
                      >
                        <FaThumbtack />
                      </button>
                      <button
                        onClick={() => {
                          setEditing(note);
                          setModalOpen(true);
                        }}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(note._id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div
                    className="prose dark:prose-invert max-w-none text-sm"
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  />
                  <span className="text-xs text-gray-500 mt-2">
                    {note.category}
                  </span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100 text-xs px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <NoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editing}
      />
    </div>
  );
}

export default NotesList;
