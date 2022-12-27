import { UseUxContext } from "../contexts/uxContext";
import { getAll } from "../services/directus/utils";
import styles from "../styles/Profile.module.css";

export async function getStaticProps() {
  const categories = await getAll("category");
  return {
    props: {
      categories: categories,
      protected: true,
    },
    revalidate: 10,
  };
}

const Profile = () => {
  const { user } = UseUxContext();
  return (
    <div className={styles.container}>
      <h1>Mon Compte</h1>
      {user && (
        <>
          <p>{user.first_name}</p>
          <p>{user.last_name}</p>
        </>
      )}
    </div>
  );
};

export default Profile;
