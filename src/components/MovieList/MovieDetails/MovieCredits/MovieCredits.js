import React from "react";
import "./MovieCredits.css";
import noimage from "./noimage.png";

function MovieCredits(props) {
  return (
    <div className="actor">
      {props.profile_path ? (
        <img
          alt="actor"
          src={`https://image.tmdb.org/t/p/w185${props.profile_path}`}
        />
      ) : (
        <img alt="no actor" src={noimage} />
      )}

      <div className="actor-name-character">
        <p>{props.name}</p>
        <p>{props.character}</p>
      </div>
    </div>
  );
}
export default MovieCredits;
