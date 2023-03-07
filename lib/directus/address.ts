import directus from "./directus";
import { IAddress } from "../../Interfaces/IAddress";

export const getAllAddresses = async (): Promise<IAddress[]> => {
  return await directus
    .items("address")
    .readByQuery({ limit: -1, fields: ["*.*"] })
    .then((response) => {
      return response.data;
    })
    .catch((err) => err);
};

export const findAddress = async (id: number | string): Promise<IAddress> => {
  return await directus
    .items("address")
    .readOne(id)
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};
