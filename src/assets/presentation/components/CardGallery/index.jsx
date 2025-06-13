import React, { useState, useEffect } from 'react';
import { WordCard } from '../WordCard';
import { words } from '../../../../assets/words/words3';
import Counter from '../Counter';
import { Button } from '../Button';
import { LessonSelect } from '../LessonSelect';
import './styles.scss';

function Gallery({ focusButtonRef }) {
  const [count, setCount] = useState(0);
  const [counter, setCounter] = useState(0);
  const [viewedWords, setViewedWords] = useState(new Set());
  const [shuffled, setShuffled] = useState(false);
  const [shuffledIndexes, setShuffledIndexes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedPos, setSelectedPos] = useState('');
  const [isSerbianPrimary, setIsSerbianPrimary] = useState(true);


  // ✅ Фильтрация по теме и части речи
  const filteredWords = words.filter(word => {
    const themeMatch = selectedTheme === '' || word.tags_json.includes(selectedTheme);
    const posMatch = selectedPos === '' || word.tags_json.includes(selectedPos);
    return themeMatch && posMatch;
  });

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') previousCard();
      else if (e.key === 'ArrowRight') nextCard();
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [count, shuffled]);

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  const shuffleWords = () => {
    const newIndexes = shuffleArray([...Array(filteredWords.length).keys()]);
    setShuffledIndexes(newIndexes);
    setShuffled(true);
    setCount(0);
  };

  const nextCard = () => {
    setCount((prev) => (prev < filteredWords.length - 1 ? prev + 1 : 0));
  };

  const previousCard = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : filteredWords.length - 1));
  };

  const incrementCounter = (wordId) => {
    if (!viewedWords.has(wordId)) {
      setViewedWords((prevViewedWords) => new Set(prevViewedWords).add(wordId));
      setCounter(counter + 1);
    }
  };

  const currentWord = filteredWords.length
    ? (shuffled ? filteredWords[shuffledIndexes[count]] : filteredWords[count])
    : null;

  return (
    <div className="gallery_container">
      <LessonSelect
        themeValue={selectedTheme}
        onThemeChange={(e) => {
          setSelectedTheme(e.target.value);
          setCount(0);
          setShuffled(false);
        }}
        posValue={selectedPos}
        onPosChange={(e) => {
          setSelectedPos(e.target.value);
          setCount(0);
          setShuffled(false);
        }}
      />

      <Button variant="yellow" onClick={shuffleWords}>
        Перемешать слова
      </Button>
      {filteredWords.length > 0 && (
  <div className="filtered-count">
    Отобрано слов: {filteredWords.length}
  </div>
)}

<div>
  <div className="lang-tabs">
    <button
      className={`tab ${isSerbianPrimary ? 'active' : ''}`}
      onClick={() => setIsSerbianPrimary(true)}
    >
      Срб
    </button>
    <button
      className={`tab ${!isSerbianPrimary ? 'active' : ''}`}
      onClick={() => setIsSerbianPrimary(false)}
    >
      Рус
    </button>
  </div>
  
  
        <div className="card_container">
          <Button variant="circle" onClick={previousCard}>‹</Button>
          {currentWord ? (
            <WordCard
              key={currentWord.id}
              focusButtonRef={focusButtonRef}
              {...currentWord}
              isSerbianPrimary={isSerbianPrimary}
              incrementCounter={() => incrementCounter(currentWord.id)}
            />
          ) : (
            <div className="empty-message">Нет слов по выбранным параметрам</div>
          )}
  
          <Button variant="circle" onClick={nextCard}>›</Button>
        </div>
</div>

      <Counter counter={counter} />
    </div>
  );
}

export default Gallery;
