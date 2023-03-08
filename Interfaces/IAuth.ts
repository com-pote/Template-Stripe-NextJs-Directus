import { ItemInput, UserItem } from "@directus/sdk";
import { Dispatch, SetStateAction } from "react";

export interface IAuth {
  isAuthenticated: boolean;
  user: UserItem<unknown> | null;
  loading: boolean;
  login: ({ email, password }: { email: string; password: string }) => Promise<unknown>;
  logout: () => Promise<unknown>;
  getToken: () => Promise<string | null>;
  visible: boolean;
  toggle: Dispatch<SetStateAction<boolean>>;
}
