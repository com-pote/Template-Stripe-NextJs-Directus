import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import "../styles/framework.css";
import "../styles/reset.css";
import { AuthGuard } from "../contexts/AuthGuard";
import { AuthWrapper } from "../contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthWrapper>
        {pageProps.protected && pageProps.categories ? (
          <AuthGuard>
            <Layout categories={pageProps.categories}>
              <Component {...pageProps} />
            </Layout>
          </AuthGuard>
        ) : pageProps.protected ? (
          <AuthGuard>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthGuard>
        ) : pageProps.categories ? (
          <Layout categories={pageProps.categories}>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </AuthWrapper>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default MyApp;
