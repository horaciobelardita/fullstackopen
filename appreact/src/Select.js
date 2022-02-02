import React from "react";

const Select = ({ options, value, setValue, ...otherProps }) => {
  return (
    <select
      {...otherProps}
      value={value}
      onChange={({ target }) => setValue(target.value)}
    >
      <option value="" disabled>
        Seleccione
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
