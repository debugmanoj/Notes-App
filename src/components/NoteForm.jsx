import { useState, useEffect } from "react";
import { createNote, updateNote } from "../api/noteRepository";

export default function NoteForm({ onSuccess, editingNote, setEditingNote }) {
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    if (editingNote) {
      setForm({ title: editingNote.title, content: editingNote.content });
    } else {
      setForm({ title: "", content: "" });
    }
  }, [editingNote]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingNote) {
      await updateNote(editingNote._id, form);
      setEditingNote(null);
    } else {
      await createNote(form);
    }
    setForm({ title: "", content: "" });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-4">
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <textarea
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      <button className="bg-purple-500 text-white px-4 py-2 rounded">
        {editingNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}
