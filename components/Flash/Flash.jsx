import { MdError, MdDone } from "react-icons/md";
import styles from "./Flash.module.css";

const Flash = ({ type, text }) => {
  return (
    <div className={`${styles.container} ${type} abs-center`}>
      {type === "error" && <MdError className={styles.error} />}
      {type === "success" && <MdDone className={styles.success} />}
      <p className="body font">{text}</p>
    </div>
  );
};

export default Flash;
