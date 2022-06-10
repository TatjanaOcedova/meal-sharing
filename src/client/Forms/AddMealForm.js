import React, { useState } from "react";

function AddMealFrom() {
  const [mealsId, setMealsId] = useState(null);
  const [addNewMeal, setAddNewMeal] = useState({
    title: "",
    price: "",
    description: "",
    max_reservations: "",
    location: "",
    when_date: new Date().toISOString(),
  });

  const addMeal = async () => {
    setAddNewMeal({ submitting: false });

    const response = await fetch("./api/meals", {
      method: "POST",
      body: JSON.stringify(addNewMeal),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    setMealsId(data[0]);
    setAddNewMeal({ submitting: true });

    if (response.status === 200) {
      alert("You have shared your meal ;)");
    } else {
      alert("Unexpected error occurred ");
      console.error(
        "Unexpected error occurred from api/meals",
        response.status
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addMeal(addNewMeal)
      .then(
        setAddNewMeal({
          title: "",
          price: "",
          description: "",
          max_reservations: "",
          created_date: new Date().toISOString(),
        })
      )
      .catch((e) => {
        alert(`Unexpected error: ${e}`);
        console.error(e);
      });
  };

  return (
    <div className="adding-newmeal-container">
      <h1 className="sharing-page-h1">Add your favourite meal</h1>
      <form onSubmit={handleSubmit}>
        <div className="adding-newmeal-form">
          <lable className="newmeal-lable-container">
            <span>Meal title :</span>
            <br />
            <input
              type="text"
              required
              onChange={(e) =>
                setAddNewMeal({ ...addNewMeal, title: e.target.value })
              }
            ></input>
          </lable>
          <lable className="newmeal-lable-container">
            <span>Description about your meal : </span>
            <br />
            <textarea
              style={{ height: "200px" }}
              required
              onChange={(e) =>
                setAddNewMeal({ ...addNewMeal, description: e.target.value })
              }
            ></textarea>
          </lable>
          <lable className="newmeal-lable-container">
            <span>Pice(per person) : </span>
            <br />
            <input
              type="number"
              min={0}
              required
              onChange={(e) =>
                setAddNewMeal({
                  ...addNewMeal,
                  price: e.target.value,
                })
              }
            />
          </lable>
          <lable className="newmeal-lable-container">
            <span>Max number of guests : </span>
            <br />
            <input
              type="number"
              min={1}
              max={30}
              required
              onChange={(e) =>
                setAddNewMeal({
                  ...addNewMeal,
                  max_reservations: e.target.value,
                })
              }
            />
          </lable>
          <lable className="newmeal-lable-container">
            <span>Place : </span>
            <br />
            <input
              type="text"
              onKeyPress={(event) =>
                (event.charCode >= 65 && event.charCode <= 90) ||
                (event.charCode >= 97 && event.charCode <= 122)
              }
              required
              onChange={(e) =>
                setAddNewMeal({
                  ...addNewMeal,
                  location: e.target.value,
                })
              }
            />
          </lable>
          <lable className="newmeal-lable-container">
            <span>Sharing date : </span>
            <br />
            <input
              type="date"
              required
              onChange={(e) =>
                setAddNewMeal({
                  ...addNewMeal,
                  when_date: e.target.value,
                })
              }
            />
          </lable>

          <button className="addmeal-btn">
            {addNewMeal.submitting ? "Register New Meal" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMealFrom;
