import styles from "./HeaderMobile.module.scss";
import { useAuth } from "../../../contexts/AuthContext";
import Avatar from "../../Atoms/Avatar/Avatar";
import SearchBar from "../../Atoms/SearchBar/SearchBar";
import Login from "../../../public/Login";

const HeaderMobile = ({ categories }) => {
  const { isAuthenticated, user, toggle, visible } = useAuth();

  return (
    <header className={`mobile ${styles.container}`}>
      <SearchBar />
      <div className={styles.ui}>
        {isAuthenticated ? (
          <div aria-label="Mon Compte">
            <Avatar infos={user} onClick={() => toggle(!visible)} />
          </div>
        ) : (
          <div aria-label="Connexion" onClick={() => toggle(!visible)}>
            <Login width="2em" height="2em" color="var(--opacity)" bg="var(--body)" />
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderMobile;
