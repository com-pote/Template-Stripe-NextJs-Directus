import styles from "./Product.module.css";
import Image from "next/image";
import { UsecartContext } from "../../../contexts/cartContext";
import { UseUxContext } from "../../../contexts/uxContext";
import Link from "next/link";
import { Card, Row } from "@nextui-org/react";
import getAssetURL from "../../../services/directus/getAssets";
import ButtonUI from "../../Atoms/Button/Button";
import { toBase64, shimmer } from "../../../services/utils";

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
        <Card className={styles.container} isPressable variant="bordered">
          <Card.Header className={styles.header}>
            <Link href={`/produits/${product.name}`}>
              <h2>{product.name}</h2>
            </Link>
          </Card.Header>
          <Card.Body className={styles.body}>
            <Link href={`/produits/${product.name}`} className={styles.image}>
              <Image
                src={getAssetURL(product.fimg.id)}
                alt={product.name}
                fill
                sizes="20vw"
                priority="true"
                quality="100"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
              />
            </Link>
          </Card.Body>
          <Card.Footer className={styles.footer}>
            <span className={styles.price}>{product.price} €</span>
            <ButtonUI onClick={() => handleButton(product)} text="Ajouter au Panier" />
          </Card.Footer>
        </Card>
      )}
    </>
  );
};

export default Product;
