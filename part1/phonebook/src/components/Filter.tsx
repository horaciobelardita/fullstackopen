import React from "react";

type FilterProps = {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
};

export const Filter = ({ term, setTerm }: FilterProps) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };
  return (
    <input
      type="search"
      value={term}
      onChange={handleSearchChange}
      placeholder="Search by name"
    />
  );
};
