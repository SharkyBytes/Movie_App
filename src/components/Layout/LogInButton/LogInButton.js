import React from "react";
import { useHistory } from "react-router-dom";
import "./LogInButton.css";

const SigninButton = () => {
  let history = useHistory();

  function redirectToLogIn() {
    history.push("/login");
  }

  return (
    <div className="signin-btn__container">
      <button className="btn btn-danger" onClick={redirectToLogIn}>
        Log In
      </button>
    </div>
  );
};

export default SigninButton;
