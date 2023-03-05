import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";

interface Props {
  children: React.ReactElement;
  categories?: unknown;
}

export const AuthGuard = ({ children }: Props): React.ReactElement => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    /* show loading indicator while the auth provider is still initializing */
    if (!isAuthenticated) {
      // remember the page that user tried to access
      // redirect
      router.push("/connexion");
    }
  }, [router, isAuthenticated, loading]);

  // if auth initialized with a valid user show protected page
  if (isAuthenticated) {
    return children;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
};
