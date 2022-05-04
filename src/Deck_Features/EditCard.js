import { updateCard, readCard } from "../utils/api";
import {useRouteMatch, useHistory, Link } from "react-router-dom";
import { useState, useEffect, } from "react"


function EditCard({deckName}){
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
  },[cardId])

  async function handleFormSubmit(event){
    event.preventDefault();
    await updateCard(formData)
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
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
        <li key="home" className="breadcrumb-item">
          <Link to="/">
            <span class="oi oi-home"></span> Home
          </Link>
        </li>
        <li key="deckName" className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
        <li key="editCard" className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
        </ol>
      </nav>

    <h1>Edit Card</h1>
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="front"className="form-label">Front</label>
        <textarea onChange={handleChange} 
        value={formData.front} 
        type="text" 
        className="form-control" 
        name="front" 
        id="front"
        row="3"/>
      </div>
      <div className="mb-3">
        <label className="form-label">Back</label>
        <textarea onChange={handleChange}
        value={formData.back} 
        type="text-area" 
        className="form-control" 
        name="back" 
        id="back"
        row="3"/>
      </div>
      <Link to="/" type="button" className="btn btn-secondary mr-5">Done</Link>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
    </>
  )


  
}


export default EditCard;