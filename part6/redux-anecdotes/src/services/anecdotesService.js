import axios from "axios";

export const getAll = () => {
  return axios.get("/anecdotes").then((response) => response.data);
};

export const createAnecdote = (content) => {
  const anecdote = {
    content,
    votes: 0,
  };
  return axios.post("/anecdotes", anecdote).then((response) => response.data);
};

export const vote = (id, anecdote) => {
  return axios
    .patch(`/anecdotes/${id}`, {
      votes: anecdote.votes + 1,
    })
    .then((response) => response.data);
};

const anecdotesService = {
  getAll,
  createAnecdote,
  vote,
};

export default anecdotesService;
