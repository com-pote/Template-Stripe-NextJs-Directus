import styles from "./Product.module.css";
import Image from "next/image";
import { UsecartContext } from "../../../contexts/cartContext";
import { UseUxContext } from "../../../contexts/uxContext";
import { BsFillCartPlusFill } from "react-icons/bs";
import Link from "next/link";
import getAssetURL from "../../../services/directus/getAssets";

const Product = ({ product }) => {
  const { addOneToCart } = UsecartContext();
  const { handleFlash } = UseUxContext();

  const handleButton = (product) => {
    addOneToCart(product);
    handleFlash("success", "Produit ajouté au panier", 1000);
  };

  return (
    <>
      {product && (
        <div className={styles.container}>
          <Link href={`/produit/${product.id}`} className={styles.image}>
            <Image src={getAssetURL(product.fimg.id)} alt="" fill />
            {/* <Image src={product.images[0]} alt="" fill /> */}
          </Link>
          <h2>{product.name}</h2>
          <span className={styles.price}>{product.price} €</span>
          <button onClick={() => handleButton(product)}>
            <BsFillCartPlusFill />
            Ajouter au Panier
          </button>
        </div>
      )}
    </>
  );
};

export default Product;
