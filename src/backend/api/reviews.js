const express = require("express");
const router = express.Router();
const knex = require("../database");

// Returns all reviews
router.get("/", async (request, response) => {
  try {
    const reviews = await knex("Review").select("*");
    response.json(reviews);
  } catch (error) {
    response.status(500).end();
    throw error;
  }
});

// Adds a new review
router.post("/", async (request, response) => {
  try {
    const addNewReview = await knex("Review").insert(request.body);
    response.json(addNewReview);
  } catch (error) {
    throw error;
  }
});

// Returns review by id
router.get("/:id", async (request, response) => {
  try {
    const reviewsId = Number(request.params.id);
    if (!isNaN(reviewsId)) {
      const results = await knex("Review").select("*").where("id", reviewsId);
      if (results < 1) {
        response.status(200).json("There is no review with the requested id!");
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

// Updates the review by id
router.put("/:id", async (request, response) => {
  try {
    const review = Number(request.params.id);
    const updateReview = await knex("Review")
      .where("id", reviewsId)
      .update(request.body);
    response.json(updateReview);
  } catch (error) {
    throw error;
  }
});

// Deletes the review by id
router.delete("/:id", async (request, response) => {
  try {
    const reviewsId = Number(request.params.id);
    const deleteReview = await knex("Review").where("id", reviewsId).delete();
    response.json(deleteReview);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
