import styles from "./Navbar.module.css";
import { UseUxContext } from "../../../contexts/uxContext";
import { Navbar } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import SearchBar from "../../Atoms/SearchBar/SearchBar";
import { IoCartSharp } from "react-icons/io5";
import { useGetTotalQuantity } from "../../../hooks/useGetTotalQuantity";
import { BsFacebook, BsInstagram } from "react-icons/bs";

const NavbarUi = ({ categories }) => {
  return (
    <>
      <Navbar isCompact variant="sticky" className={styles.container}>
        <Navbar.Brand>
          <Link href="/" className={styles.logo}>
            <Image alt="Logo de Marlène Création" src={logo} fill />
          </Link>
        </Navbar.Brand>
        <Navbar.Content className={styles.categories}>
          {categories &&
            categories.map((c) => (
              <Navbar.Link href={`/categorie/${c.id}`} key={c.id}>
                {c.name}
              </Navbar.Link>
            ))}
        </Navbar.Content>
        <Navbar.Content className={styles.icons}>
          <Navbar.Item
            css={{
              "@xsMax": {
                w: "100%",
                jc: "center",
              },
            }}
          >
            <SearchBar />
          </Navbar.Item>
          <Navbar.Link href="/">
            <BsFacebook />
          </Navbar.Link>
          <Navbar.Link href="/">
            <BsInstagram />
          </Navbar.Link>
          <Navbar.Link href="/panier" className={styles.cartContainer}>
            <IoCartSharp />
            <span className={styles.qty}>{useGetTotalQuantity()}</span>
          </Navbar.Link>
        </Navbar.Content>
      </Navbar>
    </>
  );
};

export default NavbarUi;
