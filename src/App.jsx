import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  useQuery,
  gql,
  useMutation,
} from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import "./App.css";

/* 1. Apollo Client Setup */
const client = new ApolloClient({
  uri: "http://localhost:3001", // 1.1 GraphQL endpoint
  cache: new InMemoryCache(), // 1.2 Cache requests
});

function App() {
  return (
    // 2. Wrap the React App in the Apollo Provider
    <ApolloProvider client={client}>
      <MoviesList />
    </ApolloProvider>
  );
}

/*
  1. Diseñamos el Query que queremos ejecutar
  1.1 `gql` es un método que serializa nuestro query
  1.2 Dentro de él estará la información que vamos a recibir
*/
const ALL_MOVIES = gql`
  query {
    allMovies {
      id
      name
      director
      category
    }
  }
`;


const REMOVE_MOVIE = gql`
  mutation RemoveMovie($id: ID!) {
    removeMovie(id: $id) {
      id
    }
  }
`;

function MoviesList() {
  /*
    2. Usamos useQuery, el hook de Apollo Client para leer datos remotos
    2.1 Le pasamos ALL_MOVIES a useQuery y el nos retorna data, loading, error
    2.2 Con estos tres valores podremos:
    2.2.1 error - Validar si hay un error en el resultado de la operación
    2.2.2 loading - Validar si la operación está en proceso o ya ha terminado
    2.2.3 data - Obtener los datos y usarlos en nuestro componente
  */
  const { error, loading, data } = useQuery(ALL_MOVIES);

  /*
    3. Usamos useMutation, el hook de Apollo Client para modificar datos remotos
    3.1 Le pasamos REMOVE_MOVIE a useMutation, luego el nos retornara un arreglo con:
    3.1.1 Una función actualizadora, que se puede ejecutar programaticamente,
          esta función recibe las variables con las que la mutación ocurrirá
    3.1.2 Un objeto con el resultado de la mutación (data, loading, error).
  */
  const [removeMovie] = useMutation(REMOVE_MOVIE);
  if (error) return <p className="movies-list__error">{error.message}</p>;
  if (loading) return <p className="movies-list__loading">Loading...</p>;

  /*
    4. Declaramos un manejador de eventos el cual:
    4.1 Obtiene el id de la tarjeta que ha se quiere eliminar
    4.2 Usamos la función actualizadora pasandole el id que vamos a eliminar
  */
  function onTrashClick(evt) {
    const { currentTarget } = evt;
    const { id } = currentTarget;
    removeMovie({
      variables: {
        id,
      },
    });
  }

  return (
    <>
      <h1 className="movies-title">Movies List</h1>
      <ul className="movies-list">
        {data.allMovies.map((movie) => (
          <li className="movies-list__item" key={movie.id}>
            <p>
              <span>Name:</span>
              {movie.name}
            </p>
            <p>
              <span>Director:</span>
              {movie.director}
            </p>
            <p>
              <span>Category:</span>
              {movie.category}
            </p>
            <button
              id={movie.id}
              onClick={onTrashClick}
              className="movies-list__trash"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
