import { useCallback, useEffect, useState } from "react";
import styles from "../../../styles/Profile.module.scss";
import { AddressFormCard } from "../../../components/Molecules/AddressFormCard/AddressFormCard";
import Link from "next/link";
import BreadCrumb from "../../../components/Molecules/BreadCrumb/BreadCrumb";
import { useAuth } from "../../../contexts/AuthContext";
import { getAllCategories } from "../../../lib/directus/categories";
import { getAllMyAdresses, deleteAdress } from "../../../lib/directus/users";
import Button from "../../../components/Atoms/Button/Button";
import Edit from "../../../public/Edit";
import Trash from "../../../public/Trash";
import { IAddress } from "../../../Interfaces/IAddress";

export async function getStaticProps() {
  const categories = await getAllCategories();
  return {
    props: {
      categories: categories,
      protected: true,
    },
    revalidate: 10,
  };
}

const Adress = () => {
  const [myAddresses, setMyAddresses] = useState<IAddress[]>([]);
  const { user } = useAuth();

  const deleteMyAdress = useCallback(
    (cellValue: number) => {
      deleteAdress(cellValue);
      const copy = [...myAddresses];
      copy.slice(cellValue, 1);
      setMyAddresses(copy);
    },
    [myAddresses]
  );

  useEffect(() => {
    getAllMyAdresses(user.id)
      .then((data) => setMyAddresses(data))
      .catch((err) => console.log(err));
  }, [user.id, deleteMyAdress]);

  interface column {
    key: string;
    label: string;
  }

  const columns: column[] = [
    {
      key: "name",
      label: "NOM",
    },
    {
      key: "street",
      label: "RUE",
    },
    {
      key: "zip_code",
      label: "CODE POSTAL",
    },
    {
      key: "city",
      label: "VILLE",
    },
    {
      key: "country",
      label: "PAYS",
    },
    {
      key: "id",
      label: "Actions",
    },
  ];

  return (
    <main className={styles.container}>
      <BreadCrumb />
      <h1>Mes Adresses</h1>
      {user && myAddresses.length !== 0 ? (
        <>
          <table aria-label="Mes Adresses">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {myAddresses.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.street}</td>
                  <td>{a.zip_code}</td>
                  <td>{a.city}</td>
                  <td>{a.country}</td>
                  <td>
                    <Link href={`/mon-compte/adresses/modifier/${a.id}`}>
                      <Edit width="2em" height="2em" />
                    </Link>
                    <Trash width="2em" height="2em" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="/mon-compte/adresses/ajouter" style={{ color: "white" }}>
            <Button text="Nouvelle Adresse" color="success" />
          </Link>
        </>
      ) : (
        <div className={styles.body}>
          <p>Aucune Adresse</p>

          <AddressFormCard />
        </div>
      )}
    </main>
  );
};

export default Adress;
