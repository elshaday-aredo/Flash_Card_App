import {Switch, Route} from "react-router-dom"
import CreateDeck from "./CreateDeck"
import Study from "./Study"
import Deck from "./Deck"
import NotFound from "../Layout/NotFound"

function DeckRouter(){



    return (
    <Switch>
      <Route path="/decks/new">
        <CreateDeck />
      </Route>
      <Route path="/decks/:deckId">
        <Deck />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>

    )
   
    
}

export default DeckRouter