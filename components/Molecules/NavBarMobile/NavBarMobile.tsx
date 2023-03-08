import Link from "next/link";
import { useSearchStore } from "../../../contexts/searchStore";
import Cart from "../../../public/Cart";
import Heart from "../../../public/Heart";
import Home from "../../../public/Home";
import More from "../../../public/More";
import User from "../../../public/User";
import styles from "./NavBarMobile.module.scss";

const NavBarMobile = () => {
  const changeVisibility = useSearchStore((state) => state.toggleCategory);
  const visibility = useSearchStore((state) => state.categoryVisible);

  return (
    <nav className={`mobile ${styles.container}`}>
      <Link href="/">
        <Home width="2em" height="2em" />
      </Link>
      <Link href="/mon-compte/liste-envie">
        <Heart width="1.7em" height="1.7em" color="var(--opacity)" />
      </Link>
      <Link href="/panier">
        <Cart width="3em" height="3em" color="var(--opacity)" bg="var(--primary)" />
      </Link>
      <Link href="/mon-compte">
        <User width="2em" height="2em" />
      </Link>

      <div onClick={changeVisibility}>
        <More width="2em" height="2em" />
      </div>
    </nav>
  );
};

export default NavBarMobile;
