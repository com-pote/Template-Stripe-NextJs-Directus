import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/AuthContext";
import Avatar from "../../Atoms/Avatar/Avatar";
import SearchBar from "../../Atoms/SearchBar/SearchBar";
import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
import Cart from "../../../public/Cart";
import { getTotalQuantity } from "../../../lib/utils";
import { useCartStore } from "../../../contexts/cartStore";
import Logout from "../../../public/Logout";
import Login from "../../../public/Login";
import Register from "../../../public/Register";

const Header = ({ categories }) => {
  const [quantity, setQuantity] = useState(0);
  const router = useRouter();
  const { asPath } = router;

  const { isAuthenticated, user, logout } = useAuth();

  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    const quantity = getTotalQuantity(cart);
    setQuantity(quantity);
  }, [cart]);

  return (
    <header className={styles.container}>
      <nav className={styles.menu}>
        <div className={styles.logo}>
          <Link href="/" aria-label="Logo">
            <Image alt="Logo de Marlène Création" src="/logo.png" fill sizes="6vh" />
          </Link>
        </div>
        <SearchBar />
        <div className={styles.ui}>
          {isAuthenticated ? (
            <>
              <div aria-label="Déconnexion" onClick={logout} className={styles.logout} title="Déconnexion">
                <Logout width="2em" height="2em" />
              </div>

              <div aria-label="Mon Compte">
                <Link href="/mon-compte" title="Mon Compte">
                  <Avatar infos={user} />
                </Link>
              </div>
            </>
          ) : (
            <>
              <div aria-label="Connexion">
                <Link href="/connexion" title="Connexion">
                  <Login width="2em" height="2em" />
                </Link>
              </div>
              <div aria-label="Inscription" title="Inscription">
                <Link href="/inscription">
                  <Register width="2em" height="2em" />
                </Link>
              </div>
            </>
          )}
          <Link href="/panier" aria-label="Panier" title="Panier" className={styles.cart}>
            <Cart width="2em" height="2em" color="var(--primary)" bg="var(--body)" />
            <span className={styles.quantity}>{quantity}</span>
          </Link>
        </div>
      </nav>
      <nav className={styles.categories}>
        {categories &&
          categories.map((c) =>
            asPath === `/categories/${c.slug}` ? (
              <div key={c.id} className={asPath === `/categories/${c.slug}` ? styles.active : ""}>
                {c.name}
              </div>
            ) : (
              <div key={c.id} className={asPath === `/categories/${c.slug}` ? styles.active : ""}>
                <Link href={`/categories/${c.slug}`}>{c.name}</Link>
              </div>
            )
          )}
      </nav>
    </header>
  );
};

export default Header;
