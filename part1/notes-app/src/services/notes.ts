import axios from "axios";
import { NoteType } from "../main";
const baseUrl = "http://localhost:3001/notes";

const getAll = async () => {
  const { data } = await axios.get<NoteType[]>(baseUrl);
  return data;
};

const create = async (newObject: {
  content: string;
  date: string;
  important: boolean;
}) => {
  const { data } = await axios.post<NoteType>(baseUrl, newObject);
  return data;
};

const update = async (
  id: number,
  newObject: { content?: string; date?: string; important?: boolean }
) => {
  const { data } = await axios.patch<NoteType>(`${baseUrl}/${id}`, newObject);
  return data;
};

export default {
  getAll,
  create,
  update,
};
