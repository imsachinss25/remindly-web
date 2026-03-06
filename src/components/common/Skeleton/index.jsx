import styles from "./Skeleton.module.css";

function Skeleton({ width = "100%", height = "20px", borderRadius = "8px" }) {
  return (
    <div
      className={styles.skeleton}
      style={{ width, height, borderRadius }}
    />
  );
}

export default Skeleton;