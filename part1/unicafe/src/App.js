import React, { useState } from "react";

const data = [
  { title: "If it hurts, do it more often", votes: 0 },
  {
    title: "Adding manpower to a late software project makes it later!",
    votes: 0,
  },
  {
    title:
      "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    votes: 0,
  },
  {
    title:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    votes: 0,
  },
  { title: "Premature optimization is the root of all evil.", votes: 0 },
  {
    title:
      "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    votes: 0,
  },
  {
    title:
      "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
    votes: 0,
  },
];

const getMostVotedAnecdote = (anecdotes) => {
  return anecdotes.reduce((mostVoted, anecdote) => {
    return mostVoted.votes < anecdote.votes ? anecdote : mostVoted;
  }, anecdotes[0]);
};

const Anecdote = ({ anecdote }) => {
  return (
    <>
      <div>{anecdote.title}</div>
      <div>has {anecdote.votes} votes</div>
    </>
  );
};

const Anecdotes = () => {
  const [anecdotes, setAnecdotes] = useState(data);
  const [selected, setSelected] = useState(0);
  return (
    <>
      <h1>Daily Anecdote</h1>
      <Anecdote anecdote={anecdotes[selected]} />
      <Button
        text="vote"
        handler={() =>
          setAnecdotes((prev) => [
            ...prev.slice(0, selected),
            { ...anecdotes[selected], votes: anecdotes[selected].votes + 1 },
            ...prev.slice(selected + 1),
          ])
        }
      />
      <Button
        text="next anecdote"
        handler={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
      />
      <h1>Most Voted Anecdote</h1>
      <Anecdote anecdote={getMostVotedAnecdote(anecdotes)} />
    </>
  );
};

const Button = ({ handler, text }) => {
  return <button onClick={handler}>{text}</button>;
};

const Feedback = ({ handleGood, handleNeutral, handleBad }) => {
  return (
    <>
      <h1>Give Feedback</h1>
      <Button handler={handleGood} text="good" />
      <Button handler={handleNeutral} text="neutral" />
      <Button handler={handleBad} text="bad" />
    </>
  );
};

const ScoreLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <h1>Statistics</h1>
      {good + neutral + bad ? (
        <table>
          <tbody>
            <ScoreLine text="good" value={good} />
            <ScoreLine text="neutral" value={neutral} />
            <ScoreLine text="bad" value={bad} />
            <ScoreLine text="all" value={good + neutral + bad} />
            <ScoreLine text="average" value={(good + neutral + bad) / 3} />
            <ScoreLine
              text="positive"
              value={`${good / (good + neutral + bad)}%`}
            />
          </tbody>
        </table>
      ) : (
        <div>No statistics given</div>
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Feedback
        handleBad={() => setBad((prev) => prev + 1)}
        handleGood={() => setGood((prev) => prev + 1)}
        handleNeutral={() => setNeutral((prev) => prev + 1)}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
      <Anecdotes />
    </div>
  );
};

export default App;
