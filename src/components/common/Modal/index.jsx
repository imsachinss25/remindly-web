import styles from "./Modal.module.css";

function Modal({ title, children, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // prevent close on inner click
      >
        <div className={styles.header}>
          {title && <h2 className={styles.headerTitle}>{title}</h2>}
          <span className={styles.closeBtn} onClick={onClose}>
            ×
          </span>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;