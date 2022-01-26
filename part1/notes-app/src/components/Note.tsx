import { NoteType } from "../main";

export const Note = ({ note }: { note: NoteType }) => {
  return <li>{note.content}</li>;
};
