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
      case "opacity":
        setBackground(styles.opacity);
        break;
      case "warning":
        setBackground(styles.warning);
        break;

      default:
        break;
    }
  }, [color]);
  return (
    <button
      className={`${styles.container} ${className && className} ${background && background}`}
      onClick={onClick}
      type="submit"
      style={{ backgroundColor: disabled ? "var(--opacity)" : "" }}
    >
      <>
        {icon && <div className={styles.icon}>{icon}</div>}
        {text}
      </>
    </button>
  );
};

export default Button;
