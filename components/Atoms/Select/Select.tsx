import styles from "./Select.module.css";

const Select = ({ id, options, onChange }) => {
  return (
    <select name={id} id={id} onChange={onChange}>
      <option value="">--Veuillez choisir--</option>
      {options &&
        options.map((o, index) => (
          <option key={index} value={o.name}>
            {o.value}
          </option>
        ))}
    </select>
  );
};

export default Select;
