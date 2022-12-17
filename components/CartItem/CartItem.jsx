import Image from "next/image";
import { UsecartContext } from "../../contexts/cartContext";
import getAssetURL from "../../services/directus/getAssets";
import styles from "./CartItem.module.css";
import { BsTrash, BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import Link from "next/link";

const CartItem = ({ item }) => {
  const { addOneToCart, removeOneFromCart, deleteFromCart } = UsecartContext();

  return (
    <>
      <div className={`${styles.container} not-mobile`}>
        <div className={styles.infos}>
          <Link href={`/produit/${item.id}`} className={styles.fimg}>
            <Image src={getAssetURL(item.fimg.id)} alt={item.name} fill />
          </Link>
          <div className={styles.text}>
            <h2>{item.name}</h2>
            <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
          </div>
          <button onClick={() => deleteFromCart(item)} className={styles.delete}>
            <BsTrash />
          </button>
        </div>
        <div className={styles.quantity}>
          <span className={styles.word}>Quantité :</span>
          <div className={styles.modify}>
            <button className={styles.minus} onClick={() => removeOneFromCart(item)}>
              <FaMinus />
            </button>
            {item.quantity}
            <button className={styles.plus} onClick={() => addOneToCart(item)}>
              <BsPlusLg />
            </button>
          </div>
          <p className={styles.price}>{item.price * item.quantity} €</p>
        </div>
      </div>
      <div className={`${styles.container} mobile`}>
        <button onClick={() => deleteFromCart(item)} className={styles.delete}>
          <BsTrash />
        </button>

        <Link href={`/produit/${item.id}`} className={styles.fimg}>
          <Image src={getAssetURL(item.fimg.id)} alt={item.name} fill />
        </Link>
        <h2>{item.name}</h2>

        <div className={styles.quantity}>
          <span className={styles.word}>Quantité :</span>
          <div className={styles.modify}>
            <button className={styles.minus} onClick={() => removeOneFromCart(item)}>
              <FaMinus />
            </button>
            {item.quantity}
            <button className={styles.plus} onClick={() => addOneToCart(item)}>
              <BsPlusLg />
            </button>
          </div>
        </div>
        <p className={styles.price}>
          <span>{item.price * item.quantity}</span>
          <span>&nbsp;€</span>
        </p>
      </div>
    </>
  );
};

export default CartItem;
