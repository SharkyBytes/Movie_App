import React from "react";
import BackgroundImage from "../../Layout/BackgroundImage/BackgroundImage";
import MovieCredits from "./MovieCredits/MovieCredits";
import "./MovieDetails.css";
import MovieInfo from "./MovieInfo/MovieInfo";
import MovieRecommendations from "./MovieRecommendations/MovieRecommendations";

class MovieDetails extends React.Component {
  state = {
    id: this.props.match.params.id,
    title: "",
    overview: "",
    poster_path: "",
    backdrop_path: "",
    genres: [],
    status: "",
    release_date: "",
    budget: 0,
    revenue: 0,
    vote_average: 0,
    runtime: 0,
    cast: [],
    isCastReady: false
  };

  fetchMovieDetails = () => {
    this.state.isCastReady = false;
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.state.id +
        "?api_key=" +
        process.env.REACT_APP_TMDB_KEY
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          title: data.title,
          overview: data.overview,
          poster_path: data.poster_path,
          backdrop_path: data.backdrop_path,
          genres: data.genres,
          status: data.status,
          release_date: data.release_date,
          budget: data.budget,
          revenue: data.revenue,
          vote_average: data.vote_average,
          runtime: data.runtime
        });
      });
  };

  fetchMovieCredits = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.state.id +
        "/credits?api_key=" +
        process.env.REACT_APP_TMDB_KEY
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ cast: data.cast, isCastReady: true });
      });
  };

  componentDidMount() {
    this.fetchMovieDetails();
    this.fetchMovieCredits();
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(props) {
    this.setState({ id: props.match.params.id }, () => {
      this.fetchMovieDetails();
      this.fetchMovieCredits();
      window.scrollTo(0, 0);
    });
  }

  render() {
    const movieCredits = this.isCastReady
      ? ""
      : this.state.cast.map(cast => {
          return (
            <MovieCredits
              key={cast.id}
              name={cast.name}
              character={cast.character}
              profile_path={cast.profile_path}
            />
          );
        });
    return (
      <div className="movie-details__container">
        <BackgroundImage src={this.state.backdrop_path} />
        <MovieInfo
          id={this.state.id}
          title={this.state.title}
          overview={this.state.overview}
          poster_path={this.state.poster_path}
          genres={this.state.genres}
          release_date={this.state.release_date}
          runtime={this.state.runtime}
          budget={this.state.budget}
          vote_average={this.state.vote_average}
        />
        <div className="movie-credits__container">
          <p className="movie-credits__actors">Actors</p>
          <div className="movie-credits__actors__container">{movieCredits}</div>
        </div>
        <MovieRecommendations idMovie={this.state.id} />
      </div>
    );
  }
}

export default MovieDetails;
