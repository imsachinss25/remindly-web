import styles from "./style.module.css";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  rightIcon,
  ...rest
}) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}

      <div className={styles.inputContainer}>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${styles.input} ${error ? styles.errorInput : ""}`}
          {...rest}
        />

        {rightIcon && (
          <div className={styles.icon}>
            {rightIcon}
          </div>
        )}
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}

export default Input