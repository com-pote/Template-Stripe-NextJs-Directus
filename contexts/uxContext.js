import { useCallback, useEffect, useState, createContext, useContext } from "react";
import { me } from "../services/directus/utils";
import dayjs from "dayjs";
import * as jose from "jose";
import directus from "../services/directus/directus";

const uxContext = createContext();

export const UxWrapper = ({ children }) => {
  // MESSAGES FLASH
  const [flash, setFlash] = useState("");
  const [flashType, setFlashType] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState(null);
  const [sortProductsBy, setSortProductsBy] = useState(null);
  const [redirect, setRedirect] = useState();
  const [jwt, setJwt] = useState(null);
  const [decoded, setDecoded] = useState(null);
  const [exp, setExp] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      setJwt(localStorage.getItem("auth_token").toString());
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (jwt !== null) {
      setDecoded(jose.decodeJwt(jwt));
    }
  }, [jwt]);

  useEffect(() => {
    if (decoded !== null) {
      setExp(decoded.exp);
    }
  }, [decoded]);

  useEffect(() => {
    if (exp !== null) {
      if (dayjs(exp * 1000).isAfter(dayjs())) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, [exp, isAuthenticated]);

  useEffect(() => {
    const refreshToken = localStorage.getItem("auth_refresh_token") && localStorage.getItem("auth_refresh_token");
    if (isAuthenticated && refreshToken) {
      me()
        .then((response) => setUser(response))
        .catch((err) => console.log(err));
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated, setUser]);

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
        user,
        setUser,
        redirect,
        setRedirect,
        sortProductsBy,
        setSortProductsBy,
      }}
    >
      {children}
    </uxContext.Provider>
  );
};

export const UseUxContext = () => {
  return useContext(uxContext);
};
