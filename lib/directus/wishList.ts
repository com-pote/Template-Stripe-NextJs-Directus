import { IWishListItem } from "../../Interfaces/IWishListItem";
import directus from "./directus";

export const getAllWishList = async (): Promise<IWishListItem[]> => {
  return await directus
    .items("wishlist_item")
    .readByQuery({ limit: -1, fields: ["*.*"] })
    .then((response) => {
      return response.data;
    })
    .catch((err) => err);
};
