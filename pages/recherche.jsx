import Head from "next/head";
import Product from "../components/Molecules/Product/Product";
import styles from "../styles/Search.module.css";
import { getAll, getAllBy } from "../services/directus/utils";
import { UseUxContext } from "../contexts/uxContext";
import Flash from "../components/Atoms/Flash/Flash";
import { Container, Grid } from "@nextui-org/react";
import { UsecartContext } from "../contexts/cartContext";
import { useEffect } from "react";

export async function getStaticProps() {
  const categories = await getAll("category");
  return {
    props: {
      categories: categories,
    },
    revalidate: 10,
  };
}

export default function Search() {
  const { flash, flashType } = UseUxContext();

  const { search, result, setResult } = UsecartContext();

  useEffect(() => {
    getAllBy("product", {
      search: search,
      fields: ["*.*"],
    })
      .then((data) => setResult(data.data))
      .catch((err) => console.log(err));
  }, [search, setResult]);

  return (
    <>
      <Head>
        <title>Indication | Nom de Marque</title>
        <meta name="description" content="Une courte description de la page" />
      </Head>

      <Container responsive fluid className={styles.main}>
        <h1>Produits</h1>
        <Grid.Container gap={2} justify="center">
          {result &&
            result.map((p) => (
              <Grid key={p.id}>
                <Product product={p} />
              </Grid>
            ))}
        </Grid.Container>

        {flash && <Flash type={flashType} text={flash} />}
      </Container>
    </>
  );
}
