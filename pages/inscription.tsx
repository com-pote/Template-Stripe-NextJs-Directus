import styles from "../styles/Register.module.scss";
import Head from "next/head";
import { getAllCategories } from "../lib/directus/categories";
import RegisterCard from "../components/Molecules/RegisterCard/RegisterCard";

export async function getStaticProps() {
  const categories = await getAllCategories();
  return {
    props: {
      categories: categories,
      protected: false,
    },
    revalidate: 10,
  };
}

const Register = () => {
  return (
    <>
      <Head>
        <title>Inscription à l&apos;espace membre | Marque</title>
        <meta name="description" content="Page de connexion à l'espace membre" />
      </Head>
      <main className={styles.container}>
        <h1>Inscription</h1>
        <RegisterCard />
      </main>
    </>
  );
};

export default Register;
