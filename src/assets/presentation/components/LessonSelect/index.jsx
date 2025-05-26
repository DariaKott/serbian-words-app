import './styles.scss';

const LessonSelect = ({ value, onChange, options }) => {
  return (
    <div className="lesson-select">
      <select value={value} onChange={onChange} className="lesson-select__dropdown">
        <option value="">Выберите тему урока</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export { LessonSelect };
