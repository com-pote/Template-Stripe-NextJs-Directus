import Head from "next/head";
import Product from "../components/Molecules/Product/Product";
import styles from "../styles/Home.module.css";
import { getAll } from "../services/directus/utils";
import { UseUxContext } from "../contexts/uxContext";
import Flash from "../components/Atoms/Flash/Flash";
import { Container, Grid } from "@nextui-org/react";
import Hero from "../components/Molecules/Hero/Hero";
import ButtonUI from "../components/Atoms/Button/Button";
import Link from "next/link";

export async function getStaticProps() {
  const products = await getAll("product");
  const categories = await getAll("category");
  return {
    props: {
      products: products,
      categories: categories,
    },
    revalidate: 10,
  };
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`${process.env.HOST}/api/products`);
//   const products = await res.json();

//   // Pass data to the page via props
//   return { props: { products } };
// }

export default function Home({ products }) {
  const { flash, flashType } = UseUxContext();

  return (
    <>
      <Head>
        <title>Indication | Nom de Marque</title>
        <meta name="description" content="Une courte description de la page" />
      </Head>

      <Container responsive fluid className={styles.main}>
        <Hero />
        <h1>Les derniers produits</h1>
        <Grid.Container gap={2} justify="center">
          {products &&
            products.slice(0, 5).map((p) => (
              <Grid key={p.id}>
                <Product product={p} />
              </Grid>
            ))}
        </Grid.Container>

        <Link href="/produits">
          <ButtonUI text="Voir tous les produits" color="neutral" />
        </Link>

        {flash && <Flash type={flashType} text={flash} />}
      </Container>
    </>
  );
}
