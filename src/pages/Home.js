import React from "react";

import { Link } from "react-router-dom";
import HomeInfo from "../client/components/HomeInfo";

function Home() {
  return (
    <div className="main-page">
      <h1 className="homeH1">MealSharing</h1>
      <HomeInfo />
    </div>
  );
}

export default Home;
