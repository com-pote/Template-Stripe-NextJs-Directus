import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import "../styles/framework.css";
import "../styles/reset.css";
import { CartWrapper } from "../contexts/cartContext";
import { UxWrapper } from "../contexts/uxContext";

function MyApp({ Component, pageProps }) {
  return (
    <UxWrapper>
      <CartWrapper>
        {pageProps.categories ? (
          <Layout categories={pageProps.categories}>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </CartWrapper>
    </UxWrapper>
  );
}

export default MyApp;
