import styles from "./Navbar.module.css";
import { Navbar, Row, Spacer } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import SearchBar from "../../Atoms/SearchBar/SearchBar";
import { IoCartSharp } from "react-icons/io5";
import { useGetTotalQuantity } from "../../../hooks/useGetTotalQuantity";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { useRouter } from "next/router";

const NavbarUi = ({ categories }) => {
  const router = useRouter();
  const { asPath } = router;
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
              asPath === `/categorie/${c.id}` ? (
                <Navbar.Item key={c.id} isActive={asPath === `/categorie/${c.id}` ? true : false}>
                  {c.name}
                </Navbar.Item>
              ) : (
                <Navbar.Link
                  href={`/categorie/${c.id}`}
                  key={c.id}
                  isActive={asPath === `/categorie/${c.id}` ? true : false}
                >
                  {c.name}
                </Navbar.Link>
              )
            )}
        </Navbar.Content>
        <Navbar.Content className={styles.icons}>
          <Navbar.Item hideIn="md">
            <SearchBar />
          </Navbar.Item>
          <Navbar.Link href="/" hideIn="md" aria-label="Facebook">
            <BsFacebook />
          </Navbar.Link>
          <Navbar.Link href="/" hideIn="md" aria-label="Instagram">
            <BsInstagram />
          </Navbar.Link>

          <Navbar.Link href="/panier" className={styles.cartContainer}>
            <IoCartSharp />
            <span className={styles.qty}>{useGetTotalQuantity()}</span>
          </Navbar.Link>
        </Navbar.Content>
        <Navbar.Collapse>
          {categories.map((item) => (
            <Navbar.CollapseItem key={item.id}>
              <Link
                css={{
                  minWidth: "100%",
                }}
                href={`/categorie/${item.id}`}
                aria-label={item.name}
              >
                {item.name}
              </Link>
            </Navbar.CollapseItem>
          ))}

          <Navbar.CollapseItem>
            <SearchBar />
          </Navbar.CollapseItem>
          <Spacer y={2} />
          <Navbar.CollapseItem>
            <Row justify="center">
              <Link href="/" aria-label="FaceBook">
                <BsFacebook />
              </Link>
              <Spacer x={2} />

              <Link href="/" aria-label="Instagram">
                <BsInstagram />
              </Link>
            </Row>
          </Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarUi;
