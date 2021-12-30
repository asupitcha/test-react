import './App.css';
import { useState } from 'react';

const initNote = { content: '', author: '' };

function App() {
  const [note, setNote] = useState(initNote);
  const [allNotes, setAllNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);

  function onNoteValueChange(event) {
    const { name, value } = event.target;
    setNote((oldNote) => {
      return {
        ...oldNote,
        [name]: value
      }
    })
  }

  function onNoteSubmit(event) {
    event.preventDefault(); // ป้องกันไม่ให้กดแล้ว refresh หน้า
    setAllNotes((list) => {
      const newNote = { ...note };
      newNote.id = Date.now().toString()
      return [newNote, ...list];
    });

    setNote(initNote);
  }

  function onNoteDelete(id) {
    setAllNotes((prev) =>
      prev.filter(note => note.id !== id)
    );
  }

  function onEditNote(note) {
    setEditNote(note);
  }

  function onEditNoteChange(event) {
    const { name, value } = event.target;
    setEditNote((prev) => {
      return { ...prev, [name]: value };
    })
  }

  function onEditNoteSubmit(event) {
    event.preventDefault();
    setAllNotes(prev => {
      return prev.map(note => {
        if (note.id !== editNote.id) return note;
        return editNote;
      })
    })

    setEditNote(null);
  }

  // Elements
  const noteElements = allNotes.map((note) => {
    return (
      <div key={note.id} className="app-note">
        <h3>{note.content}</h3>
        <p>{note.author}</p>
        <a onClick={() => onEditNote(note)}>Edit</a>
        <span> | </span>
        <a onClick={() => onNoteDelete(note.id)}>Delete</a>
      </div>
    );
  });

  let editNoteElements = null;
  if (!!editNote) {
    editNoteElements = (
      <form onSubmit={onEditNoteSubmit}>
        <h3>Please fill your content</h3>
        <input type="text" name="content" value={editNote.content} onChange={onEditNoteChange} />

        <h3>Please fill your author</h3>
        <input type="text" name="author" value={editNote.author} onChange={onEditNoteChange} />

        <button type="submit">Submit</button>
      </form>
    );
  }


  return (
    <div className="App">
      <div className="app-container">
        <form onSubmit={onNoteSubmit}>
          <h3>Please fill your content</h3>
          <input type="text" name="content" value={note.content} onChange={onNoteValueChange} />

          <h3>Please fill your author</h3>
          <input type="text" name="author" value={note.author} onChange={onNoteValueChange} />

          <button type="submit">Submit</button>
        </form>
        {noteElements}
      </div>

      {editNoteElements}
    </div>
  );
}

export default App;
