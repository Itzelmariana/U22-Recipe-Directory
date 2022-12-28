import React, { useEffect, useState } from 'react';
import './Home.css';

import RecipeList from '../../components/RecipeList';
import { projectFirestore } from '../../firebase/config';

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const [deletedRecipe, setDeletedRecipe] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore.collection('recipes').onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError('No recipes to load');
          setData(null);
          setIsPending(false);
        } else {
          if (snapshot.docChanges()[0]._delegate.type === 'removed') {
            setDeletedRecipe(true);
            setTimeout(() => {
              setDeletedRecipe(false);
            }, 3000);
          } else {
            setDeletedRecipe(false);
          }
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setError(false);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  return (
    <div>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading..</p>}
      {data && <RecipeList recipes={data} isDeleted={deletedRecipe} />}
    </div>
  );
}
