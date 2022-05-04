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
