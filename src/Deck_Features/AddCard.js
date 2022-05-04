
import { useState } from "react"
import { createCard } from "../utils/api"
import { Link, useHistory } from "react-router-dom"

function AddCard(){
  
    const [formData, setFormData] = useState({front:"", back:""})
    const history= useHistory()
    
    async function handleFormSubmit(event){
        event.preventDefault();
        const postCard = await createCard(formData)
        history.push(`/decks/${postCard.id}`)
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
          <li key="home" className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li key="AddCard" className="breadcrumb-item active" aria-current="page">Add Deck</li>
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
        <Link to="/" type="button" className="btn btn-secondary mr-5">Done</Link>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
  
  </>
    )
  

}


export default AddCard;