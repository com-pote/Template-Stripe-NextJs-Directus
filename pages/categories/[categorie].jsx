import { findBy, getAll, getAllBy } from "../../services/directus/utils";
import Head from "next/head";
import { UseUxContext } from "../../contexts/uxContext";
import styles from "../../styles/Category.module.css";
import Flash from "../../components/Atoms/Flash/Flash";
import { useEffect, useState } from "react";
import Product from "../../components/Molecules/Product/Product";
import { Container, Grid } from "@nextui-org/react";
import BreadCrumb from "../../components/Molecules/BreadCrumb/BreadCrumb";

export async function getStaticPaths() {
  const categories = await getAll("category");

  const paths = categories.map((item) => ({
    params: { categorie: item.name.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const name = context.params.categorie;
  const category = await findBy("category", {
    search: name,
    fields: ["*.*"],
  });
  const categories = await getAll("category");
  return {
    props: {
      category,
      categories,
    },
    revalidate: 10,
  };
}

const ProductSingle = ({ category }) => {
  const { flash, flashType } = UseUxContext();

  const [products, setProducts] = useState([]);
  ``;

  useEffect(() => {
    getAllBy("product", {
      filter: {
        category: {
          name: {
            _eq: category.name,
          },
        },
      },
      fields: ["*.*"],
    })
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, [category]);

  return (
    <>
      <Head>
        <title>{`${category && category.name} | Nom du Commerce`}</title>
      </Head>
      <Container responsive fluid className={styles.container}>
        <BreadCrumb />
        <article className={styles.article}>
          <h1>{category && category.name}</h1>
          {products && (
            <Grid.Container gap={2} justify="flex-start">
              {products &&
                products.map((p) => (
                  <Grid key={p.id}>
                    <Product product={p} />
                  </Grid>
                ))}
            </Grid.Container>
          )}
        </article>
        {flash && <Flash type={flashType} text={flash} />}
      </Container>
    </>
  );
};

export default ProductSingle;