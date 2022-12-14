import React, { useState } from 'react';
import { useGlobalContext } from '../context';

export default function Search() {
  const { setUserValue, handleRandomMeal } = useGlobalContext();

  const [text, setText] = useState('');
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserValue(text);
  };
  return (
    <header className="search-container">
      <form action="?" method="POST">
        <div
          class="g-recaptcha"
          data-sitekey="6LdnSnwjAAAAAD_38JGIa5PoZyNFvQD5Kpzr2FPW"
        ></div>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <form action="#" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="type favorite meal"
          className="form-input"
          value={text}
          onChange={handleChange}
        />
        <button className="btn" type="submit">
          Search
        </button>
        <button
          className="btn btn-hipster"
          type="button"
          onClick={handleRandomMeal}
        >
          Surprise Me!
        </button>
      </form>
    </header>
  );
}
