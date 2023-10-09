import { useEffect, useState, createContext } from "react";
import { getActors, getMovies, findCommonActors } from "./utilities";
import { ActorCard } from "./components/ActorCard";

export const AppContext = createContext();

function App() {
  const [allActors, setAllActors] = useState({});
  const [movies, setMovies] = useState([]);
  const [actorOne, setActorOne] = useState({ id: 206, name: "Keanu Reeves" });
  const [actorTwo, setActorTwo] = useState({ id: 115, name: "Nicolas Cage" });
  const [commonActors, setCommonActors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setActorsAndMovies = async () => {
      const actorsMap = await getActors();
      setAllActors(actorsMap);
      const movieList = await getMovies();
      setMovies(movieList);
      const commonActors = await findCommonActors(
        actorOne,
        actorTwo,
        movieList,
        actorsMap
      );
      setCommonActors(commonActors);
      setLoading(false);
    };

    setActorsAndMovies();
  }, []);

  useEffect(() => {
    const refreshCommonActors = async () => {
      setCommonActors([]);
      setLoading(true);
      const commonActors = await findCommonActors(
        actorOne,
        actorTwo,
        movies,
        allActors
      );
      setCommonActors(commonActors);
      setLoading(false);
    };

    refreshCommonActors();
  }, [actorOne.id, actorTwo.id]);

  return (
    <AppContext.Provider
      value={{ actorOne, setActorOne, actorTwo, setActorTwo, commonActors }}
    >
      <div className="flex flex-col text-center">
        <h1 className="text-3xl m-8">
          Starring with<br></br>
          <span className="text-blue-600">{actorOne.name}</span> or{" "}
          <span className="text-green-600">{actorTwo.name}</span>
        </h1>

        {loading && <div className="text-3xl">Loading...</div>}

        <div className="flex flex-wrap justify-center">
          {Object.keys(commonActors).map((actor) => (
              <ActorCard actor={actor} key={actor}/>
          ))}
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
