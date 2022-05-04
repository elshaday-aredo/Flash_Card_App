import {Switch, Route} from "react-router-dom"
import CreateDeck from "./CreateDeck"
import Study from "./Study"
import Deck from "./Deck"

function DeckRouter(){



    return (
    <Switch>
      <Route path="/decks/new">
        <CreateDeck />
      </Route>
      <Route path="/decks/:deckId">
        <Deck />
      </Route>
    </Switch>

    )
   
    
}

export default DeckRouter