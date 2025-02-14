import React, { useState, useEffect } from 'react';
import './styles.scss';

function WordCard(props) {
  const [showTranslation, setShowTranslation] = useState(false);
  const { focusButtonRef } = props;

  useEffect(() => {
    if (focusButtonRef && focusButtonRef.current) {
      focusButtonRef.current.focus();
    }
  }, [focusButtonRef]);

  const handleShowTranslation = () => {
    setShowTranslation(true);
    props.incrementCounter(); //Увеличиваем счетчик при первом просмотре
  };

  const handleHideTranslation = () => {
    setShowTranslation(false);
  };

  return (
    <div className="card">
      <h3 className="word word_word">{props.serbian}</h3>
      <div className="word word_transcription">{props.transcription}</div>
      {showTranslation ? (
        <div>
          <div className="word word_translation">{props.russian}</div>
          <button className="button-style" onClick={handleHideTranslation}>
            Скрыть перевод
          </button>
        </div>
      ) : (
        <div>
          <div> </div>
          <br />
          <button
            ref={focusButtonRef}
            className="button-style"
            onClick={handleShowTranslation}
          >
            Показать перевод
          </button>
        </div>
      )}
      <div className="word word_tags">{props.tags}</div>
    </div>
  );
}

export { WordCard };
