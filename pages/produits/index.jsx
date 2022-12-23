import Head from "next/head";
import Product from "../../components/Molecules/Product/Product";
import styles from "../../styles/Products.module.css";
import { getAll, getAllBy } from "../../services/directus/utils";
import { UseUxContext } from "../../contexts/uxContext";
import Flash from "../../components/Atoms/Flash/Flash";
import { Container, Grid } from "@nextui-org/react";
import { UsecartContext } from "../../contexts/cartContext";
import { useEffect } from "react";
import Breadcrumb from "../../components/Molecules/BreadCrumb/BreadCrumb";

export async function getStaticProps() {
  const categories = await getAll("category");
  return {
    props: {
      categories: categories,
    },
    revalidate: 10,
  };
}

const Products = () => {
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

      <Container responsive fluid className={styles.container}>
        <Breadcrumb />
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
};

export default Products;
