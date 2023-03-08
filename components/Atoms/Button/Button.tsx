import { ReactNode, useEffect, useState } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: string | null | undefined;
  icon?: ReactNode;
  disabled?: boolean;
}

const Button = ({ text, onClick, color, icon, className, disabled }: ButtonProps) => {
  const [background, setBackground] = useState("");

  useEffect(() => {
    switch (color) {
      case "primary":
        setBackground(styles.primary);
        break;
      case "body":
        setBackground(styles.body);
        break;
      case "opacity":
        setBackground(styles.opacity);
        break;
      case "warning":
        setBackground(styles.warning);
        break;
      case "error":
        setBackground(styles.error);
        break;
      case "success":
        setBackground(styles.success);
        break;

      default:
        break;
    }
  }, [color]);
  if (disabled) {
    return (
      <button
        className={`${styles.container} ${className && className} ${background && background}`}
        onClick={onClick}
        type="submit"
        style={{ backgroundColor: "var(--opacity)" }}
      >
        <>
          {icon && <div className={styles.icon}>{icon}</div>}
          {text}
        </>
      </button>
    );
  } else {
    return (
      <button
        className={`${styles.container} ${className && className} ${background && background}`}
        onClick={onClick}
        type="submit"
      >
        <>
          {icon && <div className={styles.icon}>{icon}</div>}
          {text}
        </>
      </button>
    );
  }
};

export default Button;
