import { useEffect, useState } from "react";
import Person from "./components/Person";
import phonebookService from "./services/phonebook";
import Notification from "./components/Notification";

const Filter = ({ value, handler }) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={handler} />
    </div>
  );
};

const PersonForm = ({ values: { phone, name }, handlers }) => (
  <form>
    <div>
      name: <input value={name} onChange={handlers.newName} />
    </div>
    <div>
      phone: <input value={phone} onChange={handlers.newPhone} />
    </div>
    <div>
      <button type="submit" onClick={handlers.addPerson}>
        add
      </button>
    </div>
  </form>
);

const useNotification = () => {
  const [message, setMessage] = useState();

  return [
    message,
    (message) => {
      setMessage(message);
      setTimeout(() => {
        setMessage(undefined);
      }, 5000);
    },
  ];
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [personSearch, setPersonSearch] = useState("");
  const [notification, showNotification] = useNotification();

  useEffect(() => {
    phonebookService.getAll().then(setPersons);
  }, []);

  const findPerson = (name) => persons.find((person) => person.name === name);

  const handlers = {
    newName: (event) => {
      setNewName(event.target.value);
    },
    searchPerson: (event) => {
      setPersonSearch(event.target.value);
    },
    newPhone: (event) => {
      setNewPhone(event.target.value);
    },
    addPerson: (event) => {
      event.preventDefault();

      const foundPerson = findPerson(newName);

      const addNewPerson = async () => {
        const newPerson = { name: newName, number: newPhone };
        try {
          const returnedPerson = await phonebookService.create(newPerson);
          setPersons((prev) => prev.concat(returnedPerson));
          showNotification({
            text: `Added ${newPerson.name}`,
            status: "success",
          });
        } catch (error) {
          showNotification({
            text: error.message,
            status: "error",
          });
        }
      };

      const updateExistingPerson = async () => {
        const updatedPerson = { ...foundPerson, number: newPhone };
        try {
          const returnedPerson = await phonebookService.update(
            updatedPerson.id,
            updatedPerson
          );

          setPersons((oldPeople) =>
            oldPeople.map((person) =>
              person.id === returnedPerson.id ? returnedPerson : person
            )
          );

          showNotification({
            text: `Updated ${updatedPerson.name}`,
            status: "success",
          });
        } catch (error) {
          showNotification({
            text: error.message,
            status: "error",
          });
        }
      };

      if (!foundPerson) {
        addNewPerson();
      } else if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        updateExistingPerson();
      }
    },

    deletePerson: (person) => {
      if (window.confirm(`Delete ${person.name}?`))
        phonebookService
          .erase(person.id)
          .then(() => {
            setPersons((oldPeople) =>
              oldPeople.filter((p) => p.id !== person.id)
            );
          })
          .then(() => {
            showNotification({
              text: `Removed ${person.name} from the phonebook`,
              status: "error",
            });
          })
          .catch((error) => {
            showNotification({
              text: error.message,
              status: "error",
            });
          });
    },
  };

  const shownPeople = persons.filter((person) =>
    person.name.includes(personSearch)
  );

  return (
    <div>
      <Notification message={notification} />
      <h2>Phonebook</h2>
      <Filter value={personSearch} handler={handlers.searchPerson} />
      <h2>Add a new</h2>
      <PersonForm
        values={{ newName, newPhone }}
        handlers={{
          newName: handlers.newName,
          newPhone: handlers.newPhone,
          addPerson: handlers.addPerson,
        }}
      />
      <h2>Numbers</h2>
      {shownPeople.map((person) => (
        <>
          <Person key={"person" + person.id} person={person} />
          <button
            key={"button" + person.id}
            onClick={() => handlers.deletePerson(person)}
          >
            delete
          </button>
        </>
      ))}
    </div>
  );
};

export default App;
