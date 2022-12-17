import styles from "./Header.module.css";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { BsFacebook, BsInstagram, BsSearch } from "react-icons/bs";
import { IoCartSharp } from "react-icons/io5";
import Link from "next/link";
import ToggleMenuIcon from "../../ToggleMenuIcon/ToggleMenuIcon";
import { useGetTotalQuantity } from "../../../hooks/useGetTotalQuantity";

const Header = () => {
  return (
    <header className={styles.container}>
      <ul className={styles.networks}>
        <li>
          <BsFacebook />
          <BsInstagram />
        </li>
        <li>
          <Link href="/panier" className={styles.cartContainer}>
            <IoCartSharp />
            <span className={styles.qty}>{useGetTotalQuantity()}</span>
          </Link>
        </li>
      </ul>
      <div className={styles.search}>
        <BsSearch />
        <input type="text" placeholder="Rechercher" />
      </div>
      <Link href="/" className={styles.logo}>
        <Image alt="Logo de Marlène Création" src={logo} fill />
      </Link>
      <ToggleMenuIcon />
    </header>
  );
};

export default Header;
