import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseURL).then((response) => response.data);
};

const update = (id, newPerson) => {
  return axios
    .put(`${baseURL}/${id}`, newPerson)
    .then((response) => response.data);
};

const create = (newPerson) => {
  return axios.post(baseURL, newPerson).then((response) => response.data);
};

const erase = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

const testError = () => {
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  };
  return axios.delete(`${baseURL}/${nonExisting.id}`);
};

const phonebookService = {
  getAll,
  create,
  update,
  erase,
  testError,
};

export default phonebookService;
