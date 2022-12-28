import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import './Search.css';
import { projectFirestore } from '../../firebase/config';

import RecipeList from '../../components/RecipeList';

export default function Search() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q');

  useEffect(() => {
    setIsPending(true);
    setData(null);
    const collectionRef = projectFirestore.collection('recipes');
    collectionRef.get().then((docs) => {
      let docArray = [];
      docs.forEach((doc) => {
        if (doc.data().title.toLowerCase().includes(query.toLowerCase())) {
          docArray.push({ id: doc.id, ...doc.data() });
        }
      });
      setIsPending(false);
      setData(docArray);
    });
  }, [query]);
  return (
    <div>
      <h2 className='page-title'>Recipes including "{query}"</h2>

      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
