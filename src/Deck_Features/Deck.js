import {Route, Switch, Link, useRouteMatch} from "react-router-dom"
import { readDeck, deleteDeck, deleteCard } from "../utils/api"
import { useEffect, useState } from "react"
import EditDeck from "./EditDeck"
import AddCard from "./AddCard"
import EditCard from "./EditCard"
import Study from "./Study"
import NotFound from "../Layout/NotFound"


function Deck() {
  const {deckId} = useRouteMatch().params;
  const[deck, setDeck]= useState({});

useEffect(()=>{
  async function displayDeck(){
    const deckDisplayed= await readDeck(deckId);
    setDeck(deckDisplayed);
  }
  displayDeck();
})

const trashDeck= async (deckToDelete) => {
  if(window.confirm("Delete this deck?")){
    await deleteDeck(deckToDelete.id);
  }
}

const trashCard= async (cardToDelete) => {
  if (window.confirm("Delete this card?")) {
    await deleteCard(cardToDelete.id);
  } 
}

if(!deck.id){return null}

const listofCards = deck.cards.map((card)=> {
  return (


    <div key={card.id} className="card">
      <div className="card-body">
        <p>{card.front}</p>
        <p className="card-text">{card.back}</p>
        <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className="btn btn-secondary mr-5">Edit</Link>
        <a href="#" onClick={()=>{trashCard(card)}}className="btn btn-danger">Delete</a>
      </div>
    </div> 

  )
  

})




return (
    <>
    <Switch>
      <Route exact path="/decks/:deckId/cards/new">
        <AddCard />
      </Route>
      <Route exact path="/decks/:deckId/cards/:cardId/edit">
        <EditCard deckName={deck.name}/>
      </Route>
      <Route exact path="/decks/:deckId/edit">
        <EditDeck deckName={deck.name}/>
      </Route>
      <Route exact path="/decks/:deckId/study">
      <Study />
      </Route>
      <Route exact path="/decks/:deckId">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li key="home" className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li key="deckName" className="breadcrumb-item active">{deck.name}</li>
          </ol>
        </nav>

        <h5 className="card-title">{deck.name}</h5>
        <p>{deck.cards.length} cards</p>
        <p className="card-text">{deck.description}</p>
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-1">Edit</Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-1">Study</Link>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mr-5">Add Card</Link>
        <a href="#" onClick={() => trashDeck(deck)} className="btn btn-danger">Delete</a>

        <h1>Cards</h1>
        {listofCards}
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>

      
     

    </>
)

}


export default Deck;