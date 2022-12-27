import { useRouter } from "next/router";
import { useEffect } from "react";
import { UseUxContext } from "./uxContext";

export function AuthGuard({ children }) {
  const { isAuthenticated } = UseUxContext();
  const router = useRouter();

  useEffect(() => {
    //auth is initialized and there is no user
    if (!isAuthenticated) {
      // remember the page that user tried to access
      // redirect
      router.push("/connexion");
    }
  }, [router, isAuthenticated]);

  /* show loading indicator while the auth provider is still initializing */
  //   if (initializing) {
  //     return <h1>Application Loading</h1>;
  //   }

  // if auth initialized with a valid user show protected page
  if (isAuthenticated) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
