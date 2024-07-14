import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { WordTable } from '../../components/WordTable';
import { AddWord } from '../../components/AddWordButton';
//import { words as initialWords } from '../../../assets/data';
//import { WordContext } from '../../components/Context/WordContext';
import { fetchWords } from '../../../../store/slice/wordSlice';

function HomePage() {
  const dispatch = useDispatch();
  // const [words, setWords] = useState(initialWords);
  const { loading, error } = useSelector((state) => state.words);

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  // const addWord = (newWord) => {
  //   setWords([...words, newWord]);
  // };

  // if (!words) return <h2>Loading...</h2>;

  return (
    <>
      <WordTable />
      <AddWord />
    </>
  );
}

export { HomePage };
