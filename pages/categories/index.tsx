import styles from "../../styles/Category.module.scss";
import Link from "next/link";
import BreadCrumb from "../../components/Molecules/BreadCrumb/BreadCrumb";
import { getAllCategories } from "../../lib/directus/categories";

export async function getStaticProps() {
  const categories = await getAllCategories();
  return {
    props: {
      categories: categories,
    },
    revalidate: 10,
  };
}

const Categories = ({ categories }) => {
  return (
    <main className={styles.container}>
      <BreadCrumb />
      <h1>Catégories</h1>

      <ul>
        {categories.map((c) => (
          <li key={c.id}>
            <Link href={`categories/${c.name}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Categories;
