import { ItemInput, UserItem } from "@directus/sdk";

export interface IAuth {
  isAuthenticated: boolean;
  user: ItemInput<UserItem<unknown>> | null;
  loading: boolean;
  login: ({ email, password }: { email: string; password: string }) => Promise<unknown>;
  logout: () => Promise<unknown>;
  getToken: () => Promise<string | null>;
}
