import styles from "../styles/Login.module.scss";
import Head from "next/head";
import LoginCard from "../components/Molecules/LoginCard/LoginCard";
import { getAllCategories } from "../lib/directus/categories";

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

const Login = () => {
  return (
    <>
      <Head>
        <title>Connexion à l&apos;espace adhérent | PoCLi</title>
        <meta name="description" content="Page de connexion à l'espace membre" />
      </Head>
      <div className={styles.container}>
        <h1>Connexion</h1>
        <LoginCard />
      </div>
    </>
  );
};

export default Login;
