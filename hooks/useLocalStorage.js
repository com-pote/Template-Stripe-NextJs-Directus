import { useEffect } from "react";
import { UsecartContext } from "../contexts/cartContext";

export const useLocalStorage = (key, fallbackValue) => {
  const { cartProducts, setCartProducts } = UsecartContext();
  useEffect(() => {
    const stored = localStorage.getItem(key);
    setCartProducts(stored ? JSON.parse(stored) : fallbackValue);
  }, [fallbackValue, key, setCartProducts]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(cartProducts));
  }, [key, cartProducts]);

  return [cartProducts, setCartProducts];
};
