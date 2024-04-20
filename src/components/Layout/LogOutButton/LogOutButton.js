import React from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../Authentication/Firebase/Firebase";
import Firebase from "../../Authentication/Firebase/Firebase";
import "./LogOutButton.css";

const SigninButton = () => {
  let history = useHistory();

  async function handleLogOut() {
    try {
      firebase.auth().signOut();
      history.push("/#");
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="signin-btn__container">
      <button className="btn btn-danger" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default SigninButton;
