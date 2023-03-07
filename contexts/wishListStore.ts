import { ItemInput, UserItem } from "@directus/sdk";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IWishListItem } from "../Interfaces/IWishListItem";
import { createItem, deleteItem } from "../lib/directus/utils";
import { getAllWishList } from "../lib/directus/wishList";

type State = {
  wishList: IWishListItem[];
};

type Action = {
  addToWishList: (item: IWishListItem, user: ItemInput<UserItem<unknown>>) => void;
  removeFromWishList: (item: IWishListItem, user: ItemInput<UserItem<unknown>>) => void;
};

export const useWishListStore = create(
  persist<State & Action>(
    (set, get) => ({
      wishList: [],
      addToWishList: (item, user) => {
        createItem("wishlist_item", { product_id: item.id, user_id: user.id });
        set(() => ({ wishList: [...get().wishList, { ...item }] }));
        toast.success("Produit Ajouté à votre liste d'envie'", {});
      },
      removeFromWishList: async (item, user): Promise<any> => {
        set({ wishList: get().wishList.filter((current) => current.id != item.id) });
        const deleteId = await getAllWishList().then(
          (data) => data.filter((w) => w.product_id.id === item.id && w.user_id.id === user.id)[0].id
        );

        deleteItem("wishlist_item", deleteId);
        toast.error("Produit retiré de votre liste d'envie", {});
      },
    }),
    {
      name: "wishList", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
