import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "./utils/api";
import { deleteDeck } from "./utils/api";


function Home (){

  const [decks, setDecks]= useState([])

  useEffect(()=>{
      async function getListOfDecks(){
        const listOfDecks = await listDecks()
        setDecks(listOfDecks)
          
      };
    getListOfDecks()
    return()=>{setDecks([])}
  },[]);
 

  const trashDeck= async (deckToDelete) => {
    if (window.confirm("Delete this deck?")){
      setDecks((currentDecks) => {
        return currentDecks.filter((deck) => deckToDelete !== deck)
       })
       await deleteDeck(deckToDelete.id)

    } 
    
  }


  const createDeckbtn = <Link to="/decks/new" className="btn btn-primary mb-5" >
    <span className="oi oi-plus" title="plus" aria-hidden="true"></span> &nbsp; Create Deck
  </Link>

  const deckCards = decks.map((deck) => 

      <div className="card">
        <div className="card-body">
            <h5 className="card-title">{deck.name}</h5>
            <p>{deck.cards.length} cards</p>
            <p className="card-text">{deck.description}</p>
            <Link to={`/decks/${deck.id}`}  className="btn btn-secondary mr-5" >
             <span className="oi oi-eye" title="eye" aria-hidden="true"></span> View
            </Link>

            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-5">
             <span className="oi oi-book" title="book" aria-hidden="true"></span> Study
            </Link>
            <button onClick={() => trashDeck(deck)} className="btn btn-danger">
             <span className="oi oi-trash" title="trash" aria-hidden="true"></span>
            </button>
        </div>
      </div> 
  )


  return (   
      <>  
      {createDeckbtn}  
      {deckCards}
      
      </>

  )



}


export default Home; 