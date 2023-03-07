import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../styles/Profile.module.scss";
import { getAllCategories } from "../../lib/directus/categories";

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

const Profile = () => {
  const { user } = useAuth();

  return (
    <main className={styles.container}>
      <h1>Mon Compte</h1>
      {user && (
        <>
          <p>Bienvenue, {user.first_name}.</p>
          <ul>
            <li>
              <Link href="/mon-compte/mes-commandes">Mes Commandes</Link>
            </li>
            <li>
              <Link href="/mon-compte/adresses">Mes Adresses</Link>
            </li>
            <li>
              <Link href="/mon-compte/liste-envie">Liste d&apos;envie</Link>
            </li>
            <li>
              <Link href="/mon-compte/infos">Mes Informations</Link>
            </li>
          </ul>
        </>
      )}
    </main>
  );
};

export default Profile;
