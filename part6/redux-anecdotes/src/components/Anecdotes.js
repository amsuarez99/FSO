import { useSelector, useDispatch } from "react-redux";
import Anecdote from "./Anecdote";
import { vote } from "../reducers/anecdoteReducer";
import { scheduleNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    console.log(state);
    const matchingAnecdotes =
      state.filter !== ""
        ? state.anecdotes.filter((a) =>
            a.content.toLowerCase().includes(state.filter)
          )
        : [...state.anecdotes];
    const sortedAnecdotes = matchingAnecdotes.sort((a, b) => b.votes - a.votes);
    return sortedAnecdotes;
  });
  const dispatch = useDispatch();

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(vote(anecdote.id));
            dispatch(
              scheduleNotification(`you voted '${anecdote.content}'`, 5000)
            );
          }}
        />
      ))}
    </>
  );
};

export default AnecdoteList;
