import "./App.css";
import { NoteType } from "./main";
import { Note } from "./components/Note";

function App({ notes }: { notes: NoteType[] }) {
  return (
    <div className="App">
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note note={note} key={note.id} />
        ))}
      </ul>
    </div>
  );
}

export default App;
