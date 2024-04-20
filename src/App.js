import React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { Home } from "./components/MovieList/Home/Home";
import MovieDetails from "./components/MovieList/MovieDetails/MovieDetails";
import Register from "./components/Authentication/Register/Register";
import LogIn from "./components/Authentication/LogIn/LogIn";
import Watchlist from "./components/Watchlist/Watchlist";
import { AuthProvider } from "./components/Authentication/Auth";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/search/:movieToSearch" component={Home} />
          <Route path="/moviedetails/:id" component={MovieDetails} />
          <Route path="/login" component={LogIn} />
          <Route path="/register" component={Register} />
          <Route path="/watchlist" component={Watchlist} />
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
