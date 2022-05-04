import { useState, useEffect } from "react"
import { createCard, readDeck } from "../utils/api"
import { Link, useHistory } from "react-router-dom"

function AddCard({deckId, deckName}){
    const [deck, setDeck] = useState({})
    const [formData, setFormData] = useState({front:"", back:""})
    const history= useHistory()
    
    useEffect(()=>{
      async function loadDeck(){
       const deckLoaded = await readDeck(deckId);
        setDeck(deckLoaded);
      }
      loadDeck();
    },[])
    
    
    async function handleFormSubmit(event){
        event.preventDefault();
        await createCard(deck.id, formData)
        // setFormData({front:"", back:""})  I need it to go back to empty 
        history.push(`/decks/${deck.id}`)

    }
    function handleChange({target}){
      const value = target.value
      setFormData({
        ...formData,
        [target.name]: value,
      });

    }
    
  
    return (
      <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li key="home" className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li key="deckName" className="breadcrumb-item active"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
          <li key="AddCard" className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
      </nav>
  
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="front"className="form-label">front</label>
          <input onChange={handleChange} 
          value={formData.front} 
          type="text" 
          className="form-control" 
          name="front" 
          id="front"/>
        </div>
        <div className="mb-3">
          <label className="form-label">back</label>
          <input onChange={handleChange}
          value={formData.back} 
          type="text-area" 
          className="form-control" 
          name="back" 
          id="back"/>
        </div>
        <Link to={`/decks/${deckId}`} type="button" className="btn btn-secondary mr-5">Done</Link>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
  
  </>
    )
  

}


export default AddCard;