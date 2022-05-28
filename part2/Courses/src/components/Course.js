import Header from "./Header";
import Content from "./Content";

export default function Course({ course }) {
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
}

const Total = ({ total }) => {
  return <b>Number of exercises: {total}</b>;
};
