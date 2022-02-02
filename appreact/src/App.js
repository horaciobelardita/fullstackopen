import React from "react";
import Checkbox from "./Checkbox";
import Input from "./Input";
import Radio from "./Radio";
import Select from "./Select";
import { useForm } from "./useForm";

const colorsArray = ["red", "green", "blue", "black"];
const capitalize = (text) => text[0].toUpperCase() + text.slice(1);
const App = () => {
  const [colors, setColors] = React.useState([]);
  const [numbers, setNumbers] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [languages, setLanguages] = React.useState(["JS"]);
  const name = useForm(true);

  const handleChange = ({ target }) => {
    if (target.checked) {
      setColors((prevColors) => [...prevColors, target.value]);
    } else {
      setColors((prevColors) =>
        prevColors.filter((color) => color !== target.value)
      );
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!name.validate()) {
          console.log("form invalid");
        } else {
          console.log("form is valid");
        }
      }}
    >
      {colorsArray.map((color) => (
        <div key={color}>
          <label htmlFor={color}>{capitalize(color)}</label>
          <input
            checked={colors.includes(color)}
            onChange={handleChange}
            type="checkbox"
            id={color}
            value={color}
          />
        </div>
      ))}
      <Select value={numbers} setValue={setNumbers} options={["1", "2", "3"]} />
      <div>
        <Radio
          value={gender}
          setValue={setGender}
          options={["Masculino", "Femenino"]}
        />
      </div>
      <div>
        <Checkbox
          value={languages}
          setValue={setLanguages}
          options={["JS", "PHP", "Java"]}
        />
      </div>
      <div>
        <Input
          type="text"
          value={name.value}
          onBlur={name.onBlur}
          onChange={name.onChange}
          placeholder="Name"
          error={name.error}
        />
      </div>
      <button type="submit">Send</button>
    </form>
  );
};

export default App;
