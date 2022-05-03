const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");

// Returns all meals
router.get("/", async (request, response) => {
  try {
    //   // knex syntax for selecting things. Look up the documentation for knex for further info
    //   const titles = await knex("Meal").select("*");
    //   response.json(titles);

    const { maxPrice, availableReservations, title, createdAfter, limit } =
      request.query;

    let meals = knex("Meal");
    //Get meals that has a price smaller than maxPrice
    if (maxPrice) {
      meals.where("price", "<", maxPrice);
    }

    // Get meals that still has available reservations
    if (availableReservations) {
      meals
        .join("Reservation", "Reservation.meal_id", "=", "Meal.id")
        .where("max_reservation", ">", "number_of_guests");
    }
    // Get meals that partially match a title
    if (title) {
      meals.where("title", "like", `%${title}%`);
    }

    // Get meals that has been created after the date
    if (createdAfter) {
      meals.where("created_date", ">", createdAfter);
    }

    // 	Only specific number of meals
    if (limit) {
      meals.limit(limit);
      if (!Number(limit)) {
        response.status(400).send("Please write correct input!");
        return;
      }
    }

    const results = await meals;
    if (results.length === 0) {
      response.status(400).json("Please write correct input!");
    } else {
      response.status(200).json(results);
    }
  } catch (error) {
    response.status(500).json({ error: "Failed" });
    throw error;
  }
});

// Adds a new meal
router.post("/", async (request, response) => {
  try {
    const addNewMeal = await knex("Meal").insert(request.body);
    response.json(addNewMeal);
  } catch (error) {
    throw error;
  }
});

// Returns meal by id
router.get("/:id", async (request, response) => {
  try {
    const mealsId = Number(request.params.id);
    if (!isNaN(mealsId)) {
      const results = await knex("Meal").select("*").where("id", mealsId);
      if (results < 1) {
        response.status(200).json("There is no meal with the requested id!");
        // response.send(results);
      } else {
        response.send(results);
        // response.status(200).json("There is no meal with the requested id!");
      }
    } else {
      response.status(400).json("Please write valid id!");
    }
  } catch (error) {
    throw error;
  }
});

// Updates the meal by id
router.put("/:id", async (request, response) => {
  try {
    const mealsId = Number(request.params.id);
    const updateMeal = await knex("Meal")
      .where("id", mealsId)
      .update(request.body);
    response.json(updateMeal);
  } catch (error) {
    throw error;
  }
});

// Deletes the meal by id
router.delete("/:id", async (request, response) => {
  try {
    const mealsId = Number(request.params.id);
    const deleteMeal = await knex("Meal").where("id", mealsId).delete();
    response.json(deleteMeal);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
