import styles from "./Navbar.module.css";
import { Navbar } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import SearchBar from "../../Atoms/SearchBar/SearchBar";
import { IoCartSharp, IoPersonAdd } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { useGetTotalQuantity } from "../../../hooks/useGetTotalQuantity";
import { useRouter } from "next/router";
import { UseUxContext } from "../../../contexts/uxContext";
import Avatar from "../../Atoms/Avatar/Avatar";
import directus from "../../../services/directus/directus";
import { UseSlug } from "../../../hooks/useSlug";

const NavbarUi = ({ categories }) => {
  const router = useRouter();
  const { asPath } = router;

  const { isAuthenticated, setIsAuthenticated, user } = UseUxContext();

  const logout = async () => {
    if (typeof window !== "undefined") {
      const refreshToken = localStorage.getItem("auth_refresh_token") && localStorage.getItem("auth_refresh_token");
      if (refreshToken) {
        await directus.auth
          .logout(refreshToken)
          .then(() => {
            console.log(refreshToken);
            setIsAuthenticated(false);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <>
      <Navbar variant="sticky" maxWidth="fluid" className={styles.container} justify="space-between">
        <Navbar.Toggle showIn="md" aria-label="Afficher/Cacher menu" />
        <Navbar.Brand showIn="md">
          <Link href="/" className={styles.logo} aria-label="Logo">
            <Image alt="Logo de Marlène Création" src={logo} fill sizes="6vh" />
          </Link>
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          isCursorHighlightRounded={false}
          hideIn="md"
          variant="underline"
          className={styles.categories}
        >
          <Navbar.Brand>
            <Link href="/" className={styles.logo} aria-label="Logo">
              <Image alt="Logo de Marlène Création" src={logo} fill sizes="6vh" />
            </Link>
          </Navbar.Brand>
          {categories &&
            categories.map((c) =>
              asPath === `/categorie/${c.name}` ? (
                <Navbar.Item key={c.id} isActive={asPath === `/categorie/${c.name}` ? true : false}>
                  {c.name}
                </Navbar.Item>
              ) : (
                <Navbar.Item key={c.id} isActive={asPath === `/categorie/${c.name}` ? true : false}>
                  <Link href={`/categories/${UseSlug(c.name)}`}>{c.name}</Link>
                </Navbar.Item>
              )
            )}
        </Navbar.Content>
        <Navbar.Content className={styles.icons}>
          <Navbar.Item hideIn="md">
            <SearchBar />
          </Navbar.Item>
          {isAuthenticated ? (
            <>
              <Navbar.Item hideIn="md" aria-label="Déconnexion" onClick={logout} className={styles.logout}>
                Déconnexion
              </Navbar.Item>

              <Navbar.Item hideIn="md" aria-label="Mon Compte">
                <Link href="/mon-compte">
                  <Avatar infos={user} />
                </Link>
              </Navbar.Item>
              <Navbar.Item showIn="md" aria-label="Déconnexion" onClick={logout}>
                <BiLogOutCircle />
              </Navbar.Item>
              <Navbar.Item showIn="md" aria-label="Mon Compte">
                <Link href="/inscription">
                  <FaUserCircle />
                </Link>
              </Navbar.Item>
            </>
          ) : (
            <>
              <Navbar.Item hideIn="md">
                <Link href="/connexion" aria-label="Connexion">
                  Connexion
                </Link>
              </Navbar.Item>

              <Navbar.Item hideIn="md" aria-label="Inscription">
                <Link href="/inscription">Inscription</Link>
              </Navbar.Item>
              <Navbar.Item showIn="md" aria-label="Connexion">
                <Link href="/connexion">
                  <IoMdLogIn />
                </Link>
              </Navbar.Item>
              <Navbar.Item showIn="md" aria-label="Inscription">
                <Link href="/inscription">
                  <IoPersonAdd />
                </Link>
              </Navbar.Item>
            </>
          )}

          <Navbar.Item className={styles.cartContainer}>
            <Link href="/panier">
              <IoCartSharp />
              <span className={styles.qty}>{useGetTotalQuantity()}</span>
            </Link>
          </Navbar.Item>
        </Navbar.Content>
        <Navbar.Collapse>
          {categories &&
            categories.map((item) => (
              <Navbar.CollapseItem key={item.id}>
                <Link
                  css={{
                    minWidth: "100%",
                  }}
                  href={`/categories/${UseSlug(item.name)}`}
                  aria-label={item.name}
                >
                  {item.name}
                </Link>
              </Navbar.CollapseItem>
            ))}

          <Navbar.CollapseItem>
            <SearchBar />
          </Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarUi;
