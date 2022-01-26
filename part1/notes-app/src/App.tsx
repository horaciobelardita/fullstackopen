import "./App.css";
import { Note } from "./components/Note";
import React, { useEffect, useState } from "react";
import { NoteType } from "./main";
import noteService from "./services/notes";
function App() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log("running useEffect");
    noteService.getAll().then((notes) => {
      setNotes(notes);
      setIsLoading(false);
    });
  }, []);

  const addNote = (event: React.FormEvent) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    noteService.create(noteObject).then((returnedNote) => {
      setNotes((prevNotes) => [...prevNotes, returnedNote]);
      setNewNote("");
    });
  };
  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const handleToggleImportance = (id: number) => {
    const note = notes.find((note) => note.id === id);
    if (!note) return;
    noteService
      .update(id, {
        important: !note?.important,
      })
      .then((returnedNote) =>
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note.id === id ? returnedNote : note))
        )
      )
      .catch(() => {
        console.error(
          `the note '${note.content}' was already deleted from server`
        );
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  console.log("render", notes.length, "notes");
  return (
    <div className="App">
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <ul>
          {notesToShow.map((note) => (
            <Note
              onToggleImportance={handleToggleImportance.bind(null, note.id)}
              note={note}
              key={note.id}
            />
          ))}
        </ul>
      )}
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
}

export default App;
