import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

function NoteModal({ isOpen, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    tags: "",
  });

  // Editor instance (created once)
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "",
  });

  // Populate form and editor when opening
  useEffect(() => {
    if (initialData && editor) {
      setForm({
        title: initialData.title,
        category: initialData.category,
        tags: initialData.tags?.join(", ") || "",
      });
      editor.commands.setContent(initialData.content || "");
    } else if (editor) {
      setForm({
        title: "",
        category: "",
        tags: "",
      });
      editor.commands.setContent("");
    }
  }, [initialData, editor]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 h-full bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-4">
        <h2 className="text-xl font-bold">{initialData ? "Edit Note" : "New Note"}</h2>
        
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          className="w-full p-2 border rounded"
        />

        <label className="block text-sm font-medium">Category</label>
        <select
          value={form.category}
          onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Ideas">Ideas</option>
        </select>

        <label className="block text-sm font-medium mt-2">Tags</label>
        <input
          type="text"
          placeholder="Comma-separated tags (e.g., work, urgent)"
          value={form.tags}
          onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
          className="w-full p-2 border rounded"
        />

        <div className="border p-2 rounded bg-white dark:bg-gray-900 space-y-2">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={`px-2 py-1 border rounded ${
                editor?.isActive("bold") ? "bg-blue-500 text-white" : ""
              }`}
            >
              Bold
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={`px-2 py-1 border rounded ${
                editor?.isActive("italic") ? "bg-blue-500 text-white" : ""
              }`}
            >
              Italic
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              className={`px-2 py-1 border rounded ${
                editor?.isActive("underline") ? "bg-blue-500 text-white" : ""
              }`}
            >
              Underline
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`px-2 py-1 border rounded ${
                editor?.isActive("heading", { level: 2 }) ? "bg-blue-500 text-white" : ""
              }`}
            >
              H2
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className={`px-2 py-1 border rounded ${
                editor?.isActive("bulletList") ? "bg-blue-500 text-white" : ""
              }`}
            >
              List
            </button>
          </div>

          <label className="block text-sm font-medium mt-2">Note Description</label>
          <EditorContent
            editor={editor}
            className="p-2 border border-gray-200 rounded-sm focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-1 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onSave({
                title: form.title,
                category: form.category,
                content: editor?.getHTML(),
                tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
              })
            }
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteModal;
