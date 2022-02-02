import React from "react";

const Checkbox = ({ options, value, setValue, ...props }) => {
  const handleChange = ({ target }) => {
    if (target.checked) {
      setValue((prevValues) => [...prevValues, target.value]);
    } else {
      setValue((prevValues) =>
        prevValues.filter((value) => value !== target.value)
      );
    }
  };
  return (
    <>
      {options.map((option) => (
        <label key={option} htmlFor={option}>
          {option}
          <input
            type="checkbox"
            id={option}
            checked={value.includes(option)}
            value={option}
            onChange={handleChange}
            {...props}
          />
        </label>
      ))}
    </>
  );
};

export default Checkbox;
