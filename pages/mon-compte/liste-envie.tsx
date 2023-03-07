import BreadCrumb from "../../components/Molecules/BreadCrumb/BreadCrumb";
import Product from "../../components/Molecules/Product/Product";
import { useWishListStore } from "../../contexts/wishListStore";
import { getAllCategories } from "../../lib/directus/categories";
import styles from "../../styles/Profile.module.scss";

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

const Profile = () => {
  const myWishList = useWishListStore((state) => state.wishList);

  return (
    <main className={styles.container}>
      <BreadCrumb />
      <h1>Liste d&apos;envie</h1>
      {myWishList && myWishList.length !== 0 ? (
        myWishList.map((i) => <Product key={i.id} product={i} />)
      ) : (
        <p>Aucun Produit dans votre liste d&apos;envie</p>
      )}
    </main>
  );
};

export default Profile;
