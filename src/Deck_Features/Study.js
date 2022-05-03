import { readDeck } from "../utils/api"
import DeckRouter from "./DeckRouter"


function Study(deckId){

  if(deckId == deckId.id){
    return readDeck()
  }
  return (
    <>
    <h1>Study: Deck Name</h1>
    
    </>
        
  )

}


export default Study 