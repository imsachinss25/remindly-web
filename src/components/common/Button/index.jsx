import styles from "./style.module.css";

const Button = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  fullWidth = true,
  loading = false,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${styles.button}
        ${styles[variant]}
        ${fullWidth ? styles.fullWidth : ""}
        ${disabled ? styles.disabled : ""}
      `}
      {...rest}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

export default Button