import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "../pages/Home";
import Meals from "../pages/Meals";
import MealsDetail from "./components/MealsDetail";
import AddMealFrom from "./Forms/AddMealForm";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/meals" component={Meals}></Route>
        <Route exact path="/meals/:id" component={MealsDetail}></Route>
        <Route exact path="/add" component={AddMealFrom}></Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
