import Image from "next/image";
import Link from "next/link";
import Button from "../../Atoms/Button/Button";
import styles from "./Hero.module.scss";
import Cart from "../../../public/Cart";

const Hero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Nom de la Marque</span>
        <span>Slogan de la marque</span>
      </div>
      <div className={styles.body}>
        <Image src="/bg.jpg" fill alt="Relaxing app background" />
      </div>
      <div className={styles.footer}>
        <Link href="/produits">
          <Button
            text="Voir tous les Produits"
            icon={<Cart width="3em" height="3em" color="var(--body)" bg="var(--primary)" />}
            color="primary"
          />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
