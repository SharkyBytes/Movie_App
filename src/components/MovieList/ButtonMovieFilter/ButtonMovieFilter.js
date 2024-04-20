import React from "react";
import { ButtonGroup } from "reactstrap";
import { Button } from "reactstrap";
import "./ButtonMovieFilter.css";
import { withRouter } from "react-router-dom";

class ButtonMovieFilter extends React.Component {
  state = {
    selectedOption: this.props.selectedOption
      ? this.props.selectedOption
      : "popular"
  };

  handleChange = event => {
    const filter = event.target.value;
    this.setState({ selectedOption: filter }, () => {
      this.props.data.callbackFilter(this.state.selectedOption);
    });
  };

  render() {
    return (
      <div>
        <ButtonGroup>
          <Button
            value="popular"
            className={
              this.state.selectedOption === "popular" ? "btn-success" : ""
            }
            onClick={this.handleChange}
          >
            Popular
          </Button>
          <Button
            value="now_playing"
            onClick={this.handleChange}
            className={
              this.state.selectedOption === "now_playing" ? "btn-success" : ""
            }
          >
            Now Playing
          </Button>
          <Button
            value="top_rated"
            onClick={this.handleChange}
            className={
              this.state.selectedOption === "top_rated" ? "btn-success" : ""
            }
          >
            Top Rated
          </Button>
          <Button
            value="upcoming"
            onClick={this.handleChange}
            className={
              this.state.selectedOption === "upcoming" ? "btn-success" : ""
            }
          >
            Upcoming
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default withRouter(ButtonMovieFilter);
