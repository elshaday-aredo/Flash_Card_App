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
  },[]);
 

  const trashDeck= async (deckToDelete) => {
    if (window.confirm("Delete this deck?")){
      setDecks((currentDecks) => {
        return currentDecks.filter((deck) => deckToDelete !== deck)
       })
       await deleteDeck(deckToDelete.id)

    } 
    
  }


  const createDeckbtn = <Link to="/decks/new" className="btn btn-primary mb-5" >Create Deck</Link>

  const deckCards = decks.map((deck) => 

      <div className="card">
        <div className="card-body">
            <h5 className="card-title">{deck.name}</h5>
            <p>{deck.cards.length} cards</p>
            <p className="card-text">{deck.description}</p>
            <a href="#" className="btn btn-primary mr-5" >View</a>
            <Link to={`decks/${deck.id}/study`} className="btn btn-primary mr-5">Study</Link>
            <a href="#" onClick={() => trashDeck(deck)} className="btn btn-danger">Delete</a>
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