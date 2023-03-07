import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { getMyorders } from "../../../lib/directus/order";
import styles from "../../../styles/Profile.module.scss";
import { IOrder } from "../../../Interfaces/IOrder";
import Order from "../../../components/Molecules/Order/Order";
import { getAllCategories } from "../../../lib/directus/categories";
import BreadCrumb from "../../../components/Molecules/BreadCrumb/BreadCrumb";

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

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    getMyorders(user)
      .then((data) => setMyOrders(data))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <main className={styles.container}>
      <BreadCrumb />
      <h1>Mes Commandes</h1>
      {myOrders && myOrders.map((o: IOrder) => <Order key={o.id} order={o} />)}
    </main>
  );
};

export default MyOrders;
