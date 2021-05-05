import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then(resp => resp.json())
    .then(setPlants)
  }, [])

  return (
    <main>
      <NewPlantForm setPlants={setPlants} plants={plants}/>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <PlantList searchTerm={searchTerm} plants={plants} setPlants={setPlants}/>
    </main>
  );
}

export default PlantPage;
