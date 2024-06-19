import React, { useState } from 'react';
import './styles.scss';
import '../../../../assets/global.scss';

function WordTableRow({ word, index, updateWord, deleteWord }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedWord, setEditedWord] = useState(word);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Сохранение изменений и отправка на сервер
    updateWord(editedWord);
    setIsEditing(false);
    console.log('что-то поменялось');
  };

  const handleDeleteClick = () => {
    deleteWord(word.id);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedWord({ ...editedWord, [name]: value });
    // console.log(event.target.value); // Вывести значение в консоль
    console.log('что-то поменялось2');
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
