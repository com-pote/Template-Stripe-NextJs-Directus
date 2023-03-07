import Head from "next/head";
import styles from "../../styles/Category.module.scss";
import { useEffect, useState } from "react";
import Product from "../../components/Molecules/Product/Product";
import BreadCrumb from "../../components/Molecules/BreadCrumb/BreadCrumb";
import { findCategory, getAllCategories } from "../../lib/directus/categories";
import { getAllProductFromCategory } from "../../lib/directus/products";

export async function getStaticPaths() {
  const categories = await getAllCategories();

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
  const category = await findCategory(name);
  const categories = await getAllCategories();
  return {
    props: {
      category,
      categories,
    },
    revalidate: 10,
  };
}

const ProductSingle = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (category) {
      getAllProductFromCategory(category.name).then((data) => setProducts(data));
    }
  }, [category]);

  return (
    <>
      <Head>
        <title>{`${category && category.name} | Nom du Commerce`}</title>
      </Head>
      <main className={styles.container}>
        <BreadCrumb />
        <h1>{category && category.name}</h1>
        {products && (
          <div className={styles.result}>
            {products &&
              products.map((p) => (
                <div key={p.id}>
                  <Product product={p} />
                </div>
              ))}
          </div>
        )}
      </main>
    </>
  );
};

export default ProductSingle;
