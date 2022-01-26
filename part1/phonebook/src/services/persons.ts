import axios from "axios";
import { Person } from "../App";

const url = "http://localhost:3001/persons";

const getAll = async () => {
  const { data } = await axios.get<Person[]>(url);
  return data;
};
const create = async (personObject: { name: string; number: string }) => {
  const { data } = await axios.post<Person>(url, personObject);
  return data;
};
const update = async (
  id: number,
  updatedData: { name?: string; number: string }
) => {
  const { data } = await axios.patch<Person>(`${url}/${id}`, updatedData);
  return data;
};
const destroy = async (id: number) => {
  await axios.delete(`${url}/${id}`);
};

export default { getAll, create, destroy, update };
