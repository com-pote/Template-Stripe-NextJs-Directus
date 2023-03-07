import dayjs from "dayjs";
import "dayjs/locale/fr";
import { useEffect, useState } from "react";
import { IOrderLine } from "../../../Interfaces/IOrderline";
import { getAllLineFromOrder } from "../../../lib/directus/order";
import OrderLine from "../OrderLine/OrderLine";
import styles from "./Order.module.scss";

const Order = ({ order }) => {
  const [lines, setLines] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    getAllLineFromOrder(order.id.toString())
      .then((data) => setLines(data))
      .catch((err) => console.error(err));
  }, [order]);

  useEffect(() => {
    if (lines !== null) {
      let sum = 0;
      lines.forEach((l: IOrderLine) => {
        sum += l.quantity * l.price;
      });
      setTotal(sum);
    }
  }, [lines]);

  return (
    <div className={styles.container}>
      {order && (
        <>
          <h3>{dayjs(order.datetime).locale("fr").format("dddd DD/MM/YYYY HH:mm")}</h3>
          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>{lines && lines.map((l: IOrderLine) => <OrderLine key={l.id} line={l} />)}</tbody>
            <tfoot>
              <tr>
                <td rowSpan={2}>Total</td>
                <td>{total} €</td>
              </tr>
            </tfoot>
          </table>
        </>
      )}
    </div>
  );
};

export default Order;
