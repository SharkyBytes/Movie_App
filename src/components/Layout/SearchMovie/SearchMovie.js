import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import "./SearchMovie.css";

export default function SearchMovie() {
  let history = useHistory();

  function SearchMovie(event) {
    if (event.target.value.length > 1) {
      history.push("/search/" + event.target.value);
    }
    if (event.target.value.length === 0) {
      history.push("/");
    }
  }

  return (
    <div className="d-flex align-items-center form-group has-search ml-sm-0 ml-md-3 mb-0">
      <input
        type="text"
        className="form-control"
        placeholder="Search for a Movie..."
        onKeyUp={SearchMovie}
      ></input>
      <span className="form-control-feedback">
        <SearchIcon />
      </span>
    </div>
  );
}
