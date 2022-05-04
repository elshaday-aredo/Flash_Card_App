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
        <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className="btn btn-secondary mr-3">
         <span className="oi oi-pencil" title="pencil" aria-hidden="true"></span> Edit
        </Link>
    
        <a href="#" onClick={()=>{trashCard(card)}}className="btn btn-danger">
          <span className="oi oi-trash" title="trash" aria-hidden="true"></span>
        </a>
      </div>
    </div> 

  )
  

})




return (
    <>
    <Switch>
      <Route exact path="/decks/:deckId/cards/new">
        <AddCard deckId={deck.id} deckName={deck.name}/>
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
            <li key="home" className="breadcrumb-item">
              <Link to="/">
                <span class="oi oi-home"></span> Home
              </Link>
            </li>
            <li key="deckName" className="breadcrumb-item active">{deck.name}</li>
          </ol>
        </nav>

        <h5 className="card-title">{deck.name}</h5>
        <p>{deck.cards.length} cards</p>
        <p className="card-text">{deck.description}</p>
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2 mb-5">
         <span className="oi oi-pencil" title="pencil" aria-hidden="true"></span> Edit
        </Link>

        <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2 mb-5">
         <span className="oi oi-book" title="book" aria-hidden="true"></span> Study
        </Link>

        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mr-5 mb-5">
          <span className="oi oi-plus" title="plus" aria-hidden="true"></span> &nbsp; Add Cards
        </Link>
       
        <a href="#" onClick={() => trashDeck(deck)} className="btn btn-danger mb-5">
        <span className="oi oi-trash" title="trash" aria-hidden="true"></span>
        </a>


        <h2>Cards</h2>
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