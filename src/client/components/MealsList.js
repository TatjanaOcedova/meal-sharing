import React from "react";
import { useMeals } from "../contexts/MealsContext";
import { Link } from "react-router-dom";
import MenuMeal from "./MenuMeal";

function MealsList() {
  const { meals, error, isLoaded } = useMeals();

  const newMeals = [...meals];

  return (
    <div className="meals-holder">
      {isLoaded ? (
        <div className=" lds-ripple" style={{ textAlign: "center" }}>
          <div>loading...</div>
        </div>
      ) : error ? (
        <div> {error} </div>
      ) : (
        newMeals.map((meal) => {
          return (
            <div key={meal.id} className="meals-container">
              <Link
                to={`/meals/${meal.id}`}
                style={{
                  textDecoration: "unset",
                  color: "#138b87",
                }}
              >
                <MenuMeal meal={meal} />
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}

export default MealsList;
