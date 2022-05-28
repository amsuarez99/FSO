import axios from "axios";

const baseURL = "/api/persons";

const throwError = (error) => {
  throw new Error(error.response.data.error);
};

const unwrapResponse = (response) => response.data;

const getAll = () => {
  return axios.get(baseURL).then(unwrapResponse).catch(throwError);
};

const update = (id, newPerson) => {
  return axios
    .put(`${baseURL}/${id}`, newPerson)
    .then(unwrapResponse)
    .catch(throwError);
};

const create = (newPerson) => {
  return axios.post(baseURL, newPerson).then(unwrapResponse).catch(throwError);
};

const erase = (id) => {
  return axios.delete(`${baseURL}/${id}`).catch(throwError);
};

const phonebookService = {
  getAll,
  create,
  update,
  erase,
};

export default phonebookService;
