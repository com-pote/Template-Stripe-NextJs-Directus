import { Button } from "@nextui-org/react";
import styles from "./Button.module.css";

const ButtonUI = ({ text, onClick }) => {
  return (
    <Button flat className={styles.container} onClick={onClick}>
      {text}
    </Button>
  );
};

export default ButtonUI;
