const express = require("express");
const router = express.Router();
const knex = require("../database");

// Returns all reservations
router.get("/", async (request, response) => {
  try {
    const reservations = await knex("Reservation").select("*");
    response.json(reservations);
  } catch (error) {
    response.status(500).end();
    throw error;
  }
});

// Adds a new reservation
router.post("/", async (request, response) => {
  try {
    const addNewReservation = await knex("Reservation").insert(request.body);
    response.json(addNewReservation);
  } catch (error) {
    throw error;
  }
});

// Returns reservation by id
router.get("/:id", async (request, response) => {
  try {
    const reservationsId = Number(request.params.id);
    if (!isNaN(reservationsId)) {
      const results = await knex("Reservation")
        .select("*")
        .where("id", reservationsId);
      if (results < 1) {
        response
          .status(200)
          .json("There is no reservation with the requested id!");
      } else {
        response.send(results);
      }
    } else {
      response.status(400).json("Please write valid id!");
    }
  } catch (error) {
    throw error;
  }
});

// Updates the reservation by id
router.put("/:id", async (request, response) => {
  try {
    const reservationsId = Number(request.params.id);
    const updateReservation = await knex("Reservation")
      .where("id", reservationsId)
      .update(request.body);
    response.json(updateReservation);
  } catch (error) {
    throw error;
  }
});

// Deletes the reservaton by id
router.delete("/:id", async (request, response) => {
  try {
    const reservationsId = Number(request.params.id);
    const deleteReservation = await knex("Reservation")
      .where("id", reservationsId)
      .delete();
    response.json(deleteReservation);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
