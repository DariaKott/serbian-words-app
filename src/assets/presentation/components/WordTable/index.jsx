import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { WordTableRow } from '../WordTableRow';
import './styles.scss';
import { updateWord, deleteWord } from '../../../../store/slice/wordSlice';

function WordTable() {

  const dispatch = useDispatch();
  const words = useSelector((state) => state.word.words);
  const loading = useSelector((state) => state.word.loading);
  const error = useSelector((state) => state.word.error);



  const handleUpdateWord = (updatedWord) => {
    dispatch(updateWord(updatedWord));
  };

  const handleDeleteWord = (wordId) => {
    dispatch(deleteWord(wordId));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <table className="word-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Слово</th>
          <th>Транскрипция</th>
          <th>Перевод</th>
          <th>Тема</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {words.map((word, index) => (
          <WordTableRow
            key={word.id}
            index={index + 1}
            word={word}
            updateWord={handleUpdateWord}
            deleteWord={handleDeleteWord}
          />
        ))}
      </tbody>
    </table>
  );
}

export { WordTable };
