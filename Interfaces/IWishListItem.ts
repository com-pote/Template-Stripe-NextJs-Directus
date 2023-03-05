import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

export interface IWishListItem {
  id: string;
  product_id: IProduct;
  user_id: IUser;
}
