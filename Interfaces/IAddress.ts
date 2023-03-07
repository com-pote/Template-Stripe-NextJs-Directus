import { ItemInput, UserItem } from "@directus/sdk";

export interface IAddress {
  id: string | number;
  name: string;
  street: string;
  zip_code: string;
  city: string;
  country: string;
  recipient: ItemInput<UserItem<unknown>>;
}
