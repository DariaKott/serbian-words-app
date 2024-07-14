import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateWord, deleteWord } from '../../../../store/slice/wordSlice';
import './styles.scss';
import '../../../../assets/global.scss';

function WordTableRow({ word, index }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedWord, setEditedWord] = useState(word);
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Сохранение изменений и отправка на сервер через Redux
    dispatch(updateWord(editedWord));
    setIsEditing(false);
    console.log('Изменения сохранены');
  };

  const handleDeleteClick = () => {
    dispatch(deleteWord(word.id));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedWord({ ...editedWord, [name]: value });
    // console.log(event.target.value); // Вывести значение в консоль
    console.log('Поле изменено');
  };

  return (
    <tr>
      <td className="cell_index">{index}</td>
      <td className="cell_word">
        {isEditing ? (
          <input
            type="text"
            name="english"
            value={editedWord.english}
            onChange={handleInputChange}
          />
        ) : (
          word.english
        )}
      </td>
      <td className="cell_transcription">
        {isEditing ? (
          <input
            type="text"
            name="transcription"
            value={editedWord.transcription}
            onChange={handleInputChange}
          />
        ) : (
          word.transcription
        )}
      </td>
      <td className="cell_translation">
        {isEditing ? (
          <input
            type="text"
            name="russian"
            value={editedWord.russian}
            onChange={handleInputChange}
          />
        ) : (
          word.russian
        )}
      </td>
      <td className="cell_tags">
        {isEditing ? (
          <input
            type="text"
            name="tags"
            value={editedWord.tags}
            onChange={handleInputChange}
          />
        ) : (
          word.tags
        )}
      </td>
      <td>
        {isEditing ? (
          <button className="button-style" onClick={handleSaveClick}>
            Сохранить
          </button>
        ) : (
          <>
            <button className="button-style" onClick={handleEditClick}>
              Редактировать
            </button>
            <button className="button-style" onClick={handleDeleteClick}>
              Удалить слово
            </button>
          </>
        )}
      </td>
    </tr>
  );
}

export { WordTableRow };
