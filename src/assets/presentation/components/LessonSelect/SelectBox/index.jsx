import './styles.scss';

const SelectBox = ({ value, onChange, options, placeholder }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="lesson-select__dropdown"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export { SelectBox };
