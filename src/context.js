import React, { useState, useContext, useEffect } from 'react';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  let allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  let randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [userValue, setUserValue] = useState('');
  const [favorites, updateFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const addToFavorites = (idMeal) => {
    let exist = favorites.find((item) => {
      return item.idMeal === idMeal;
    });
    if (exist) return;
    const meal = meals.find((meal) => {
      return meal.idMeal === idMeal;
    });
    const updatedFavorites = [...favorites, meal];

    updateFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  function selectMeal(idMeal, favor) {
    let meal;
    if (favor) {
      meal = favorites.find((meal) => {
        return meal.idMeal === idMeal;
      });
    }
    meal = meals.find((meal) => {
      return meal.idMeal === idMeal;
    });

    setSelectedMeal(meal);
    setShowModal(true);
  }

  function removeFavorite(idMeal) {
    const updatedFavorites = favorites.filter((item) => {
      return item.idMeal !== idMeal;
    });
    updateFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }

  const fetchMeals = async (url) => {
    setLoading(true);
    let resp = await fetch(url);
    let data = await resp.json();
    setMeals(data.meals);
    setLoading(false);
  };
  const handleRandomMeal = () => {
    fetchMeals(randomMealUrl);
    setUserValue(null);
  };

  const closeModal = () => {
    setSelectedMeal(null);
    setShowModal(false);
  };

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  useEffect(() => {
    if (userValue === null) return;
    fetchMeals(allMealsUrl + userValue);
  }, [userValue]);

  return (
    <AppContext.Provider
      value={{
        loading,
        meals,
        selectMeal,
        selectedMeal,
        showModal,
        closeModal,
        addToFavorites,
        removeFavorite,
        setUserValue,
        handleRandomMeal,
        favorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
