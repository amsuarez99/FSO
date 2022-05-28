import React from "react";
import Course from "./components/Course";

const courses = [
  {
    id: "tc-01",
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
      {
        name: "Redux",
        exercises: 15,
      },
    ],
  },
  {
    id: "tc-02",
    name: "Node.js",
    parts: [
      {
        name: "Routing",
        exercises: 3,
      },
      {
        name: "Middlewares",
        exercises: 7,
      },
    ],
  },
];

const App = () => {
  console.log(courses);
  return (
    <>
      <h1>Web Development Curriculumn</h1>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  );
};

export default App;
