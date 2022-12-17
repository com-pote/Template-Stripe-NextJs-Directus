import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { getAll } from "../services/directus/utils";

const cartContext = createContext();

export const CartWrapper = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [stripeCart, setStripeCart] = useState([]);

  useEffect(() => {
    getAll("product")
      .then((data) => setAllProducts(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let items = [];
    cartProducts.forEach((item) => {
      items.push({
        price: item.price_url,
        quantity: item.quantity,
      });
    });

    setStripeCart(items);
  }, [cartProducts]);

  // Retourne la quantité d'un produit du panier en fonction de son ID
  const getProductQuantity = (price_url) => {
    const quantity = cartProducts.find((p) => p.price_url === price_url)?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  };

  //Ajoute un produit au panier si il n'est pas dedans ou rajoute un à la quantité si il est déjà dedans
  const addOneToCart = (item) => {
    const quantity = getProductQuantity(item.price_url);

    if (quantity === 0) {
      // pas dans le panier
      setCartProducts([...cartProducts, { ...item, quantity: 1 }]);
    } else {
      // déjà dans le panier
      setCartProducts(cartProducts.map((p) => (p.price_url === item.price_url ? { ...p, quantity: p.quantity + 1 } : p)));
    }
  };

  // retire une itération du produit du panier ou le retire totalement si il n'y en a qu'un
  const removeOneFromCart = (item) => {
    const quantity = getProductQuantity(item.price_url);

    if (quantity == 1) {
      deleteFromCart(item);
    } else {
      setCartProducts(cartProducts.map((p) => (p.price_url === item.price_url ? { ...p, quantity: p.quantity - 1 } : p)));
    }
  };

  // retire totalement un produit du panier
  const deleteFromCart = (item) => {
    setCartProducts((cartProducts) =>
      cartProducts.filter((current) => {
        return current.price_url != item.price_url;
      })
    );
  };

  // retourne le prix total d'un item
  const getTotalCost = () => {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
      for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].price_url === cartItem.price_url) {
          totalCost += allProducts[i].price * cartItem.quantity;
        }
      }
    });

    return totalCost;
  };

  return (
    <cartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        allProducts,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
        stripeCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const UsecartContext = () => {
  return useContext(cartContext);
};
