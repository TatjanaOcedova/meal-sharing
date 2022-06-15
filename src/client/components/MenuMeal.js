import React from "react";
import { useState, useEffect } from "react";
const { DateTime } = require("luxon");

function MenuMeal(props, { match }) {
  const [reservations, setReservations] = useState({});

  const {
    title,
    description,
    price,
    location,
    when,
    imgUrl,
    isAvailable,
    number_of_guests,
    id,
  } = props.meal;

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    const fetchReservations = await fetch(`/api/reservations/`);
    const reservations = await fetchReservations.json();
    setReservations(reservations[0]);

    // console.log("reservationssss", reservations);
    // console.log(props.view);

    const reservation = reservations.filter(
      reservations.meal_id === match.params.id
    );
    // console.log("reservation", reservation);
  };

  return (
    <div
      style={{
        textAlign: "center",
        textDecoration: "unset",
      }}
    >
      <h4 className="meal-title">{title}</h4>
      <h6 className="meal-description">{description}</h6>
      <h6 className="meal-price">{price} dkk</h6>
      {/* <img src={imgUrl} /> */}
      <h6 className="meal-date">
        {DateTime.fromISO(when).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
      </h6>
      <p> {location} </p>
      <p> {isAvailable} </p>
    </div>
  );
}

export default MenuMeal;
