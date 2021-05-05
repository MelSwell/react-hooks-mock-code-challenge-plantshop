import React, { useState } from "react";

function PlantCard({ 
  id, 
  name, 
  price, 
  image="https://via.placeholder.com/400", 
  plants, 
  setPlants }) {

  const [isInStock, setIsInStock] = useState(true)
  const [isUpdatePriceMode, setIsUpdatePriceMode] = useState(false)
  const [plantPrice, setPlantPrice] = useState(price)
  

  function toggleIsInStock() {
    setIsInStock(isInStock => !isInStock)
  }

  function toggleIsUpdatePriceMode() {
    setIsUpdatePriceMode(isUpdatePriceMode => !isUpdatePriceMode)
  }

  function handleChange(e) {
    setPlantPrice(e.target.value)
  }

  function handleCancelUpdate() {
    setPlantPrice(price)
    toggleIsUpdatePriceMode()
  }

  function handleFormSubmit(e) {
    e.preventDefault()

    const bodyData = {
      price: parseFloat(plantPrice)
    }

    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify(bodyData)
    })
    .then(resp => resp.json())
    .then((updatedPlant) => {
      const index = plants.findIndex(p => p.id === updatedPlant.id)
      const updatedPlants = [...plants]
      updatedPlants.splice(index, 1, updatedPlant)
      setPlants(updatedPlants)
      toggleIsUpdatePriceMode()
    })
  }

  function handleDeleteClick() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setPlants((prevPlants) => prevPlants.filter(plant => plant.id !== id))
    })
  }

  const form = (
    <form onSubmit={handleFormSubmit}>
      <input 
        type="number" 
        name="price" 
        step="0.01" 
        value={plantPrice} 
        onChange={handleChange} 
      />
      <input type="submit" />
    </form>
  )

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      
      {isUpdatePriceMode ? form : <p>Price: {price.toFixed(2)}</p>}

      {isInStock ? (
        <button onClick={toggleIsInStock} className="primary">In Stock</button>
      ) : (
        <button onClick={toggleIsInStock}>Out of Stock</button>
      )}

      {isUpdatePriceMode ? (
        <button onClick={handleCancelUpdate}>Cancel Price Update</button>
      ) : (
        <button onClick={toggleIsUpdatePriceMode}>Update Price</button>
      )}

      <button onClick={handleDeleteClick}>Delete Plant</button>
    </li>
  );
}

export default PlantCard;
