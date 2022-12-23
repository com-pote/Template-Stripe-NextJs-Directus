import { UseUxContext } from "../contexts/uxContext";
import styles from "../styles/Profile.module.css";

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
