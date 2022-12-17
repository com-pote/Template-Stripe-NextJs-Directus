import { find, getAll, getAllBy } from "../../services/directus/utils";
import Head from "next/head";
import { UseUxContext } from "../../contexts/uxContext";
import styles from "../../styles/Category.module.css";
import Flash from "../../components/Atoms/Flash/Flash";
import { useEffect, useState } from "react";
import Product from "../../components/Molecules/Product/Product";

export async function getStaticPaths() {
  const categories = await getAll("category");

  const paths = categories.map((item) => ({
    params: { categorie: item.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const id = context.params.categorie;
  const category = await find("category", id);
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

  useEffect(() => {
    getAllBy("product", {
      filter: {
        category: {
          id: {
            _eq: category.id,
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
      <article className={styles.container}>
        <h1>{category && category.name}</h1>
        {products && (
          <div className={styles.products}>{products && products.map((p) => <Product key={p.id} product={p} />)}</div>
        )}
      </article>
      {flash && <Flash type={flashType} text={flash} />}
    </>
  );
};

export default ProductSingle;
