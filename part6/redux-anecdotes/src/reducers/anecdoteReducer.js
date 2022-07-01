import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotesService";

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    updateAnecdote(anecdotes, { payload: nextAnecdote }) {
      const anecdoteIdx = anecdotes.findIndex(
        (anecdote) => anecdote.id === nextAnecdote.id
      );
      anecdotes[anecdoteIdx] = nextAnecdote;
    },
    setAnecdotes(_, { payload: nextAnecdotes }) {
      return nextAnecdotes;
    },
    appendAnecdote(anecdotes, { payload: anecdote }) {
      anecdotes.push(anecdote);
    },
  },
});

export const { newAnecdote, setAnecdotes, appendAnecdote, updateAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createAnecdote(content);
    console.log("newAnecdote", newAnecdote);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const vote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes;
    const anecdoteIdx = anecdotes.findIndex((anecdote) => anecdote.id === id);
    const newAnecdote = await anecdotesService.vote(id, anecdotes[anecdoteIdx]);
    dispatch(updateAnecdote(newAnecdote));
  };
};

export default anecdoteSlice.reducer;
