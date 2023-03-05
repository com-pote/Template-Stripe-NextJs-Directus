import { IUser } from "../../Interfaces/IUser";
import directus from "./directus";

export const updateMe = async (credentials: IUser) => {
  await directus.users.me.update(credentials);
};

export const getAllMyAdresses = async (userId: string) => {
  return await directus
    .items("address")
    .readByQuery({
      filter: {
        recipient: {
          id: {
            _eq: userId,
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

export const deleteAdress = async (id: string | number): Promise<unknown> => {
  return await directus.items("adress").deleteOne(id);
};

export const createAdress = async (object: object) => {
  return await directus.items("adress").createOne(object);
};
