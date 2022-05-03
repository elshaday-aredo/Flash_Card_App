import {Switch, Route} from "react-router-dom"
import CreateDeck from "./CreateDeck"
import Study from "./Study"

function DeckRouter(){



    return (
    <Switch>
      <Route path="/decks/new">
        <CreateDeck />
      </Route>
      <Route path="/decks/:deckId/study">
        <Study />
      </Route>
    </Switch>

    )
   
    
}

export default DeckRouter