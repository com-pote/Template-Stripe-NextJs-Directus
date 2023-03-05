import directus from "./directus";

// Items

export const getAll = async (item: string): Promise<JSON> => {
  return directus
    .items(item)
    .readByQuery({ limit: -1, fields: ["*.*"] })
    .then((response) => response.data)
    .catch((err) => err);
};

export const getAllBy = async (item: string, query: Object): Promise<JSON> => {
  return directus
    .items(item)
    .readByQuery(query)
    .then((response) => response)
    .catch((error) => error);
};

export const find = async (item: string, id: number | string): Promise<JSON> => {
  return await directus
    .items(item)
    .readOne(id, {
      fields: ["*.*.*"],
    })
    .then((response) => response)
    .catch((error) => error);
};

export const createItem = async (item: string, object: object): Promise<unknown> => {
  return await directus.items(item).createOne(object);
};

export const deleteItem = async (item: string, id: number | string): Promise<unknown> => {
  return await directus.items(item).deleteOne(id);
};
