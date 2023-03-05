import styles from "../../../styles/Profile.module.scss";
import { AddressFormCard } from "../../../components/Molecules/AddressFormCard/AddressFormCard";
import BreadCrumb from "../../../components/Molecules/BreadCrumb/BreadCrumb";
import { getAllCategories } from "../../../lib/directus/categories";

export async function getStaticProps() {
  const categories = await getAllCategories();
  return {
    props: {
      categories: categories,
      protected: true,
    },
    revalidate: 10,
  };
}

const Adress = () => {
  return (
    <div className={styles.container}>
      <BreadCrumb />
      <h1>Mes Adresses</h1>

      <div className={styles.body}>
        <AddressFormCard />
      </div>
    </div>
  );
};

export default Adress;
