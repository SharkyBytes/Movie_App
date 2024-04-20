import React, { useContext, useEffect, useState } from "react";
import "./MovieInfo.css";
import firebase from "../../../Authentication/Firebase/Firebase";
import { AuthContext } from "../../../Authentication/Auth";

function MovieInfo(props) {
  const { currentUser } = useContext(AuthContext);

  async function addToWatchList(event) {
    if (currentUser) {
      const movieToAdd = {
        id: event.target.id,
        title: props.title,
        note: props.vote_average,
        genres: props.genres,
        imgSrc: props.poster_path,
        userId: currentUser.uid
      };
      const db = firebase.firestore();
      const data = await db.collection("watchlist").get();
      let isAlreadyInWatchList = false;
      const watchlist = data.docs.map(movie => {
        if (
          movie.data().id === movieToAdd.id &&
          movie.data().userId === currentUser.uid
        ) {
          isAlreadyInWatchList = true;
        }
      });
      //Check if not already in watchlist
      if (!isAlreadyInWatchList) {
        db.collection("watchlist").add(movieToAdd);
      } else {
        alert("This movie is already in your Watchlist !");
      }
    } else {
      alert("You must be loggin in to add a movie to your Watchlist !");
    }
  }

  return (
    <div>
      <div className="d-flex flex-row movie-details__topcontainer">
        <div className="movie-details-img">
          <img
            src={`https://image.tmdb.org/t/p/w300${props.poster_path}`}
            alt=""
          />
        </div>

        <div className="d-flex flex-column title-overview-container">
          <h1>{props.title}</h1>
          <button
            id={props.id}
            onClick={addToWatchList}
            className="btn btn-danger add-watchList-btn"
          >
            Add to my Watchlist
          </button>
          <label className="moviecard__note mt-2">{props.vote_average}</label>
          <p className="movie-details__overview">{props.overview}</p>
          <p className="movie-details-genre__p">
            Genres:{" "}
            {props.genres.map(genre => (
              <label key={genre.name} className="movie-details-genre">
                {genre.name}
              </label>
            ))}
          </p>
        </div>
      </div>
      <div className="movie-details__topcontainer__bottomdetails">
        <span>Release date: {props.release_date}</span>
        <span>Duration: {props.runtime + "m"}</span>
        <span>Budget: {props.budget + "$"}</span>
      </div>
    </div>
  );
}

export default MovieInfo;
