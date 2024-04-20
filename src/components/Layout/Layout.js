import React from "react";
import { Container } from "reactstrap";
import NavBar from "./NavBar/NavBar";
import "./Layout.css";

export default function Layout(props) {
  return (
    <div>
      <NavBar />
      <Container className="main-container">{props.children}</Container>
    </div>
  );
}
