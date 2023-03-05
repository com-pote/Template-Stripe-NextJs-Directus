import styles from "./Badge.module.scss";

const Badge = ({ text }) => {
  return <div className={styles.container}>{text}</div>;
};

export default Badge;
