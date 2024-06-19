import React, { useContext } from 'react';
import { WordTableRow } from '../WordTableRow';
import './styles.scss';
import { WordContext } from '../Context/WordContext';

function WordTable() {
  const { words, updateWord, deleteWord } = useContext(WordContext);

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
            updateWord={updateWord}
            deleteWord={deleteWord}
          />
        ))}
      </tbody>
    </table>
  );
}

export { WordTable };
