import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useResource = (baseUrl) => {
  const token = useRef(undefined);
  const [resources, setResources] = useState([]);

  const setToken = useCallback((newToken) => {
    token.current = `bearer ${newToken}`;
  }, []);

  const getAll = useCallback(async () => {
    const response = (await axios.get(baseUrl)).data;
    setResources(response);
  }, [baseUrl]);

  const create = useCallback(
    async (newObject) => {
      const config = {
        headers: { Authorization: token },
      };

      const response = (await axios.post(baseUrl, newObject, config)).data;
      setResources((res) => res.concat(response));
    },
    [baseUrl]
  );

  const update = useCallback(
    async (id, newObject) => {
      const response = (await axios.put(`${baseUrl} /${id}`, newObject)).data;
      setResources((prev) =>
        prev.map((obj) => (obj.id === response.id ? response : obj))
      );
    },
    [baseUrl]
  );

  const service = useMemo(
    () => ({
      setToken,
      getAll,
      create,
      update,
    }),
    [setToken, getAll, create, update]
  );

  useEffect(() => {
    service.getAll();
  }, [baseUrl, service]);

  return [resources, service];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
