import styles from "../styles/Cart.module.css";
import Link from "next/link";
import CartItem from "../components/Molecules/CartItem/CartItem";
import checkout from "../services/stripe";
import { IoHome } from "react-icons/io5";
import { BsFillCartCheckFill } from "react-icons/bs";
import { getAll } from "../services/directus/utils";
import { useGetTotalQuantity } from "../hooks/useGetTotalQuantity";
import { UsecartContext } from "../contexts/cartContext";

export async function getStaticProps() {
  const categories = await getAll("category");
  return {
    props: {
      categories: categories,
    },
    revalidate: 10,
  };
}

const Cart = () => {
  const { cartProducts, stripeCart, getTotalCost } = UsecartContext();

  return (
    <div className={styles.container}>
      <h1>Panier</h1>
      {useGetTotalQuantity() > 0 ? (
        <>
          <div className={styles.items}>{cartProducts && cartProducts.map((i) => <CartItem key={i.id} item={i} />)}</div>
          <span className={styles.total}>Total : {getTotalCost()} €</span>
          <button
            onClick={() => {
              checkout({
                lineItems: stripeCart,
              });
            }}
          >
            <BsFillCartCheckFill />
            Valider le Panier
          </button>
        </>
      ) : (
        <p className={styles.void}>Aucun produit dans le panier</p>
      )}

      <Link href="/">
        <button className={styles.home}>
          <IoHome />
          Retour à l&apos;accueil
        </button>
      </Link>
    </div>
  );
};

export default Cart;
