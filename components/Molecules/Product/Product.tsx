import styles from "./Product.module.scss";
import Image from "next/image";
import Link from "next/link";
import getAsset from "../../../lib/directus/getAssets";
import { toBase64, shimmer } from "../../../lib/utils";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import Button from "../../Atoms/Button/Button";
import Heart from "../../../public/Heart";
import { useCartStore } from "../../../contexts/cartStore";
import { ICartItem } from "../../../Interfaces/ICartItem";
import { useWishListStore } from "../../../contexts/wishListStore";

const Product = ({ product }) => {
  const { user } = useAuth();

  const [isInMyWishList, setIsInMyWishList] = useState(false);

  const add = useCartStore((state) => state.addOneToCart);

  const myWishList = useWishListStore((state) => state.wishList);
  const addToWishList = useWishListStore((state) => state.addToWishList);
  const removeFromWishList = useWishListStore((state) => state.removeFromWishList);

  const handleButton = (product: ICartItem) => {
    add(product);
  };

  useEffect(() => {
    if (user && myWishList && product) {
      setIsInMyWishList(myWishList.filter((item) => item.id === product.id).length > 0 && true);
    }
  }, [user, myWishList, product]);

  return (
    <>
      {product && (
        <div className={styles.container}>
          <div className={styles.header}>
            <Link href={`/produits/${product.name}`}>
              <h2>{product.name}</h2>
            </Link>
          </div>
          <div className={styles.body}>
            <Link href={`/produits/${product.name}`} className={styles.image}>
              <Image
                src={product.fimg.id ? getAsset(product.fimg.id) : getAsset(product.fimg)}
                alt={product.name}
                fill
                sizes="20vw"
                priority={true}
                quality="100"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
              />
            </Link>
          </div>
          <div className={styles.footer}>
            <span className={styles.price}>{product.price} €</span>
            <Button text="Ajouter au Panier" onClick={() => handleButton(product)} color="primary" />
            {user &&
              (isInMyWishList === false ? (
                <Button
                  icon={<Heart width="1em" height="1em" color="var(--body)" style={{ stroke: "var(--primary)" }} />}
                  onClick={() => addToWishList(product, user)}
                  text="Ajouter à Ma liste"
                  className={styles.wishList}
                />
              ) : (
                <Button
                  icon={<Heart width="1em" height="1em" color="var(--primary)" />}
                  onClick={() => removeFromWishList(product, user)}
                  text="Dans ma liste"
                  className={styles.wishList}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
