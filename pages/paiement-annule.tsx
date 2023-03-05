import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getAllCategories } from "../lib/directus/categories";

export async function getStaticProps() {
  const categories = await getAllCategories();
  return {
    props: {
      categories: categories,
    },
    revalidate: 10,
  };
}

export default function Cancelled() {
  return (
    <>
      <Head>
        <title>Paiement Annulé | Nom de Marque</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main className={styles.main}>
        <h1>Paiement Annulé</h1>
        <p>Le paiement à été annulé, soit par vous ou par une erreur</p>
      </main>
    </>
  );
}