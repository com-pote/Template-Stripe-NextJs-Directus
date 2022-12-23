import { Button } from "@nextui-org/react";
import styles from "./Button.module.css";

const ButtonUI = ({ text, onClick, color, icon, type }) => {
  return (
    <Button
      flat
      className={styles.container}
      onClick={onClick}
      size="sm"
      auto
      color={color ? color : "primary"}
      icon={icon && icon}
      type={type ? type : "text"}
    >
      {text}
    </Button>
  );
};

export default ButtonUI;
