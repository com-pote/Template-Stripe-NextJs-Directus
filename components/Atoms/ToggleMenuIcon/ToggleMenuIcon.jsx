import styles from "./ToggleMenuIcon.module.css";
import { useCallback } from "react";
import { UseUxContext } from "../../../contexts/uxContext";

const ToggleMenuIcon = () => {
  const { menuVisible, toggleMenuVisibility } = UseUxContext();

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        toggleMenuVisibility(!menuVisible);
      }
    },
    [toggleMenuVisibility, menuVisible]
  );

  const handleClick = useCallback(() => {
    toggleMenuVisibility(!menuVisible);
  }, [menuVisible, toggleMenuVisibility]);

  return (
    <a
      className={`${menuVisible ? styles.cross : styles.burger} mobile`}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      tabIndex="0"
    >
      <div className={styles.line1}></div>
      <div className={styles.line2}></div>
      <div className={styles.line3}></div>
    </a>
  );
};

export default ToggleMenuIcon;
