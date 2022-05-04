import { useState } from "react";
import {useRouteMatch, Link, useHistory} from "react-router-dom";
import CardStudyInfo from "./CardStudyInfo";
import NextCardBtn from "./NextCardBtn";



function StudySession({cards}){

  const {deckId} = useRouteMatch().params 
  const initialSession = {front:true, cardIndex:0}
  const [session, setSession] = useState({...initialSession})
  const history = useHistory()





  

    if(!cards) return null

    if(cards.length < 3){
        return (
            <>
            <h2> Not enough cards.</h2>
            <p>You need atleast 3 cards to study. There are {cards.length} cards in this deck.</p>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary"> Add Cards</Link>
            </>
        )       
    }

    function handleNextClick(){
      console.log(cards.length-1, session.cardIndex +1)
       if(cards.length -1 >= session.cardIndex +1) {
        setSession({front:true, cardIndex:session.cardIndex + 1})
       } else {
        setSession({...initialSession})
        if (!window.confirm("Restart cards?")) {
          history.push("/")
        }
         
       }
    }




    return (
        <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3">card {session.cardIndex + 1} out of {cards.length}</h5>
          <CardStudyInfo card={cards[session.cardIndex]} front={session.front}/> 
          <button onClick={()=> setSession({...session, front:!session.front})}className="btn btn-primary mr-5">Flip</button>
          <NextCardBtn handleNextClick={handleNextClick}front={session.front} />
        </div>
      </div>
    
    )

};


export default StudySession;