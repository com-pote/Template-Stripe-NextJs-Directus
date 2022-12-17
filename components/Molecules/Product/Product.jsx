import styles from "./Product.module.css";
import Image from "next/image";
import { UsecartContext } from "../../../contexts/cartContext";
import { UseUxContext } from "../../../contexts/uxContext";
import Link from "next/link";
import { Card, Text, Button, Row } from "@nextui-org/react";
import getAssetURL from "../../../services/directus/getAssets";
import ButtonUI from "../../Atoms/Button/Button";

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
        <Card className={styles.container} isPressable>
          <Card.Header>
            <Link href={`/produit/${product.id}`}>
              <h2>{product.name}</h2>
            </Link>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ py: "$10" }}>
            <Link href={`/produit/${product.id}`} className={styles.image}>
              <Image src={getAssetURL(product.fimg.id)} alt="" fill />
              {/* <Image src={product.images[0]} alt="" fill /> */}
            </Link>
            <span className={styles.price}>{product.price} €</span>
          </Card.Body>
          <Card.Divider />
          <Card.Footer>
            <Row justify="center" align="center">
              <ButtonUI onClick={() => handleButton(product)} text={"Ajouter au Panier"} />
            </Row>
          </Card.Footer>
        </Card>
      )}
    </>
  );
};

export default Product;
