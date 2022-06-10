import React, { useState, useEffect, useContext } from "react";
import MenuMeal from "./MenuMeal";
import ReservationForm from "../Forms/ReservationForm";

function MealsDetail({ match }) {
  const [meal, setMeal] = useState({});
  const [showReservation, setShowReservation] = useState(false);

  console.log("meal", meal);

  useEffect(() => {
    fetchMeal();
  }, []);

  const fetchMeal = async () => {
    const fetchMeal = await fetch(`/api/meals/${match.params.id}`);
    const meal = await fetchMeal.json();
    setMeal(meal[0]);
  };

  return (
    <div className="meal-page">
      <div className="individual-meal">
        <MenuMeal meal={meal} />
        <button
          className="add-meal-reservation"
          onClick={() => {
            setShowReservation(true);
          }}
        >
          Book this meal
        </button>
        {showReservation && <ReservationForm meal_id={match.params.id} />}
      </div>
    </div>
  );
}

export default MealsDetail;
