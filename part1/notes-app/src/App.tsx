import { Note } from "./components/Note";
import React, { useEffect, useState } from "react";
import { NoteType } from "./main";
import noteService from "./services/notes";
import { NotificationMessage } from "./components/NotificationMessage";
function App() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    noteService
      .getAll()
      .then((notes) => {
        setNotes(notes);
      })
      .catch(() => {
        setErrorMessage("Can not fetch the notes. Try again later");
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!errorMessage) return;
    const timeout = setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [errorMessage]);

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
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        );
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  return (
    <div className="App">
      <h1 className="App__heading">Notes</h1>
      <NotificationMessage message={errorMessage} />
      {notes.length > 0 && (
        <div className="App__filter">
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? "important" : "all"}
          </button>
        </div>
      )}
      {isLoading ? (
        <div className="container">
          <p className="loader">Loading....</p>
        </div>
      ) : (
        <ul className="notes container">
          {notesToShow.map((note) => (
            <Note
              onToggleImportance={handleToggleImportance.bind(null, note.id)}
              note={note}
              key={note.id}
            />
          ))}
        </ul>
      )}
      <form onSubmit={addNote} className="form container">
        <input
          className="form__input"
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
}

export default App;
