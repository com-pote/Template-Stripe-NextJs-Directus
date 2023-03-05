import { Dispatch, SetStateAction } from "react";
import { ICartItem } from "./ICartItem";

export interface ICart {
  search: string;
  cart: ICartItem[];
  clearCart: () => void;
  addOneToCart: (item: ICartItem) => void;
  removeOneFromCart: (item: ICartItem) => void;
  deleteFromCart: (item: ICartItem) => void;
  getTotalCost: () => number;
  getTotalQuantity: () => number;
  setSearch: Dispatch<SetStateAction<string>>;
}
