import styles from "./OrderLine.module.scss";

const OrderLine = ({ line }) => {
  return (
    <tr className={styles.container}>
      <td>{line.product.name}</td>
      <td>{line.quantity}</td>
      <td>{line.price} €</td>
    </tr>
  );
};

export default OrderLine;
