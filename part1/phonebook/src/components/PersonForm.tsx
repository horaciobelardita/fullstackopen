import React, { useState } from "react";

type PersonFormProps = {
  onSubmit: (name: string, number: string) => void;
};

export const PersonForm = ({ onSubmit }: PersonFormProps) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if ([newName, newNumber].some((field) => field.trim().length === 0)) return;
    onSubmit(newName, newNumber);
    setNewName("");
    setNewNumber("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input
          type="text"
          value={newName}
          onChange={({ target }) => setNewName(target.value)}
        />
      </div>
      <div>
        number:
        <input
          type="tel"
          value={newNumber}
          onChange={({ target }) => setNewNumber(target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
