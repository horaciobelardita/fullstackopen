import React from "react";

export const useForm = (type) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);
  const validate = (value) => {
    if (!type) return true;
    if (value.trim().length === 0) {
      setError("Please complete this field");
      return false;
    }
    setError(null);
    return true;
  };

  const onChange = ({ target }) => {
    const { value } = target;
    if (error) validate(value);
    setValue(value);
  };

  return {
    value,
    error,
    onChange,
    onBlur: () => validate(value),
    validate: () => validate(value),
  };
};
