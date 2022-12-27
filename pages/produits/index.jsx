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
import Select from "../../components/Atoms/Select/Select";

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
  const { sortProductsBy, setSortProductsBy } = UseUxContext();

  useEffect(() => {
    getAllBy("product", {
      search: search,
      fields: ["*.*"],
    })
      .then((data) => setResult(data.data))
      .catch((err) => console.log(err));
  }, [search, setResult]);

  const sortBy = (e) => {
    setSortProductsBy(e.target.value);
  };

  useEffect(() => {
    if (sortProductsBy !== null) {
      getAllBy("product", {
        sort: [sortProductsBy && `${sortProductsBy}`, "name"],
        fields: ["*.*"],
      })
        .then((data) => {
          setResult(data.data);
          console.log(data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [setResult, sortProductsBy]);

  console.log(sortProductsBy);

  return (
    <>
      <Head>
        <title>Indication | Nom de Marque</title>
        <meta name="description" content="Une courte description de la page" />
      </Head>

      <Container responsive fluid className={styles.container}>
        <Breadcrumb />
        <h1>Produits</h1>
        <Select
          id="Tri"
          options={[
            { name: "price", value: "Prix Croissant" },
            { name: "-price", value: "Prix Décroissant" },
            { name: "category", value: "Catégorie" },
          ]}
          onChange={(e) => sortBy(e)}
        />
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
