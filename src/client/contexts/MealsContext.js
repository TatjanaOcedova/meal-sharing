import React, { useState, useEffect } from "react";

const MealsContext = React.createContext();
export const useMeals = () => React.useContext(MealsContext);

const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [userSearchInput, setUserSearchInput] = useState("");
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchMeals = async () => {
    try {
      await fetch("/api/meals")
        .then((response) => {
          if (!response.ok) {
            throw new Error("cannot fetch the data from API");
          } else {
            return response.json();
          }
        })
        .then((data) => {
          setMeals(data);
          setIsLoaded(false);
        });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      setIsLoaded(false);
    } else {
      setIsLoaded(true);
      fetchMeals();
    }
  }, [error]);

  return (
    <MealsContext.Provider
      value={{
        meals,
        setMeals,
        userSearchInput,
        setUserSearchInput,
        error,
        isLoaded,
      }}
    >
      {children}
    </MealsContext.Provider>
  );
};

export default MealsProvider;
