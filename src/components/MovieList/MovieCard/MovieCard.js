import React, { useContext } from "react";
import "./MovieCard.css";
import { useHistory } from "react-router-dom";
import noimage from "../MovieDetails/MovieCredits/noimage.png";
import { AuthContext } from "../../Authentication/Auth";
import firebase from "../../Authentication/Firebase/Firebase";

function MovieCard(props) {
  let history = useHistory();
  const { currentUser } = useContext(AuthContext);

  function showDetails(event) {
    history.push(`/moviedetails/${event.currentTarget.id}`);
  }

  const genres = props.genres.map((genre, i) => {
    if (i === props.genres.length - 1) return <label key={i}>{genre}</label>;
    else return <label key={i}>{genre},&nbsp; </label>;
  });

  function removeFromWatchlist(event) {
    event.stopPropagation();
    const movieId = props.id;
    const userId = currentUser.uid;
    const db = firebase.firestore();
    const query = db
      .collection("watchlist")
      .where("userId", "==", userId)
      .where("id", "==", movieId);
    query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
    document.getElementById(movieId).remove();
  }

  const id = props.id;
  return (
    <div id={id} className="moviecard__container" onClick={showDetails}>
      {props.imgSrc ? (
        <img alt="" src={`https://image.tmdb.org/t/p/w300${props.imgSrc}`} />
      ) : (
        <img className="noimage" alt="" src={noimage} />
      )}
      <div className="moviecard__container__info">
        <h3>{props.title}</h3>
        <label className="moviecard__note">{props.note}</label>
        {genres}
      </div>
      <div className="filler"></div>
      {props.isWatchlist ? (
        <div className="remove-btn__container">
          <button
            className="btn btn-danger remove-btn"
            onClick={removeFromWatchlist}
          >
            Remove
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default MovieCard;
