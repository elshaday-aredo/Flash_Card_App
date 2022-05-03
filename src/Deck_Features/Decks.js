import {Route, Switch} from "react-router-dom"
import CreateDeck from "./CreateDeck"
import Home from "../Home"


Desks(){



return (
    <>
<Switch>
    <Route>
    <Home />
        </Route>
    <Route>
     <CreateDeck />
    </Route>
</Switch>
    
    
    </>
)

}


export default Decks;