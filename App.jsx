
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("notes")) || [];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add or update a note
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content!");
      return;
    }

    if (editId !== null) {
      setNotes(
        notes.map((note) =>
          note.id === editId
            ? { ...note, title, content }
            : note
        )
      );
      setEditId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content
      };

      setNotes([...notes, newNote]);
    }

    setTitle("");
    setContent("");
  };

  // Edit a note
  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
  };

  // Delete a note
  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));

    if (editId === id) {
      setEditId(null);
      setTitle("");
      setContent("");
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditId(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="app">
      <header>
        <h1>My Notes</h1>
        <p>Organize your thoughts in one place.</p>
      </header>

      <main>
        <section className="form-section">
          <h2>{editId !== null ? "Update Note" : "Add a New Note"}</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />

            <button type="submit">
              {editId !== null ? "Update Note" : "Add Note"}
            </button>

            {editId !== null && (
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </form>
        </section>

        <section className="notes-section">
          <h2>My Notes ({notes.length})</h2>

          {notes.length === 0 ? (
            <p className="empty">No notes available. Add your first note!</p>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <div className="note-card" key={note.id}>
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>

                  <div className="actions">
                    <button onClick={() => handleEdit(note)}>
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(note.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        <p>My Notes App | Built with React.js</p>
      </footer>
    </div>
  );
}

export default App;
