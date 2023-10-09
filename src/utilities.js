const API = process.env.REACT_APP_API;
const HEADERS = { "x-chmura-cors": process.env.REACT_APP_ACCESS_TOKEN };

/**
 * Returns an object containing actors: {id: name}
 * @returns {Object.<number, string>} actorsMap
 */
export const getActors = async () => {
  const actors = await fetch(`${API}/actors`, {
    headers: HEADERS,
  });
  const actorsList = await actors.json();

  const actorsMap = {};
  for (let actor of actorsList) {
    actorsMap[actor.actorId] = actor.name;
  }
  return actorsMap;
};

/**
 * Returns a list of Movies
 * @returns {Array.<{movieId: Number, title: String, actors: Number[]}>} moviesList
 */
export const getMovies = async () => {
  const movies = await fetch(`${API}/movies`, {
    headers: HEADERS,
  });
  const moviesList = await movies.json();
  return moviesList;
};

/**
 * returns a list of actors who have been in films with actor one or actor two
 * and which movies they were in together
 * @param {{id: Number, name: String}} actorOne
 * @param {{id: Number, name: String}} actorTwo
 * @param {Array.<{movieId: Number, title: String, actors: Number[]}>} movies
 * @param {Object.<number, string>} actors
 * @returns {Array.<{name: String, id: Number, movies: [{movie: String, actorWith: String}]}>}
 */
export const findCommonActors = async (actorOne, actorTwo, movies, actors) => {
  const commonActors = {};

  for (const movie of movies) {
    let includesActorOne = movie.actors.includes(actorOne.id);
    let includesActorTwo = movie.actors.includes(actorTwo.id);

    if (includesActorOne || includesActorTwo) {
      for (const actorId of movie.actors) {
        if (actorId === actorOne.id || actorId === actorTwo.id) {
          continue;
        }
        if (!commonActors.hasOwnProperty(actorId)) {
          commonActors[actorId] = {
            name: actors[actorId],
            id: actorId,
            movies: [],
          };
        }

        let actorWith = includesActorOne
          ? actors[actorOne.id]
          : actors[actorTwo.id];
        if (includesActorOne && includesActorTwo) {
          actorWith = `${actors[actorOne.id]} and ${actors[actorTwo.id]}`;
        }

        commonActors[actorId].movies.push({
          title: movie.title,
          actorWith: actorWith,
        });
      }
    }
  }

  return commonActors;
};
