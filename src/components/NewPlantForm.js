import React, {useState} from "react";

function NewPlantForm({ setPlants, plants }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: ""
  })

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newPlant = {
      name: formData.name,
      price: parseFloat(formData.price),
      image: formData.image
    }

    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify(newPlant)
    })
    .then(res => res.json())
    .then((newPlant) => setPlants([ ...plants, newPlant ]))

    setFormData({
      name: "",
      price: "",
      image: ""
    })
  }

  return (

    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={formData.name} 
          name="name" 
          placeholder="Plant name"
          onChange={handleChange} 
        />
        <input 
          type="text" 
          value={formData.image} 
          name="image" 
          placeholder="Image URL" 
          onChange={handleChange}
        />
        <input 
          type="number" 
          value={formData.price} 
          name="price" 
          step="0.01" 
          placeholder="Price"
          onChange={handleChange} 
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
