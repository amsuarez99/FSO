import { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

import Loader from "./Loader";
import Error from "./Error";

import Select from "react-select";

export const GET_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      id
      name
      bookCount
      born
    }
  }
`;

const EDIT_AUTHOR = gql`
  mutation ($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
      name
      born
      bookCount
    }
  }
`;

const EditAuthors = ({ authorNames }) => {
  // const client = useApolloClient();
  // const cacheAuthor = client.readFragment({
  //   id: `Author:${authorId}`,
  //   fragment: gql`
  //     fragment AuthorFrag on Author {
  //       id
  //       name
  //       born
  //     }
  //   `,
  // });

  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    update(cache, mutationResult) {
      cache.modify({
        fields: {
          allAuthors(prev, { toReference }) {
            const authorRef = toReference(mutationResult.data?.editAuthor);
            if (!authorRef) return [...prev, authorRef];
            return prev;
          },
        },
      });
    },
  });

  // const [author, setAuthor] = useState(cacheAuthor);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateAuthor({
      variables: {
        name: formData.get("name"),
        setBornTo: Number(formData.get("born")),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select options={authorNames} name="name" />
      <div>
        born
        <input name="born" type="number" />
      </div>
      <button>edit author</button>
    </form>
  );
};

const Authors = () => {
  const [error, setError] = useState();
  const { data, loading } = useQuery(GET_AUTHORS, {
    onError(error) {
      setError(error.graphQLErrors[0].message);
    },
    onCompleted(data) {
      if (!data.allAuthors) setError("Author not found");
    },
  });
  const [authorId, setAuthorId] = useState();

  if (loading) return <Loader />;
  if (error) return <Error msg={error} />;

  const authorNames = data?.allAuthors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name} onClick={() => setAuthorId(a.id)}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {authorId && <EditAuthors key={authorId} authorNames={authorNames} />}
    </div>
  );
};

export default Authors;
