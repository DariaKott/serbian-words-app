import React, { useState, useEffect } from 'react';
import { WordCard } from '../WordCard';
import { words } from '../../../../assets/data';
import Counter from '../Counter';
import './styles.scss';

function Gallery({ focusButtonRef }) {
  const [count, setCount] = useState(0);
  const [counter, setCounter] = useState(0);
  const [viewedWords, setViewedWords] = useState(new Set());

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        previousCard();
      } else if (e.key === 'ArrowRight') {
        nextCard();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [count]);

  const nextCard = () => {
    if (count < words.length - 1) {
      setCount(count + 1);
    } else {
      // Если достигнут конец массива, переходим к первой карточке
      setCount(0);
    }
  };

  const previousCard = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      // Если достигнуто начало массива, переходим к последней карточке
      setCount(words.length - 1);
    }
  };

  const incrementCounter = (wordId) => {
    //Проверяем было ли слово уже просмотрено
    if (!viewedWords.has(wordId)) {
      setViewedWords((prevViewedWords) => new Set(prevViewedWords).add(wordId));
      setCounter(counter + 1);
    }
  };

  return (
    <React.Fragment>
      <div className="gallery_container">
        <div className="card_container">
          <button className="gallery_button" onClick={previousCard}>
            {'<'}
          </button>
          <WordCard
            key={words[count].id}
            focusButtonRef={focusButtonRef}
            {...words[count]}
            incrementCounter={() => incrementCounter(words[count].id)}
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
