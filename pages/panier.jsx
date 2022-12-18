import styles from "../styles/Cart.module.css";
import Link from "next/link";
import { BsTrash, BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import checkout from "../services/stripe";
import { IoHome } from "react-icons/io5";
import { BsFillCartCheckFill } from "react-icons/bs";
import { getAll } from "../services/directus/utils";
import { useGetTotalQuantity } from "../hooks/useGetTotalQuantity";
import { UsecartContext } from "../contexts/cartContext";
import { Table, Row, User, Badge, Text, Button, Container, Spacer } from "@nextui-org/react";
import getAssetURL from "../services/directus/getAssets";
import ButtonUI from "../components/Atoms/Button/Button";

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
  const { cartProducts, stripeCart, getTotalCost, addOneToCart, removeOneFromCart, deleteFromCart } = UsecartContext();

  const columns = [
    { name: "Produit", uid: "name" },
    { name: "Quantité", uid: "quantity" },
    { name: "Total", uid: "total_price" },
    { name: "Actions", uid: "actions" },
  ];

  const renderCell = (cartProducts, columnKey) => {
    const cellValue = cartProducts[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User squared src={getAssetURL(cartProducts.fimg.id)} name={cellValue} css={{ p: 0 }}>
            {cartProducts.price} €
          </User>
        );
      case "quantity":
        return (
          <Row justify="space-between" align="center">
            <Button
              size="sm"
              auto
              color="primary"
              icon={<FaMinus />}
              className={styles.minus}
              onClick={() => removeOneFromCart(cartProducts)}
            />
            <Badge variant="bordered" color="neutral">
              {cellValue}
            </Badge>
            <Button
              size="sm"
              auto
              color="primary"
              icon={<BsPlusLg />}
              className={styles.plus}
              onClick={() => addOneToCart(cartProducts)}
            />
          </Row>
        );

      case "price":
        return <Text color="primary">{`${cellValue} €`}</Text>;

      case "total_price":
        return (
          <Text hideIn="md" className={styles.price}>
            {cartProducts.price * cartProducts.quantity} €
          </Text>
        );
      case "actions":
        return (
          <Button
            auto
            color="error"
            icon={<BsTrash />}
            onClick={() => deleteFromCart(cartProducts)}
            className={styles.delete}
          />
        );
      default:
        return cellValue;
    }
  };

  return (
    <Container className={styles.container}>
      <h1>Panier</h1>
      {useGetTotalQuantity() > 0 ? (
        <>
          <Table
            aria-label="Votre Panier d'achats"
            striped
            bordered
            css={{
              padding: "0",
              width: "40vw",
            }}
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column key={column.uid} hideHeader={column.uid === "actions" || column.uid === "total_price"}>
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={cartProducts} className={styles.items}>
              {(item) => <Table.Row>{(columnKey) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}</Table.Row>}
            </Table.Body>
          </Table>
          <span className={styles.total}>Total : {getTotalCost()} €</span>
          <ButtonUI
            color="primary"
            icon={<BsFillCartCheckFill />}
            onClick={() => {
              checkout({
                lineItems: stripeCart,
              });
            }}
            text="Valider le Panier"
          />
          <Spacer y={1} />
        </>
      ) : (
        <p className={styles.void}>Aucun produit dans le panier</p>
      )}

      <Link href="/">
        <ButtonUI className={styles.home} auto color="primary" icon={<IoHome />} flat text="Retour à l'accueil" />
      </Link>
    </Container>
  );
};

export default Cart;
