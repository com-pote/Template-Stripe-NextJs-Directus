import { IProduct } from "../../Interfaces/IProduct";
import directus from "./directus";

export const getAllProduct = async (): Promise<IProduct[]> => {
  return await directus
    .items("product")
    .readByQuery({ limit: -1, fields: ["*.*"] })
    .then((response) => {
      return response.data;
    })
    .catch((err) => err);
};

export const getAllProductFromCategory = async (name: string): Promise<IProduct[]> => {
  return await directus
    .items("product")
    .readByQuery({
      filter: {
        category: {
          name: {
            _eq: name,
          },
        },
      },
      fields: ["*.*"],
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => err);
};

export const findProduct = async (name: string | string[]): Promise<IProduct[]> => {
  if (typeof name == "string") {
    return await directus
      .items("product")
      .readByQuery({
        search: name,
        fields: ["*.*"],
      })
      .then((response) => {
        return response.data[0];
      })
      .catch((err) => err);
  }
};

export const findProducts = async (name: string | string[]): Promise<IProduct[]> => {
  if (typeof name == "string") {
    return await directus
      .items("product")
      .readByQuery({
        search: name,
        fields: ["*.*"],
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => err);
  }
};
