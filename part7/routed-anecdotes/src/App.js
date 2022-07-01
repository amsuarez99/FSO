import { useState } from "react";
import { Routes, Route, Navigate, useMatch } from "react-router-dom";

import MainLayout from "./layouts/main";

import AnecdoteList from "./views/main/anecdotes";
import Anecdote from "./views/main/anecdote";
import About from "./views/main/about";
import CreateNew from "./views/main/new";
import Notification from "./views/main/notification";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const showNotification = (content) => {
    setNotification(content);
    setTimeout(() => {
      console.log("test");
      setNotification(null);
    }, 5000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);
  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  console.log(notification);

  const match = useMatch("/anecdotes/:id");
  const anecdote = match ? anecdoteById(Number(match.params.id)) : null;

  return (
    <MainLayout>
      {notification && <Notification message={notification} />}
      <Routes>
        <Route
          path="/anecdotes/new"
          element={
            <CreateNew addNew={addNew} showNotification={showNotification} />
          }
        />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route
          path="/anecdotes"
          element={<AnecdoteList anecdotes={anecdotes} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate replace to="/anecdotes" />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
