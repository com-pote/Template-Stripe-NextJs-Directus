import styles from "../styles/Cart.module.scss";
import Link from "next/link";
import { getAll } from "../lib/directus/utils";
import { useEffect, useState } from "react";
import Button from "../components/Atoms/Button/Button";
import getAssets from "../lib/directus/getAssets";
import Trash from "../public/Trash";
import Minus from "../public/Minus";
import Plus from "../public/Plus";
import Image from "next/image";
import Home from "../public/Home";
import { useCartStore } from "../contexts/cartStore";
import { getTotalCost, getTotalQuantity } from "../lib/utils";
import { useRouter } from "next/router";

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
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const cart = useCartStore((state) => state.cart);
  const addOneToCart = useCartStore((state) => state.addOneToCart);
  const removeOneFromCart = useCartStore((state) => state.removeOneFromCart);
  const deleteFromCart = useCartStore((state) => state.deleteFromCart);
  const router = useRouter();

  useEffect(() => {
    if (cart) {
      setTotal(getTotalCost(cart));
    }
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      router.push("/paiement-valide");
    }

    if (query.get("canceled")) {
      router.push("/paiement-annule");
    }
  }, [cart, router]);

  useEffect(() => {
    const quantity = getTotalQuantity(cart);
    setQuantity(quantity);
  }, [cart]);

  const columns = [
    { name: "Produit", uid: "name" },
    { name: "Quantité", uid: "quantity" },
    { name: "Total", uid: "total_price" },
    { name: "Supprimer", uid: "actions" },
  ];

  return (
    <main className={styles.container}>
      <h1>Panier</h1>
      {quantity > 0 ? (
        <>
          <table aria-label="Votre Panier d'achats" className={styles.table}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.uid}>{column.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cart.map((p) => (
                <tr key={p.id}>
                  <td className={styles.infos}>
                    <div className={styles.preview}>
                      <Image src={getAssets(p.fimg.id)} alt={p.name} fill />
                    </div>
                    {p.name}
                  </td>
                  <td className={styles.quantity}>
                    <button onClick={() => removeOneFromCart(p)}>
                      <Minus width="2em" height="2em" />
                    </button>
                    {p.quantity}
                    <button onClick={() => addOneToCart(p)}>
                      <Plus width="2em" height="2em" />
                    </button>
                  </td>
                  <td>{p.quantity * p.price} €</td>
                  <td className={styles.actions}>
                    <button onClick={() => deleteFromCart(p)}>
                      <Trash width="2em" height="2em" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <span className={styles.total}>
            <>Total : {total && total} €</>
          </span>
          <Link href="/paiement">
            <Button text="Valider le Panier" color="primary" />
          </Link>
        </>
      ) : (
        <p className={styles.void}>Aucun produit dans le panier</p>
      )}

      <Link href="/">
        <Button className={styles.home} icon={<Home width="2em" height="2em" />} text="Retour à l'accueil" color="primary" />
      </Link>
    </main>
  );
};

export default Cart;
