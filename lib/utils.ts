import { ICartItem } from "../Interfaces/ICartItem";

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str);

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const capitalize = (string: string): string => {
  return string[0].toUpperCase() + string.slice(1);
};

// Retourne la quantité d'un produit du panier en fonction de son ID et du panier
export const getProductQuantity = (id: string | number, cart: ICartItem[]) => {
  const quantity = cart.find((p: ICartItem) => p.id === id)?.quantity;

  if (quantity === undefined) {
    return 0;
  }

  return quantity;
};

// retourne le prix total d'un item
export const getTotalCost = (cart: ICartItem[]): number => {
  let totalCost = 0;
  cart.map((cartItem: ICartItem) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === cartItem.id) {
        totalCost += cart[i].price * cartItem.quantity;
      }
    }
  });

  return totalCost;
};

// retourne le nombre d'article dans le panier
export const getTotalQuantity = (cart: ICartItem[]): number => {
  let totalQuantity = 0;
  cart.map((cartItem: ICartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return totalQuantity;
};
