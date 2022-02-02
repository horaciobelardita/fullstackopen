import React from "react";

const Radio = ({ options, value, setValue, ...props }) => {
  return (
    <>
      {options.map((option) => (
        <label key={option} htmlFor={option}>
          {option}
          <input
            type="radio"
            checked={value === option}
            id={option}
            value={option}
            onChange={({ target }) => setValue(target.value)}
            {...props}
          />
        </label>
      ))}
    </>
  );
};

export default Radio;
