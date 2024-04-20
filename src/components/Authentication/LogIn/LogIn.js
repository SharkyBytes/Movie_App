import React, { useState } from "react";
import "./LogIn.css";
import "../../Layout/LogInButton/LogInButton.css";
import firebase from "../Firebase/Firebase";
import { useHistory } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push("/");
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  function redirectToRegister() {
    history.push("/register");
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="signin__container mt-5">
        <p>
          <h1 className="signin-h1">Log In</h1>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-danger w-100 mt-2">
              Log In
            </button>
          </div>
        </form>
        <p>
          Don't have an account?
          <span
            className="create-account-btn ml-2"
            onClick={redirectToRegister}
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
