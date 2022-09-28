import React from 'react';
import { useGlobalContext } from '../context';

export default function Favorites() {
  const { favorites, removeFavorite, selectMeal } = useGlobalContext();
  return (
    <section className="favorites">
      <div className="favorites-content">
        <h5>Favorites</h5>
        <div className="favorites-container">
          {favorites.map((item) => {
            const { idMeal, strMealThumb: image } = item;

            return (
              <div key={idMeal} className="favorites-item">
                <img
                  src={image}
                  alt="The Favorite Meal"
                  className="favorites-img img"
                  onClick={() => selectMeal(idMeal, true)}
                />
                <button
                  className="remove-btn"
                  onClick={() => removeFavorite(idMeal)}
                >
                  remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
