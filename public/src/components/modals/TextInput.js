import successIcon from "../../assets/images/succes.svg";

export default function TextInput({ type, label, value, onBlur, onChange, error, maxLength, isValid, onInput }) {
  return (
    <div className="input-container">
      <input
        className={`form-input ${error && "error"}`}
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        maxLength={maxLength}
        onInput={onInput}
      />
      <label className={value && "filled"} htmlFor="name">
        {label}
      </label>
      {isValid && <img className={value && "dataIn"} src={successIcon} alt="successIcon" />}
    </div>
  );
}
