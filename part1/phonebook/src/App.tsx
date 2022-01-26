import React, { useEffect, useState } from "react";
import "./App.css";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import personService from "./services/persons";

export type Person = {
  id: number;
  name: string;
  number: string;
};

function App() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    personService.getAll().then(setPersons);
  }, []);

  const handleSubmitPersonForm = (name: string, number: string) => {
    const foundedPerson = persons.find(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );
    if (foundedPerson) {
      const isUpdateConfirmed = window.confirm(
        `${name} is already added to phonebook, replace the old number with a new one?`
      );
      if (isUpdateConfirmed) {
        personService
          .update(foundedPerson.id, { number })
          .then((returnedPerson) =>
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id === foundedPerson.id ? returnedPerson : person
              )
            )
          );
      }
      return;
    }
    personService.create({ name, number }).then((returnedPerson) => {
      setPersons((prevPersons) => [...prevPersons, returnedPerson]);
    });
  };

  const handleDeletePerson = (personObjToRemove: Person) => {
    if (window.confirm(`Delete ${personObjToRemove.name}?`)) {
      personService
        .destroy(personObjToRemove.id)
        .then(() =>
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== personObjToRemove.id)
          )
        );
    }
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
      <Persons onDelete={handleDeletePerson} persons={personsToShow} />
    </div>
  );
}

export default App;
