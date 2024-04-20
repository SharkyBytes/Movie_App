import React, { useContext, useEffect, useState } from "react";
import "./NavBar.css";
import { Container } from "reactstrap";
import VideocamIcon from "@material-ui/icons/Videocam";
import { useHistory } from "react-router-dom";
import SearchMovie from "../SearchMovie/SearchMovie";
import LogInButton from "../LogInButton/LogInButton";
import LogOutButton from "../LogOutButton/LogOutButton";
import { AuthContext } from "../../Authentication/Auth";
import MenuIcon from "@material-ui/icons/Menu";

function Header() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  let history = useHistory();

  function goHome() {
    history.push("/");
  }

  function goToWatchList() {
    history.push("/watchlist");
  }

  function toggleMenuBurger() {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  return (
    <div className="header">
      <Container className="header__container">
        <div className="icon-title__container">
          <div className="d-flex align-items-center" onClick={goHome}>
            <VideocamIcon className="header__icon" />
            <h1>React Movie</h1>
          </div>
          <SearchMovie className="ml-3 mb-sm-0" />

          <MenuIcon className="burger-icon" onClick={toggleMenuBurger} />
          <div
            id="toggleState"
            className={`burger-menu ${isBurgerMenuOpen ? "open" : "closed"}`}
          >
            {currentUser ? (
              <button
                className="btn btn-danger ml-2 btn-my-watchlist"
                onClick={goToWatchList}
              >
                My Watchlist
              </button>
            ) : (
              ""
            )}

            {currentUser ? <LogOutButton /> : <LogInButton />}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
