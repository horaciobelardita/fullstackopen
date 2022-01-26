import { Person } from "../App";

export const Persons = ({
  persons,
  onDelete,
}: {
  persons: Person[];
  onDelete: (person: Person) => void;
}) => {
  return (
    <>
      {persons.map((person) => (
        <div key={person.name}>
          <span>
            {person.name} {person.number}
          </span>
          <button onClick={onDelete.bind(null, person)}>delete</button>
        </div>
      ))}
    </>
  );
};
