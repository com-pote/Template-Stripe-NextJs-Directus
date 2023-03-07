import { IProduct } from "./IProduct";

export interface IOrderLine {
  id: string;
  order: string;
  price: number;
  product: IProduct;
  quantity: number;
}
