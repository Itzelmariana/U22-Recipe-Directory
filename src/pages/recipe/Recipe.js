import React, { useEffect, useState } from 'react';
import './Recipe.css';
import { useParams, useNavigate } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';
import { useTheme } from '../../hooks/useTheme';
import editIcon from '../../assets/edit.svg';

export default function Recipe() {
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { mode } = useTheme();

  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore
      .collection('recipes')
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
          setError(false);
        } else {
          setIsPending(false);
          setError('Could not find that recipe');
        }
      });
    return () => unsub();
  }, [id]);

  return (
    <div className={`recipe ${mode}`}>
      <img
        className='editIcon'
        src={editIcon}
        alt='Edit Recipe'
        onClick={() => navigate(`/edit/${id}`)}
        style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
      />
      {isPending && <div className='loading'>Loading...</div>}
      {error && <div className='error'>{error}</div>}
      {recipe && (
        <div>
          <h2 className='page-title'>{recipe.title}</h2>
          <p className='mins'>Takes {recipe.cookingTime} minutes to cook.</p>
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
