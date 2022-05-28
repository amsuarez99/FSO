const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

export default function Content({ parts }) {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </>
  );
}
