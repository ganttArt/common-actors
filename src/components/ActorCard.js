import { useContext, useState } from "react";
import { AppContext } from "../App";
import ReactCardFlip from "react-card-flip";

export const ActorCard = (actor) => {
  const context = useContext(AppContext);
  const actorId = actor.actor;
  const [flip, setFlip] = useState(false);

  return (
    <ReactCardFlip isFlipped={flip} flipDirection="vertical">
      <div
        className="w-80 h-80 m-4 bg-slate-100	flex flex-col items-center justify-center rounded-xl"
        onClick={() => setFlip(!flip)}
      >
        <h2 className="text-2xl my-4">{context.commonActors[actorId].name}</h2>
      </div>
      <div
        className="w-80 h-80 m-4 bg-slate-100	flex flex-col items-center justify-between rounded-xl"
        onClick={() => setFlip(!flip)}
      >
        <ul className="mt-4 mx-4">
          {context.commonActors[actorId].movies.map((movie, index) => (
            <li key={index} className="my-2">
              <b>{movie.title}</b><br></br>with {movie.actorWith}
            </li>
          ))}
        </ul>

        <div className="w-full">
          <button
            className="p-2 m-2 bg-blue-100 rounded-lg hover:bg-blue-200 hover:rounded-lg text-center w-2/5"
            onClick={() =>
              context.setActorOne({
                id: Number(actorId),
                name: context.commonActors[actorId].name,
              })
            }
          >
            Swap with {context.actorOne.name.split(" ")[0]}
          </button>
          <button
            className="p-2 m-4 bg-green-100 rounded-lg hover:bg-green-200 hover:rounded-lg text-center w-2/5"
            onClick={() =>
              context.setActorTwo({
                id: Number(actorId),
                name: context.commonActors[actorId].name,
              })
            }
          >
            Swap with {context.actorTwo.name.split(" ")[0]}
          </button>
        </div>
      </div>
    </ReactCardFlip>
  );
};
