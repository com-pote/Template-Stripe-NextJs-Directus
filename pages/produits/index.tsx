import Head from "next/head";
import Product from "../../components/Molecules/Product/Product";
import styles from "../../styles/Products.module.scss";
import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Molecules/BreadCrumb/BreadCrumb";
import { getAllCategories } from "../../lib/directus/categories";
import { findProducts } from "../../lib/directus/products";
import { IProduct } from "../../Interfaces/IProduct";
import { useSearchStore } from "../../contexts/searchStore";

export async function getStaticProps() {
  const categories = await getAllCategories();
  return {
    props: {
      categories: categories,
    },
    revalidate: 10,
  };
}

const Products = () => {
  const [result, setResult] = useState<IProduct[]>(null);

  const search = useSearchStore((state) => state.search);

  useEffect(() => {
    findProducts(search)
      .then((data) => setResult(data))
      .catch((err) => console.log(err));
  }, [search, setResult]);

  return (
    <>
      <Head>
        <title>Indication | Nom de Marque</title>
        <meta name="description" content="Une courte description de la page" />
      </Head>

      <div className={styles.container}>
        <Breadcrumb />
        <h1>Produits</h1>
        {/* <Select
          id="Tri"
          options={[
            { name: "price", value: "Prix Croissant" },
            { name: "-price", value: "Prix Décroissant" },
            { name: "category", value: "Catégorie" },
          ]}
        /> */}
        <div className={styles.result}>
          {result &&
            result.map((p) => (
              <div key={p.id}>
                <Product product={p} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Products;
