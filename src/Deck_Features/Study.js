import { readDeck } from "../utils/api";
import { Link, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import StudySession from "./StudySession";



function Study(){

  const {deckId} = useRouteMatch().params
  const [deck,setDeck]= useState({})
  const {cards} = deck // this is the list of cards in a given deck
  

  useEffect(() => {
    async function studyCard(){
     const deck = await readDeck(deckId)
      setDeck(deck)
    }
    studyCard()
  },[])





  return (
    <>
      <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li key="home" className="breadcrumb-item">
              <Link to="/">
                <span class="oi oi-home"></span> Home
              </Link>
            </li>
            <li key="deckName" className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
            <li key="Study" className="breadcrumb-item active" aria-current="page">Study</li>
          </ol>
        </nav>
          <h1>{deck.name}: Study</h1>
      <StudySession cards={cards} />
      
    
    </>
        
  )

}


export default Study 