import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import './styles.scss';

function WordCard(props) {
  const [showTranslation, setShowTranslation] = useState(false);
  const { focusButtonRef, latin, cyrillic, russian, tags_json, incrementCounter, isSerbianPrimary } = props;

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
      <div className='card_top'>
        {isSerbianPrimary ? (
          <>
            <h3 className="word word_word">{latin}</h3>
            <div className="word word_transcription">{cyrillic}</div>
            <div className={`word word_translation ${showTranslation ? 'visible' : 'hidden'}`}>
              {russian}
            </div>
          </>
        ) : (
          <>
            <h3 className="word word_word">{russian}</h3>
            <div className={`word word_translation ${showTranslation ? 'visible' : 'hidden'}`}>
              {latin} / {cyrillic}
            </div>
          </>
        )}
      </div>

      <div className='card_bottom'>
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
    </div>
  );
}

export { WordCard };
