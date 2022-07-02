import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Loader from "./Loader";
import Error from "./Error";

export const GET_BOOKS = gql`
  query AllBooks {
    allBooks {
      id
      title
      author
      published
    }
  }
`;

const Books = () => {
  const [error, setError] = useState();
  const { data, loading } = useQuery(GET_BOOKS, {
    onError(error) {
      setError(error.graphQLErrors[0].message);
    },
    onCompleted(data) {
      if (!data.allBooks) setError("Books not found");
    },
  });

  if (loading) return <Loader />;
  if (error) return <Error msg={error} />;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
