import styles from "../../../../styles/Profile.module.scss";
import { AddressFormCard } from "../../../../components/Molecules/AddressFormCard/AddressFormCard";
import BreadCrumb from "../../../../components/Molecules/BreadCrumb/BreadCrumb";
import { GetStaticPaths, GetStaticProps } from "next";
import { findAddress, getAllAddresses } from "../../../../lib/directus/address";
import { getAllCategories } from "../../../../lib/directus/categories";

export const getStaticPaths: GetStaticPaths = async () => {
  const addresses = await getAllAddresses();

  const paths = addresses.map((item) => ({
    params: { id: item.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params.id.toString();
  const address = await findAddress(id);
  const categories = await getAllCategories();

  return {
    props: {
      address,
      categories,
    },
    revalidate: 10,
  };
};

const Adress = ({ address }) => {
  return (
    <main className={styles.container}>
      <BreadCrumb />
      <h1>{address && `Modifier l'adresse : ${address.name}`}</h1>

      <div className={styles.body}>{/* <AddressFormCard /> */}</div>
    </main>
  );
};

export default Adress;
