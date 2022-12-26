import React, { useEffect } from 'react';
import './Recipe.css';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

export default function Recipe() {
  const { id } = useParams();
  const url = 'http://localhost:3000/recipes/' + id;
  const { data: recipe, isPending, error } = useFetch(url);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setTimeout(() => navigate('/', 2000));
    }
  }, [error, navigate]);
  return (
    <div className='recipe'>
      {isPending && <div className='loading'>Loading...</div>}
      {error && <div className='error'>{error}</div>}
      {recipe && (
        <div>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>

          <p>{recipe.method}</p>
        </div>
      )}
    </div>
  );
}
