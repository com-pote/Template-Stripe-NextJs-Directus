import Link from "next/link";
import { useSearchStore } from "../../../contexts/searchStore";
import { ICategory } from "../../../Interfaces/ICategory";
import styles from "./Categories.module.scss";

const Categories = ({ categories }) => {
  const changeVisibility = useSearchStore((state) => state.toggleCategory);
  const visibility = useSearchStore((state) => state.categoryVisible);
  return (
    <aside className={`${styles.container} ${visibility ? styles.visible : ""}`}>
      {categories &&
        categories.map((c: ICategory) => (
          <Link href={`/categories/${c.slug}`} key={c.id} className={styles.category}>
            <div onClick={changeVisibility}>{c.name}</div>
          </Link>
        ))}
    </aside>
  );
};

export default Categories;
