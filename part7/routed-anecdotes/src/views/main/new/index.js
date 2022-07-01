import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../../../hooks";

const fields = [
  {
    name: "content",
    type: "text",
  },
  {
    name: "author",
    type: "text",
  },
  {
    name: "info",
    type: "url",
  },
];

const useForm = (initialState) => {
  const [state, setState] = useState(initialState);

  const onChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: [e.target.value],
    }));
  };

  const reset = () => {
    console.log("reset??");
    setState(initialState);
  };

  return [
    Object.entries(state).map(([fieldName, value]) => ({
      value,
      onChange,
      name: fieldName,
      type: "text",
    })),
    reset,
  ];
};

const CreateNew = (props) => {
  const [fields, reset] = useForm({
    content: "",
    author: "",
    info: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnecdote = {};
    fields.forEach((field) => (newAnecdote[field.name] = field.value));

    props.addNew({
      ...newAnecdote,
      votes: 0,
    });

    props.showNotification(`a new anecdote ${newAnecdote.content} created!`);
    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => {
          return (
            <div key={field.name}>
              {field.name}
              <input {...field} />
            </div>
          );
        })}
        <button type="reset">Submit</button>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
