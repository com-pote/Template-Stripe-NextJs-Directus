import { UsecartContext } from "../contexts/cartContext";

// retourne le nombre d'article dans le panier
export const useGetTotalQuantity = () => {
  const { cartProducts } = UsecartContext();
  let totalQuantity = 0;
  cartProducts.map((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return totalQuantity;
};
