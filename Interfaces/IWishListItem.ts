import { ItemInput, UserItem } from "@directus/sdk";
import { IProduct } from "./IProduct";

export interface IWishListItem {
  id: string;
  product_id: IProduct;
  user_id: ItemInput<UserItem<unknown>>;
}
