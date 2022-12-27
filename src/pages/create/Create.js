import React, { useState, useRef } from 'react';
import './Create.css';
import { useNavigate } from 'react-router-dom';
import useFetchPost from '../../hooks/useFetchPost';

export default function Create() {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const navigate = useNavigate();

  const { postData, data, error } = useFetchPost(
    'http://localhost:3000/recipes',
    'POST'
  );

  function redirect() {
    if (data) {
      setTimeout(() => navigate('/', 2000));
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + 'minutes',
    });
    redirect();
    console.log(title, method, cookingTime, ingredients);
  }
  function handleAdd(e) {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
    setNewIngredient('');
    ingredientInput.current.focus();
  }

  return (
    <div className='create'>
      <h2 className='page-title'>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>Recipe ingredients:</span>
          <div className='ingredients'>
            <input
              type='text'
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className='btn'>
              add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:{' '}
          {ingredients.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>
        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking time (minutes):</span>
          <input
            type='number'
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className='btn'>Submit</button>
      </form>
    </div>
  );
}
