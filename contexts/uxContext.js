import { useCallback, useState } from "react";
import { createContext, useContext } from "react";

const uxContext = createContext();

export const UxWrapper = ({ children }) => {
  // MESSAGES FLASH
  const [flash, setFlash] = useState("");
  const [flashType, setFlashType] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState();

  /**
   * deleteMessage - delete the current FlashMessage
   */
  const deleteMessage = useCallback(() => {
    setFlash("");
  }, []);

  /**
   * @function handleFlash - create a flash Message
   * @param {String} type - the type of the flash (error, success, warning, info)
   * @param {string} text - The full text of the flash message
   * @param {number} duration - The duration of the flash message (before it will be unset)
   */
  const handleFlash = useCallback(
    (type, text, duration) => {
      setFlashType(type);
      setFlash(text);
      setTimeout(deleteMessage, duration);
    },
    [deleteMessage]
  );

  return (
    <uxContext.Provider
      value={{
        flash,
        flashType,
        handleFlash,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </uxContext.Provider>
  );
};

export const UseUxContext = () => {
  return useContext(uxContext);
};
