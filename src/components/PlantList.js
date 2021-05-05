import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, searchTerm, setPlants }) {

  const plantsToDisplay = plants.filter((p) => {
    return p.name.toUpperCase().includes(searchTerm.toUpperCase())
  })

  const plantCards = plantsToDisplay.map((p) => {
    return (
      <PlantCard 
      key={p.id}
      plants={plants}
      setPlants={setPlants} 
      { ...p }
      />
    )
  })

  return (
    <ul className="cards">{plantCards}</ul>
  );
}

export default PlantList;
