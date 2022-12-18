import { Button } from "@nextui-org/react";
import styles from "./Button.module.css";

const ButtonUI = ({ text, onClick, color, icon }) => {
  return (
    <Button
      flat
      className={styles.container}
      onClick={onClick}
      size="sm"
      auto
      color={color ? color : "primary"}
      icon={icon && icon}
    >
      {text}
    </Button>
  );
};

export default ButtonUI;
