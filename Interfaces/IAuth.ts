import { IUser } from "./IUser";

export interface IAuth {
  isAuthenticated: boolean;
  user: IUser | null;
  loading: boolean;
  login: ({ email, password }: { email: string; password: string }) => Promise<unknown>;
  logout: () => Promise<unknown>;
  getToken: () => Promise<string | null>;
}
