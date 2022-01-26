import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
)

const Total = ({ parts }) => {
  const totalExercises = parts.reduce(
    (total, part) => total + part.exercises,
    0
  )
  return (
    <p>
      Total of <strong>{totalExercises}</strong> exercises
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.name} {...part} />
      ))}
    </div>
  )
}

export const Course = ({ course }) => {
  const { parts, name } = course
  return (
    <div className="App">
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}
