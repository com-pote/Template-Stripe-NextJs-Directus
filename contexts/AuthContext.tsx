import { createContext, useState, useContext, useEffect } from "react";
import directus from "../lib/directus/directus";
import { IAuth } from "../Interfaces/IAuth";
import { ItemInput, UserItem } from "@directus/sdk";

interface Props {
  children: React.ReactElement;
  categories?: unknown;
}

const AuthContext = createContext<IAuth>({
  isAuthenticated: false,
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  getToken: async () => null,
});

export const AuthWrapper = ({ children }: Props) => {
  const [user, setUser] = useState<ItemInput<UserItem<unknown>>>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  useEffect(() => {
    async function loadUserFromDirectus() {
      const token = await directus.auth.token;

      if (token) {
        directus.auth.refresh();
        const me = await directus.users.me.read();
        setUser(me);
      }
      setLoading(false);
    }
    setLoading(true);
    loadUserFromDirectus();
  }, []);

  const login = async ({ email, password }: { email: string; password: string }): Promise<void> => {
    setLoading(true);
    const res = await directus.auth
      .login({
        email: email,
        password: password,
      })
      .then((data) => data)
      .catch((error) => {
        error.log(error);
        return error;
      });
    if (res?.errors?.length > 0) return res;

    const me = await directus.users.me.read();
    setUser(me);
    setLoading(false);
  };

  const logout = async () => {
    await directus.auth.logout();
    setUser(null);
  };

  const getToken = async () => {
    await directus.auth.refreshIfExpired().catch((error) => {
      setUser(null);
    });
    const token = await directus.auth.token;
    if (token) {
      return token;
    }
    setUser(null);
    return null;
  };

  const value = { isAuthenticated, user, loading, logout, getToken, login };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
