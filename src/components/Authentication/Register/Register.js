import React, { useState } from "react";
import "./Register.css";
import "../../Layout/LogInButton/LogInButton.css";
import firebase from "../Firebase/Firebase";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      history.push("/login");
      console.log("ok");
    } catch (error) {
      alert(error.message);
    }
  }

  function redirectToLogin() {
    history.push("/login");
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="signin__container mt-5">
        <p>
          <h1 className="signin-h1">Create Account</h1>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="email">Email</label>
            <input
              name="email"
              type="email"
              class="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input
              name="password"
              type="password"
              class="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-danger w-100 mt-2">
              Register
            </button>
          </div>
        </form>
        <p>
          Already have an account?
          <span className="create-account-btn ml-2" onClick={redirectToLogin}>
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
