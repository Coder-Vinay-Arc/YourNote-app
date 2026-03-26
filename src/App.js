import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { serverTimestamp } from "firebase/firestore";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc, query, where, getDocs } from "firebase/firestore";

function formatTime(timestamp) {
  if (!timestamp || !timestamp.toDate) return "Just now";

  const now = new Date();
  const noteTime = timestamp.toDate();

  const diff = Math.floor((now - noteTime) / 1000);

  if (diff < 60) return "Just now";
  if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  return noteTime.toLocaleDateString();
}

function App() {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [displayUserId, setDisplayUserId] = useState("");

  useEffect(() => {
    if (user) {
      if (userId) {
        setDisplayUserId(userId);
      } else {
        const fetchUserId = async () => {
          const q = query(collection(db, "users"), where("uid", "==", user.uid));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            setDisplayUserId(querySnapshot.docs[0].data().userId);
          } else {
            if (user.email) {
              setDisplayUserId(user.email.split("@")[0]);
            }
          }
        };
        fetchUserId();
      }
    } else {
      setDisplayUserId("");
    }
  }, [user]);

  const startEdit = (note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const saveEdit = async (id) => {
    await updateDoc(doc(db, "notes", id), {
      text: editText,
      time: serverTimestamp(),
      edited: true
    });
    setEditingId(null);
  };

  const addNote = async () => {
    if (newNote.trim() === "") return;

    await addDoc(collection(db, "notes"), {
      text: newNote,
      time: serverTimestamp(),
      pinned: false,
      userId: user.uid
    });

    setNewNote("");
  };

  const togglePin = async (note) => {
    await updateDoc(doc(db, "notes", note.id), {
      pinned: !note.pinned
    });
  };

  const signUp = async () => {
    try {
      setError("");

      if (!userId.trim() || !password.trim()) {
        setError("User ID and password cannot be empty ❌");
        return;
      }

      const userIdRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_]+$/;
      if (!userIdRegex.test(userId.trim())) {
        setError("User ID must contain at least one alphabet and can only include letters, numbers, and underscores ❌");
        return;
      }

      const fakeEmail = `${userId.trim()}@app.com`;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        fakeEmail,
        password
      );

      // Firestore me save
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        userId: userId.trim()
      });

      // Sign out immediately so user must manually log in
      await signOut(auth);

      setSuccessMsg("You are registered successfully. Please login.");
      setTimeout(() => setSuccessMsg(""), 3000);

    } catch (err) {
      setError(err.message);
    }
  };

  const login = async () => {
    try {
      setError("");

      if (!userId.trim() || !password.trim()) {
        setError("User ID and password cannot be empty ❌");
        return;
      }

      const fakeEmail = `${userId}@app.com`;

      await signInWithEmailAndPassword(auth, fakeEmail, password);

      setSuccessMsg("login successfully ✅");
      setTimeout(() => setSuccessMsg(""), 3000);

    } catch (err) {
      setError("Invalid credentials ❌");
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
  };

  // 🔄 Page load hote hi data fetch
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notes"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      notesArray.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return (b.time?.toMillis() || 0) - (a.time?.toMillis() || 0);
      });

      setNotes(notesArray);
    });

    return () => unsubscribe();
  }, [user]);

  console.log(notes);

  if (!user) {
    return (
      <div className="app-container">
        <div className="glass-panel">
          {successMsg && <div className="success-toast">{successMsg}</div>}

          <h2 className="app-title">Welcome to YourNote</h2>

          {error && <div className="error-msg">{error}</div>}

          <input
            type="text"
            className="input-field"
            placeholder="User ID"
            onChange={(e) => setUserId(e.target.value)}
          />

          <input
            type="password"
            className="input-field"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="auth-buttons">
            <button className="btn btn-primary" onClick={login}>
              Login
            </button>

            <button className="btn btn-secondary" onClick={signUp}>
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="glass-panel main-app">

        {successMsg && (
          <div className="success-toast">
            {successMsg}
          </div>
        )}

        <h2 className="app-title">YourNote</h2>

        <div className="user-info">
          <span>Logged in as: <strong>{displayUserId || "User"}</strong></span>
          <button className="btn-icon btn-delete" onClick={logout} style={{ padding: "6px 12px" }}>
            Logout
          </button>
        </div>

        <div className="add-note-container">
          <input
            type="text"
            className="note-input"
            placeholder="Type a new note here..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') addNote() }}
          />
          <button className="btn-add" onClick={addNote}>
            Add Note
          </button>
        </div>

        <input
          type="text"
          className="search-bar"
          placeholder="Search your notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="notes-list">
          {notes
            .filter(note =>
              note.text.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(note => (
              <div key={note.id} className={`note-card ${note.pinned ? "pinned" : ""}`}>
                {editingId === note.id ? (
                  <div className="edit-mode-container">
                    <input
                      className="edit-input"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(note.id) }}
                      autoFocus
                    />
                    <button className="btn-icon btn-secondary" onClick={() => saveEdit(note.id)}>
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="note-content">
                      <div className="note-text">{note.text}</div>
                      <div className="note-meta">
                        <span>{formatTime(note.time)}</span>
                        {note.edited && <span className="edited-badge">Edited</span>}
                      </div>
                    </div>

                    <div className="note-actions">
                      <button
                        className="btn-icon btn-edit"
                        onClick={() => startEdit(note)}
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        className={`btn-icon btn-pin ${note.pinned ? "active" : ""}`}
                        onClick={() => togglePin(note)}
                        title={note.pinned ? "Unpin" : "Pin"}
                      >
                        {note.pinned ? "Unpin" : "Pin"}
                      </button>
                      <button
                        className="btn-icon btn-delete"
                        onClick={() => deleteNote(note.id)}
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;