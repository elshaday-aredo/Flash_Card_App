import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home";
import { Switch, Route, Link } from "react-router-dom";
import DeckRouter from "../Deck_Features/DeckRouter";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><a href="#">Library</a></li>
          <li className="breadcrumb-item active" aria-current="page">Data</li>
        </ol>
      </nav>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks">
            <DeckRouter />
          </Route>
          <Route>
           <NotFound />
          </Route>
        </Switch>
        {/* TODO: Implement the screen starting here */}
       
      </div>
    </>
  );
}

export default Layout;
