import { ItemInput, UserItem } from "@directus/sdk";
import directus from "./directus";

export const createUser = async (credentials: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
}) => {
  return await directus.users.createOne(credentials);
};

export const updateMe = async (credentials: ItemInput<UserItem<unknown>>) => {
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
