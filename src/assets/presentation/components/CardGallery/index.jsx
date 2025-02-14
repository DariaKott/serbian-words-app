import React, { useState, useEffect } from 'react';
import { WordCard } from '../WordCard';
import { words } from '../../../../assets/data1';
import Counter from '../Counter';
import './styles.scss';

function Gallery({ focusButtonRef }) {
  const [count, setCount] = useState(0);
  const [counter, setCounter] = useState(0);
  const [viewedWords, setViewedWords] = useState(new Set());
  const [shuffled, setShuffled] = useState(false);
  const [shuffledIndexes, setShuffledIndexes] = useState([]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        previousCard();
      } else if (e.key === 'ArrowRight') {
        nextCard();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [count, shuffled]);

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  const shuffleWords = () => {
    const newIndexes = shuffleArray([...Array(words.length).keys()]);
    setShuffledIndexes(newIndexes);
    setShuffled(true);
    setCount(0);
    console.log(newIndexes);
  }

  //функции для переключения между карточками при нажатии стрелок, с зацикливанием по кругу
  const nextCard = () => {
    setCount((prev) => (prev < words.length - 1 ? prev + 1 : 0));
  };

  const previousCard = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : words.length - 1));
  };

  const incrementCounter = (wordId) => {
    //Проверяем было ли слово уже просмотрено, если нет то
    if (!viewedWords.has(wordId)) {
      setViewedWords((prevViewedWords) => new Set(prevViewedWords).add(wordId));
      setCounter(counter + 1);
    }
  };

  const currentWord = shuffled ? words[shuffledIndexes[count]] : words[count];

  return (
    <React.Fragment>
      <div className="gallery_container">
        <button className='button-style' onClick={shuffleWords}>Перемешать слова</button>
        <div className="card_container">
          <button className="gallery_button" onClick={previousCard}>
            {'<'}
          </button>
          {/* <WordCard
            key={words[count].id}
            focusButtonRef={focusButtonRef}
            {...words[count]}
            incrementCounter={() => incrementCounter(words[count].id)}
          /> */}
          <WordCard 
          key={currentWord.id}
          focusButtonRef={focusButtonRef}
          {...currentWord}
          incrementCounter={() => incrementCounter(currentWord.id)}
          />
          <button className="gallery_button" onClick={nextCard}>
            {'>'}
          </button>
        </div>
        <Counter counter={counter} />
      </div>
    </React.Fragment>
  );
}

export default Gallery;
