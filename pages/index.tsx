import Head from "next/head";
import Product from "../components/Molecules/Product/Product";
import styles from "../styles/Home.module.scss";
import Hero from "../components/Molecules/Hero/Hero";
import Link from "next/link";
import { getAllCategories } from "../lib/directus/categories";
import { useQuery } from "react-query";
import { getAllProduct } from "../lib/directus/products";
import Button from "../components/Atoms/Button/Button";

export async function getStaticProps() {
  const categories = await getAllCategories();
  return {
    props: {
      categories: categories,
    },
    revalidate: 10,
  };
}

export default function Home() {
  const { data: products, isLoading, isError } = useQuery("products", getAllProduct);

  if (isLoading) {
    return "chargement";
  }

  if (isError) {
    return "Erreur";
  }

  return (
    <>
      <Head>
        <title>Indication | Nom de Marque</title>
        <meta name="description" content="Une courte description de la page" />
      </Head>

      <div className={styles.main}>
        <Hero />
        <h1>Les derniers produits</h1>
        <div className={styles.latest}>
          {products &&
            products.slice(0, 5).map((p) => (
              <div key={p.id}>
                <Product product={p} />
              </div>
            ))}
        </div>
        <Link href="/produits">
          <Button text="Voir Tous les Produits" />
        </Link>
      </div>
    </>
  );
}
