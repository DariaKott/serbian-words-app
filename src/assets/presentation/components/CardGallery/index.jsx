import React, { useState, useEffect } from 'react';
import { WordCard } from '../WordCard';
import { words } from '../../../../assets/words/data1';
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

  const themes = [
  { value: 'all', label: 'Все слова' },
  { value: 'verbs', label: 'Глаголы' },
  { value: 'nouns', label: 'Существительные' },
  { value: 'adjectives', label: 'Прилагательные' },
  { value: 'doctor', label: 'У врача' }
];


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
    const newIndexes = shuffleArray([...Array(words.length).keys()]);
    setShuffledIndexes(newIndexes);
    setShuffled(true);
    setCount(0);
  };

  const nextCard = () => {
    setCount((prev) => (prev < words.length - 1 ? prev + 1 : 0));
  };

  const previousCard = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : words.length - 1));
  };

  const incrementCounter = (wordId) => {
    if (!viewedWords.has(wordId)) {
      setViewedWords((prevViewedWords) => new Set(prevViewedWords).add(wordId));
      setCounter(counter + 1);
    }
  };

  const currentWord = shuffled ? words[shuffledIndexes[count]] : words[count];

  return (
    <div className="gallery_container">
      <LessonSelect
  value={selectedTheme}
  onChange={(e) => setSelectedTheme(e.target.value)}
  options={themes}
/>
      <Button variant="yellow" onClick={shuffleWords}>
        Перемешать слова
      </Button>

      <div className="card_container">
        <Button variant="circle" onClick={previousCard}>
          ‹
        </Button>
        
        <WordCard
          key={currentWord.id}
          focusButtonRef={focusButtonRef}
          {...currentWord}
          incrementCounter={() => incrementCounter(currentWord.id)}
        />

        <Button variant="circle" onClick={nextCard}>
          ›
        </Button>
      </div>

      <Counter counter={counter} />
    </div>
  );
}

export default Gallery;
