import { updateCard, readCard } from "../utils/api";
import {useRouteMatch, useHistory, Link } from "react-router-dom";
import { useState, useEffect, } from "react"


function EditCard(){
  const {cardId,deckId} = useRouteMatch().params;
  const history = useHistory()
  const initialFormData = {front:"", back:""}
  const [formData, setFormData]= useState({...initialFormData});


  useEffect(()=>{
    async function getCard(){
     const card = await readCard(cardId);
      setFormData(card);
    }
    getCard();
  },[])

  async function handleFormSubmit(event){
    event.preventDefault();
    const cardUpdated = await updateCard(formData)
    history.push(`/decks/${deckId}`)
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
    <h1>Edit Card</h1>
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="front"className="form-label">Front</label>
        <input onChange={handleChange} 
        value={formData.front} 
        type="text" 
        className="form-control" 
        name="front" 
        id="front"/>
      </div>
      <div className="mb-3">
        <label className="form-label">Back</label>
        <input onChange={handleChange}
        value={formData.back} 
        type="text-area" 
        className="form-control" 
        name="back" 
        id="back"/>
      </div>
      <Link to="/" type="button" className="btn btn-secondary mr-5">Done</Link>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
    </>
  )


  
}


export default EditCard;