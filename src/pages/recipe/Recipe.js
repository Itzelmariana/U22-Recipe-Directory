import React, { useEffect, useState } from 'react';
import './Recipe.css';
import { useParams } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';
import { useTheme } from '../../hooks/useTheme';

export default function Recipe() {
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();

  const { mode } = useTheme();

  useEffect(() => {
    setIsPending(true);
    projectFirestore
      .collection('recipes')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError('Could not find that recipe');
        }
      });
  }, [id]);

  return (
    <div className={`recipe ${mode}`}>
      {isPending && <div className='loading'>Loading...</div>}
      {error && <div className='error'>{error}</div>}
      {recipe && (
        <div>
          <h2 className='page-title'>{recipe.title}</h2>
          <p className='mins'>Takes {recipe.cookingTime} to cook.</p>
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
