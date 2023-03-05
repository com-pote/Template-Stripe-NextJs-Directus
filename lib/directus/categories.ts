import { ICategory } from "../../Interfaces/ICategory";
import directus from "./directus";

export const getAllCategories = async (): Promise<ICategory[]> => {
  return await directus
    .items("category")
    .readByQuery({ limit: -1, fields: ["*.*"] })
    .then((response) => {
      return response.data;
    })
    .catch((err) => err);
};

export const findCategory = async (name: string | string[]): Promise<ICategory> => {
  if (typeof name == "string") {
    return await directus
      .items("category")
      .readByQuery({
        search: name,
        fields: ["*.*"],
      })
      .then((response) => {
        return response.data[0];
      })
      .catch((err) => err);
  }
  return;
};
