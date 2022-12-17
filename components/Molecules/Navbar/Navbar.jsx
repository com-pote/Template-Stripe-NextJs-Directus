import styles from "./Navbar.module.css";

import { UseUxContext } from "../../../contexts/uxContext";
import Link from "next/link";

const Navbar = ({ categories }) => {
  const { menuVisible, toggleMenuVisibility } = UseUxContext();

  return (
    <>
      <nav className={`${styles.container} ${menuVisible && styles.active}`}>
        <ul>
          {categories &&
            categories.map((c) => (
              <Link href={`/categorie/${c.id}`} key={c.id} onClick={() => toggleMenuVisibility(false)}>
                <li>{c.name}</li>
              </Link>
            ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
