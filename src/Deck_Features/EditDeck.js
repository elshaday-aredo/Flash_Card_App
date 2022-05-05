import { updateDeck, readDeck } from "../utils/api";
import {useRouteMatch, useHistory, Link } from "react-router-dom";
import { useState, useEffect, } from "react"


function EditDeck({deckName}){
  const {deckId} = useRouteMatch().params;
  const history = useHistory()
  const initialFormData = {name:"", description:""}
  const [formData, setFormData]= useState(initialFormData);


  useEffect(()=>{
    async function getDeck(){
     const deck = await readDeck(deckId);
      setFormData(deck);
    }
    getDeck();
    return()=>{setFormData(initialFormData)}
  },[deckId])

  

  async function handleFormSubmit(event){
    event.preventDefault();
    const deckUpdated = await updateDeck(formData)
    history.push(`/decks/${deckUpdated.id}`)
}
function handleChange({target}){
  const value = target.value
  setFormData({
    ...formData,
    [target.name]: value,
  });
  console.log({target})

}

  return (
    <>
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
        <li key="home" className="breadcrumb-item">
          <Link to="/">
            <span className="oi oi-home"></span> Home
          </Link>
        </li>          
        <li key="deckName" className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
        <li key="editDeck" className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
    </nav>


    <h1>Edit Deck</h1>
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="name"className="form-label">Name</label>
        <input onChange={handleChange} 
        value={formData.name} 
        type="text" 
        className="form-control" 
        name="name" 
        id="name"/>
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea onChange={handleChange}
        value={formData.description} 
        type="text-area" 
        className="form-control" 
        name="description" 
        id="description"
        row="3"/>
      </div>
      <Link to="/" type="button" className="btn btn-secondary mr-5">Cancel</Link>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </>
  )


  
}


export default EditDeck;