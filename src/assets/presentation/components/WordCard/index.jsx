import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import './styles.scss';

function WordCard(props) {
  const [showTranslation, setShowTranslation] = useState(false);
  const { focusButtonRef, latin, cyrillic, russian, tags_json, incrementCounter } = props;

  useEffect(() => {
    if (focusButtonRef && focusButtonRef.current) {
      focusButtonRef.current.focus();
    }
  }, [focusButtonRef]);

  const handleToggleTranslation = () => {
    if (!showTranslation) {
      incrementCounter(); 
    }
    setShowTranslation(!showTranslation);
  };

  return (
    <div className="card">
      <h3 className="word word_word">{latin}</h3>
      <div className="word word_transcription">{cyrillic}</div>

      <div className={`word word_translation ${showTranslation ? 'visible' : 'hidden'}`}>
        {russian}
      </div>

      <Button
        ref={focusButtonRef}
        variant="primary"
        onClick={handleToggleTranslation}
        className="button--fixed-width"
      >
        {showTranslation ? 'Скрыть перевод' : 'Показать перевод'}
      </Button>

      <div className="word word_tags">{tags_json.join(', ')}</div>
    </div>
  );
}

export { WordCard };
