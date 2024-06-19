import React, { useContext } from 'react';
import { WordTable } from '../../components/WordTable';
import { AddWord } from '../../components/AddWordButton';
//import { words as initialWords } from '../../../assets/data';
import { WordContext } from '../../components/Context/WordContext';

function HomePage() {
  // const [words, setWords] = useState(initialWords);
  const { loading, error } = useContext(WordContext);

  if (loading) return;
  <h2>Loading...</h2>;
  if (error) return <h2>{error.message}</h2>;

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
