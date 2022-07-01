import { useSelector, useDispatch } from "react-redux";
import { vote, newAnecdote } from "./reducers/anecdoteReducer";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { scheduleNotification } from "./reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => (
  <div>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div>
);

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const matchingAnecdotes = state.filter
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
            scheduleNotification(dispatch, `you voted '${anecdote.content}'`);
          }}
        />
      ))}
    </>
  );
};

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(newAnecdote(content));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

const App = () => {
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
