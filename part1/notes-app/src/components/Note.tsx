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
    <li>
      {note.content}
      <button onClick={onToggleImportance}>{label}</button>
    </li>
  );
};
