import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import './styles.scss';

function WordCard(props) {
  const [showTranslation, setShowTranslation] = useState(false);
  const { focusButtonRef } = props;

  useEffect(() => {
    if (focusButtonRef && focusButtonRef.current) {
      focusButtonRef.current.focus();
    }
  }, [focusButtonRef]);

  const handleToggleTranslation = () => {
    if (showTranslation) {
      setShowTranslation(false);
    } else {
      setShowTranslation(true);
      props.incrementCounter(); // увеличиваем счётчик при первом показе
    }
  };

  return (
    <div className="card">
      <h3 className="word word_word">{props.serbian}</h3>
      <div className="word word_transcription">{props.transcription}</div>

      {/* Всегда отображаем перевод (управляем видимостью классом) */}
      <div className={`word word_translation ${showTranslation ? 'visible' : 'hidden'}`}>
        {props.russian}
      </div>

      {/* Одна кнопка с переключающимся текстом */}
      <Button
        ref={focusButtonRef}
        variant="primary"
        onClick={handleToggleTranslation}
        className="button--fixed-width"
      >
        {showTranslation ? 'Скрыть перевод' : 'Показать перевод'}
      </Button>

      <div className="word word_tags">{props.tags}</div>
    </div>
  );
}

export { WordCard };
