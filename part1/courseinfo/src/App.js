import React from "react";

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

const Total = ({ total }) => {
  return <p>Number of exercises {total}</p>;
};

const Content = ({ parts }) => {
  return (
    <>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </>
  );
};

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce(
    (exercises, part) => part.exercises + exercises,
    0
  );

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total total={totalExercises} />
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
