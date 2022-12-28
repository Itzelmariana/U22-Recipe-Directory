import React, { useEffect, useState } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { projectFirestore } from '../firebase/config';

import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import './RecipeList.css';

export default function RecipeList({ recipes, isDeleted }) {
  const [addedRecipe, setAddedRecipe] = useState(null);
  const [updatedRecipe, setUpdatedRecipe] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { mode } = useTheme();

  useEffect(() => {
    if (location.state) {
      if (location.state.addedRecipe) {
        setAddedRecipe(location.state.addedRecipe);
      } else if (location.state.updatedRecipe) {
        setUpdatedRecipe(location.state.updatedRecipe);
      }
      setTimeout(() => {
        location.state = null;
        setAddedRecipe(null);
        setUpdatedRecipe(null);
      }, [3000]);
    }
  }, [location]);

  if (recipes.length === 0) {
    return <div className='error'>No recipes to load...</div>;
  }
  async function handleDelete(id) {
    setAddedRecipe(null);
    const collectionRef = projectFirestore.collection('recipes');
    const docToDelete = collectionRef.doc(id);
    await docToDelete.delete();
  }
  return (
    <>
      <div
        className='delete-alert-container'
        style={{
          display: isDeleted ? 'flex' : 'none',
        }}
      >
        <div className={isDeleted ? 'delete-alert show' : 'delete-alert'}>
          {`Recipe Deleted!`}
        </div>
      </div>
      <div
        className='add-alert-container'
        style={{
          display: addedRecipe ? 'flex' : 'none',
        }}
      >
        <div className={addedRecipe ? 'add-alert show' : 'add-alert'}>
          {`Recipe ${addedRecipe ? 'for ' + addedRecipe.title : ''} Added!`}
        </div>
      </div>

      <div
        className='update-alert-container'
        style={{
          display: updatedRecipe ? 'flex' : 'none',
        }}
      >
        <div className={updatedRecipe ? 'update-alert show' : 'update-alert'}>
          {`Recipe Updated!`}
        </div>
      </div>

      <div className='recipe-list'>
        {recipes.map((recipe) => (
          <div key={recipe.id} className={`card ${mode}`}>
            <h3>{recipe.title}</h3>
            <p>{recipe.cookingTime} minutes to make.</p>
            <div>{recipe.method.substring(0, 100)}...</div>
            <Link to={`/recipes/${recipe.id}`}>Cook This..</Link>
            <img
              src={editIcon}
              className='edit'
              alt='delete icon'
              onClick={() => navigate(`/edit/${recipe.id}`)}
            />
            <img
              src={deleteIcon}
              className='delete'
              alt='delete icon'
              onClick={() => handleDelete(recipe.id)}
            />
          </div>
        ))}
      </div>
    </>
  );
}
