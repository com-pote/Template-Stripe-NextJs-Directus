import { Container } from "@nextui-org/react";
import styles from "../styles/Login.module.css";
import Head from "next/head";
import LoginCard from "../components/Molecules/LoginCard/LoginCard";
import { getAll } from "../services/directus/utils";

export async function getStaticProps() {
  const categories = await getAll("category");
  return {
    props: {
      categories: categories,
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
      <Container className={styles.container}>
        <h1>Connexion</h1>
        <LoginCard />
      </Container>
    </>
  );
};

export default Login;
