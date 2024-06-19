import React, { createContext, useEffect, useState } from 'react';

export const WordContext = createContext();

export const WordProvider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/words')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Что-то пошло не так..');
        }
      })
      .then((data) => {
        setWords(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const addWord = (newWord) => {
    fetch('/api/words/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWord),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Не удалось добавить слово...');
        }
        return response.json();
      })
      .then((data) => {
        setWords((prevWords) => [...prevWords, data]);
      })
      .catch((error) => setError(error));
  };

  const updateWord = (updatedWord) => {
    fetch(`/api/words/${updatedWord.id}/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedWord),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Не удалось обновить слово...');
        }
        return response.json();
      })
      .then((data) => {
        setWords((prevWords) =>
          prevWords.map((word) => (word.id === data.id ? data : word)),
        );
      })
      .catch((error) => setError(error));
  };

  //   const deleteWord = (wordId) => {
  //     setWords(words.filter((word) => word.id !== wordId));
  //   };

  const deleteWord = (wordId) => {
    fetch(`/api/words/${wordId}/delete`, {
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Не удалось удалить слово...');
        }
        setWords((prevWords) => prevWords.filter((word) => word.id !== wordId));
      })
      .catch((error) => setError(error));
  };

  return (
    <WordContext.Provider
      value={{ words, loading, error, addWord, updateWord, deleteWord }}
    >
      {children}
    </WordContext.Provider>
  );
};
