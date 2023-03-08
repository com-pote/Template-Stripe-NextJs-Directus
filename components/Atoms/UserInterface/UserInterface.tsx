import Link from "next/link";
import { useAuth } from "../../../contexts/AuthContext";
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import styles from "./UserInterface.module.scss";

const UserInterface = () => {
  const { isAuthenticated, user, logout, visible, toggle } = useAuth();
  return (
    <div className={`${styles.container} ${visible ? styles.visible : ""}`}>
      {isAuthenticated ? (
        <div className={styles.authenticated}>
          <div className={styles.infos}>
            <Avatar infos={user} onClick={() => {}} />
            <div className={styles.text}>
              <p>
                {user.first_name} {user.last_name}
              </p>
              <p>{user.email}</p>
            </div>
          </div>
          <Link href="/mon-compte" onClick={() => toggle(!visible)}>
            <Button text="Mon Compte" color="primary" />
          </Link>
          <Button text="Déconnexion" color="error" onClick={() => logout()} />
        </div>
      ) : (
        <div className="unAuthenticated">
          <p>Veuillez vous identifier ou vous inscrire</p>
          <Link href="/inscription" onClick={() => toggle(!visible)}>
            <Button text="Inscription" color="body" />
          </Link>
          <Link href="/connexion" onClick={() => toggle(!visible)}>
            <Button text="Connexion" color="primary" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInterface;
