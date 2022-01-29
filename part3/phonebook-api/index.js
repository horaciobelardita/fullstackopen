const express = require("express");

const app = express();
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

function generateId(array) {
  return array.length > 0 ? Math.max(...array.map((item) => item.id)) + 1 : 1;
}

app
  .route("/api/persons")
  .get((req, res) => {
    return res.json(persons);
  })

  .post((req, res) => {
    const validFields = ["name", "number"];
    const keys = Object.keys(req.body);
    const isValid = validFields.every((field) => keys.includes(field));
    if (!isValid) {
      return res.status(400).json({
        error: `missing required fields (${validFields.join(",")})`,
      });
    }
    const foundedPerson = persons.find(
      (person) => person.name === req.body.name
    );
    if (foundedPerson) {
      return res.status(400).json({
        error: `The name ${req.body.name} already exists`,
      });
    }

    const id = generateId(persons);
    const person = {
      id,
      ...req.body,
    };
    persons = [...persons, person];
    return res.status(201).json(person);
  });

app
  .route("/api/persons/:id")
  .get((req, res) => {
    const id = +req.params.id;
    const person = persons.find((person) => person.id === id);
    if (!person) {
      return res.sendStatus(404);
    }
    return res.json(person);
  })
  .delete((req, res) => {
    const id = +req.params.id;
    const personIndex = persons.findIndex((person) => person.id === id);
    if (personIndex === -1) {
      return res.sendStatus(404);
    }
    persons.splice(personIndex, 1);
    return res.sendStatus(204);
  });

app.get("/info", (req, res) => {
  let output = `<p>Phonebook has info for ${persons.length} people</p>`;
  output += "<p>" + new Date() + "</p>";
  return res.send(output);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
