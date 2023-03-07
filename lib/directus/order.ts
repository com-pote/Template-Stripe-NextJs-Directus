import directus from "./directus";
import { IAddress } from "../../Interfaces/IAddress";
import { UserItem } from "@directus/sdk";
import { ICartItem } from "../../Interfaces/ICartItem";

export const getMyorders = async (user: UserItem): Promise<IAddress[]> => {
  return await directus
    .items("order")
    .readByQuery({
      filter: {
        recipient: {
          _eq: "$CURRENT_USER",
        },
      },
      limit: -1,
      fields: ["*.*"],
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => err);
};

export const createOrder = async (user: UserItem): Promise<unknown> => {
  const now = new Date();
  return await directus
    .items("order")
    .createOne({ datetime: now, recipient: user })
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};

export const createOrderline = async (order: string, product: ICartItem): Promise<unknown> => {
  return await directus
    .items("order_line")
    .createOne({ order: order, product: product, price: product.price, quantity: product.quantity })
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};

export const getAllLineFromOrder = async (order: string) => {
  return await directus
    .items("order_line")
    .readByQuery({
      filter: {
        order: {
          _eq: order,
        },
      },
      fields: ["*.*"],
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => err);
};
