import React from "react";
import MealsList from "../client/components/MealsList";

function Meals() {
  return (
    <div className="main-page">
      <h1 className="meal-page-h1">Taste a meal</h1>
      <MealsList />
    </div>
  );
}

export default Meals;
