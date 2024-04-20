import React from "react";
import { render } from "react-dom";
import MovieCard from "../../MovieCard/MovieCard";
import "./MovieRecommendations.css";

class MovieRecommendations extends React.Component {
  state = {
    recommendationsList: {},
    isLoadingRecommendations: true,
    isLoadingGenre: true
  };

  fetchRecommendations = () => {
    //fetch movie genres
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=en-US"
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          genres: data,
          isLoadingGenre: false
        });
      });
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.props.idMovie +
        "/recommendations?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=en-US&page=1"
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          recommendationsList: data.results,
          isLoadingRecommendations: false
        });
      });
  };

  componentDidMount() {
    this.fetchRecommendations();
  }
  render() {
    let genres = [];

    const movies = this.state.isLoadingRecommendations
      ? ""
      : this.state.recommendationsList.map(movie => {
          genres = [];
          const getGenres = this.state.isLoadingGenre
            ? ""
            : movie.genre_ids.map(id => {
                this.state.genres.genres.map(genre => {
                  if (id === genre.id) {
                    genres.push(genre.name);
                  }
                });
              });
          return (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              note={movie.vote_average}
              genres={genres}
              imgSrc={movie.poster_path}
            />
          );
        });

    return (
      <div className="movie-recommendations__container">
        <p className="movie-recommendations__title">Recommendations</p>
        <div className="movie-recommendationsList_container justify-content-md-between justify-content-center">
          {movies}
        </div>
      </div>
    );
  }
}

export default MovieRecommendations;
