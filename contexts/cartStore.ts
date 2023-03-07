import { toast } from "react-toastify";
import { create } from "zustand";
import { ICartItem } from "../Interfaces/ICartItem";
import { getProductQuantity } from "../lib/utils";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  cart: ICartItem[];
};

type Action = {
  addOneToCart: (item: ICartItem) => void;
  deleteFromCart: (item: ICartItem) => void;
  removeOneFromCart: (item: ICartItem) => void;
  clearCart: () => void;
};

export const useCartStore = create(
  persist<State & Action>(
    (set, get) => ({
      cart: [],
      //Ajoute un produit au panier si il n'est pas dedans ou rajoute un à la quantité si il est déjà dedans
      addOneToCart: (item) => {
        const quantity = getProductQuantity(item.id, get().cart);

        if (quantity === 0) {
          // pas dans le panier
          set(() => ({ cart: [...get().cart, { ...item, quantity: 1 }] }));
          toast.success("Produit Ajouté au panier", {});
        } else {
          // déjà dans le panier
          set(() => ({
            cart: get().cart.map((p: ICartItem) => (p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p)),
          }));
          toast.success("Produit Ajouté au panier", {});
        }
      },
      // retire totalement un produit du panier
      deleteFromCart: (item): void => {
        set({ cart: get().cart.filter((current) => current.id != item.id) });
        toast.error("Produit retiré du panier", {});
      },
      // retire une itération du produit du panier ou le retire totalement si il n'y en a qu'un
      removeOneFromCart: (item): void => {
        const quantity = getProductQuantity(item.id, get().cart);

        if (quantity == 1) {
          set({ cart: get().cart.filter((current) => current.id != item.id) });
          toast.error("Produit retiré du panier", {});
        } else {
          set({
            cart: get().cart.map((p: ICartItem) => (p.id === item.id ? { ...p, quantity: p.quantity - 1 } : p)),
          });
          toast.info("Produit retiré du panier", {});
        }
      },
      clearCart: () => {
        set({ cart: [] });
        toast.error("Panier Vidé", {});
      },
    }),
    {
      name: "cart", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
