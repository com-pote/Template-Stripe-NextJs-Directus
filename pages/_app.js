import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import "../styles/framework.css";
import "../styles/reset.css";
import { CartWrapper } from "../contexts/cartContext";
import { UxWrapper } from "../contexts/uxContext";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { AuthGuard } from "../contexts/AuthGuard";

const darkTheme = createTheme({ type: "dark" });

function MyApp({ Component, pageProps }) {
  return (
    <UxWrapper>
      <CartWrapper>
        <NextUIProvider>
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
        </NextUIProvider>
      </CartWrapper>
    </UxWrapper>
  );
}

export default MyApp;
