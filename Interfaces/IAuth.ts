import { ItemInput, UserItem } from "@directus/sdk";

export interface IAuth {
  isAuthenticated: boolean;
  user: UserItem | null;
  loading: boolean;
  login: ({ email, password }: { email: string; password: string }) => Promise<unknown>;
  logout: () => Promise<unknown>;
  getToken: () => Promise<string | null>;
}
