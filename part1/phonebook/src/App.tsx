import React, { useState } from "react";
import "./App.css";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";

export type Person = {
  id: number;
  name: string;
  number: string;
};

function App() {
  const [persons, setPersons] = useState<Person[]>([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmitPersonForm = (name: string, number: string) => {
    const alreadyExists = persons.find(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );
    if (alreadyExists) {
      alert(`${name} is already added to phonebook`);
      return;
    }
    const id =
      persons.length > 0
        ? Math.max(...persons.map((person) => person.id)) + 1
        : 1;
    setPersons((prevPersons) => [...prevPersons, { id, name, number }]);
  };

  const personsToShow = !searchTerm
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter term={searchTerm} setTerm={setSearchTerm} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={handleSubmitPersonForm} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  );
}

export default App;
