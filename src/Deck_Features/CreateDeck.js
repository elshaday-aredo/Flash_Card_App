import { useState } from "react"
import { createDeck } from "../utils/api"
import { Link, useHistory } from "react-router-dom"


 
function CreateDeck() {

  const [formData, setFormData] = useState({name:"", description:""})
  const history= useHistory()
  
  async function handleFormSubmit(event){
      event.preventDefault();
      const postDeck = await createDeck(formData)
      history.push(`/decks/${postDeck.id}`)
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
            <span className="oi oi-home"></span> Home
          </Link>
        </li>
        <li key="CreateDeck" className="breadcrumb-item active" aria-current="page">Create Deck</li>
      </ol>
    </nav>

    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="name"className="form-label">name</label>
        <input onChange={handleChange} 
        value={formData.name} 
        type="text" 
        className="form-control" 
        name="name" 
        id="name"/>
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input onChange={handleChange}
        value={formData.description} 
        type="text-area" 
        className="form-control" 
        name="description" 
        id="description"/>
      </div>
      <Link to="/" type="button" className="btn btn-danger mr-5">Cancel</Link>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>

</>
  )

}


export default CreateDeck

