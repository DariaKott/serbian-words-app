import './styles.scss';
import { SelectBox } from './SelectBox';

const LessonSelect = ({ themeValue, onThemeChange, posValue, onPosChange }) => {
  const themeOptions = [
    { value: 'BASE', label: 'Базовые' },
    { value: 'DOKTOR', label: 'У врача' },
    { value: 'PRODAVNICA', label: 'В магазине' },
    { value: 'RESTORAN', label: 'В ресторане / кафе' },
    { value: 'TRANSPORT', label: 'Транспорт' }
  ];

  const posOptions = [
    { value: 'NOUN', label: 'Существительные' },
    { value: 'VERB', label: 'Глаголы' },
    { value: 'ADJ', label: 'Прилагательные' },
    { value: 'ADV', label: 'Наречия' },
    { value: 'PRON', label: 'Местоимения' },
    { value: 'NUM', label: 'Числительные' },
    { value: 'ADP', label: 'Предлоги' },
    { value: 'CCONJ', label: 'Союзы' },
    { value: 'PART', label: 'Частицы' },
    { value: 'DET', label: 'Определители' }
  ];

  return (
    <div className="lesson-select">
      <SelectBox
        value={themeValue}
        onChange={onThemeChange}
        options={themeOptions}
        placeholder="Выберите тему урока"
      />
      <SelectBox
        value={posValue}
        onChange={onPosChange}
        options={posOptions}
        placeholder="Выбор по частям речи"
      />
    </div>
  );
};

export { LessonSelect };
