import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { WordTable } from '../../components/WordTable';
import { AddWord } from '../../components/AddWordButton';
import { fetchWords } from '../../../../store/slice/wordSlice';

function HomePage() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.word);

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (<>
      <AddWord/>
      <WordTable />
      </>);
}

export { HomePage };
