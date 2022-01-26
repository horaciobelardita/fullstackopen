import "./App.css";
import { Note } from "./components/Note";
import React, { useEffect, useState } from "react";
import { NoteType } from "./main";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log("running useEffect");
    axios.get<NoteType[]>("http://localhost:3001/notes").then(({ data }) => {
      setNotes(data);
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
    axios
      .post<NoteType>("http://localhost:3001/notes", noteObject)
      .then(({ data }) => {
        setNotes((prevNotes) => [...prevNotes, data]);
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
    axios
      .patch<NoteType>("http://localhost:3001/notes/" + id, {
        important: !note?.important,
      })
      .then(({ data }) =>
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note.id === id ? data : note))
        )
      );
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
