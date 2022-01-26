import { NoteType } from "../main";

export const Note = ({
  note,
  onToggleImportance,
}: {
  note: NoteType;
  onToggleImportance: () => void;
}) => {
  const label = note.important ? "make not important" : "make important";
  return (
    <li className="note">
      <span className="note__text">{note.content}</span>
      <button className="note__button" onClick={onToggleImportance}>
        {label}
      </button>
    </li>
  );
};
