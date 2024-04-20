import React, { useContext, useEffect, useState } from "react";
import "./Watchlist.css";
import firebase from "../Authentication/Firebase/Firebase";
import MovieCard from "../MovieList/MovieCard/MovieCard";
import { AuthContext } from "../Authentication/Auth";
import BackgroundImage from "../Layout/BackgroundImage/BackgroundImage";

function Watchlist() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("watchlist").get();
      const list = [];
      const movies = data.docs.map(movie => {
        if (movie.data().userId === currentUser.uid) {
          list.push(movie.data());
        }
      });
      setMovieList(list);
      setIsLoading(false);
    };
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  return (
    <div>
      {movieList.length === 0 ? (
        ""
      ) : (
        <BackgroundImage src={movieList[0].imgSrc} />
      )}
      <h1 className="watchlist-title">My Watchlist</h1>
      <div
        className={
          movieList.length >= 5
            ? "movies__container justify-content-md-between justify-content-center"
            : "movies__containerminusfive"
        }
      >
        {isLoading
          ? "Loading..."
          : movieList.length === 0
          ? "Your Watchlist is empty"
          : ""}
        {movieList.map(movie => {
          const genres = [];
          movie.genres.map(genre => {
            genres.push(genre.name);
          });
          return (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              note={movie.note}
              genres={genres}
              imgSrc={movie.imgSrc}
              isWatchlist={true}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Watchlist;
