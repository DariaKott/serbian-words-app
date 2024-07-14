import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../assets/global.scss';
import './styles.scss';
//import { WordContext } from '../Context/WordContext';
import { addWord } from '../../../../store/slice/wordSlice';

function AddWord() {
  const [addingWord, setAddingWords] = useState(false);

  const [word, setWord] = useState('');
  const [transcription, setTranscription] = useState('');
  const [translation, setTranslation] = useState('');
  const [tags, setTags] = useState('');

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.word);

  //const { addWord } = useContext(WordContext);

  const handleAddWord = () => {
    setAddingWords(true);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!word) newErrors.word = 'Пожалуйста, введите слово';
    if (!translation) newErrors.translation = 'Пожалуйста, введите перевод.';

    if (word && !/^[a-zA-Z]+$/.test(word)) {
      newErrors.word = 'Слово должно содержать только латинские буквы.';
    }
    if (translation && !/^[а-яА-ЯёЁ-]+$/.test(translation)) {
      newErrors.translation =
        'Перевод должен содержать только кириллические буквы и знак "-".';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveWord = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newWord = {
      id: Date.now(), // Уникальный идентификатор для нового слова равный количеству миллисекунд, прошедших с 1 января 1970 по настоящее время.
      english: word,
      transcription: transcription,
      russian: translation,
      tags: tags,
      tags_json: JSON.stringify(tags),
    };

    dispatch(addWord(newWord));

    console.log('Добавлено слово: ', newWord);

    setAddingWords(false);
    setWord('');
    setTranscription('');
    setTranslation('');
    setTags('');
  };

  return (
    <>
      {addingWord ? (
        <>
          <form onSubmit={handleSaveWord}>
            <input
              type="text"
              placeholder="Слово"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
            <input
              type="text"
              placeholder="Транскрипция"
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Перевод"
              value={translation}
              /*required*/
              onChange={(e) => setTranslation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Тема"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <button className="button-style" type="submit">
              Сохранить слово
            </button>
            <button
              className="button-style"
              type="button"
              onClick={() => setAddingWords(false)}
            >
              Не сохранять
            </button>
          </form>

          <div className="error-block">
            {Object.values(errors).map((error, index) => (
              <p key={index} className="error-message">
                {error}
              </p>
            ))}
          </div>
          {error && <p className="error-message">Ошибка: {error}</p>}
        </>
      ) : (
        <button className="button-style" onClick={handleAddWord}>
          Добавить слово
        </button>
      )}
    </>
  );
}

export { AddWord };
