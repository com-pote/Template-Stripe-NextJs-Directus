import styles from "../../styles/Category.module.css";

import { getAll } from "../../services/directus/utils";
import Link from "next/link";
import BreadCrumb from "../../components/Molecules/BreadCrumb/BreadCrumb";

export async function getStaticProps() {
  const products = await getAll("product");
  const categories = await getAll("category");
  return {
    props: {
      products: products,
      categories: categories,
    },
    revalidate: 10,
  };
}

const Categories = ({ categories }) => {
  return (
    <div className={styles.container}>
      <BreadCrumb />
      <h1>Catégories</h1>

      <ul>
        {categories.map((c) => (
          <li key={c.id}>
            <Link href={`categories/${c.name}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
