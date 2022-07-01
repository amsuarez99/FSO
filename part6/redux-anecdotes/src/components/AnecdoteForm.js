import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
const AnecdoteForm = ({ handleSubmit }) => {
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

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit(e) {
      e.preventDefault();
      const content = e.target.anecdote.value;
      dispatch(createAnecdote(content));
      e.target.anecdote.value = "";
    },
  };
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm;
