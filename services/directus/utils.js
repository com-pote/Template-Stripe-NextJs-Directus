import directus from "./directus";

// Items

/**
 * [get All items of an item collection (database)]
 *
 * @param   {[String]}  item  [item to fetch]
 *
 * @return  {[Promise<JSON>]}        [return response]
 */
export const getAll = async (item) => {
  return directus
    .items(item)
    .readByQuery({ limit: -1, fields: ["*.*"] })
    .then((response) => response.data)
    .catch((error) => error);
};

/**
 * [getAllBy Items of an item collection with a specific Query]
 *
 * @param   {[String]}  item  [item to fetch]
 * @param   {[String]}  query  [query to fetch]
 *
 * @return  {[Promise<JSON>]}         [return response]
 */
export const getAllBy = async (item, query) => {
  return directus
    .items(item)
    .readByQuery(query)
    .then((response) => response)
    .catch((error) => error);
};

/**
 * [return one item of a collection by its ID]
 *
 * @param   {[String]}  item  [item type to fetch]
 * @param   {[Number]}  id    [id of the item to fetch]
 *
 * @return  {[Promise<JSON>]}        [return response]
 */
export const find = async (item, id) => {
  return await directus
    .items(item)
    .readOne(id, {
      fields: ["*.*.*"],
    })
    .then((response) => response)
    .catch((error) => error);
};

/**
 * [create an item]
 *
 * @param   {[String]}  item    [item type to create]
 * @param   {[Object]}  object  [item to create]
 *
 * @return  {[Promise<JSON>]}          [return response]
 */
export const createItem = async (item, object) => {
  return await directus.items(item).createOne(object);
};

/**
 * [delete an Item]
 *
 * @param   {[String]}  item  [item type to delete]
 * @param   {[Number]}  id    [id of the item to delete]
 *
 * @return  {[Promise<JSON>]}        [return a responses]
 */
export const deleteItem = async (item, id) => {
  return await directus.items(item).deleteOne(id);
};

/**
 * [update an item]
 *
 * @param   {[String]}  item  [item type to update]
 * @param   {[Number]}  id    [id of the item to delete]
 *
 * @return  {[Promise<JSON>]}        [return Promise]
 */
export const update = async (item, id) => {
  return await directus.items(item).updateOne(id);
};
