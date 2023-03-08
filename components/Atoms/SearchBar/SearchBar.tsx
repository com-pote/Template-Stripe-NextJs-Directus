import { useRouter } from "next/router";
import Input from "../Input/Input";
import styles from "./SearchBar.module.scss";
import Magnifying from "../../../public/Magnifying";
import { useSearchStore } from "../../../contexts/searchStore";

const SearchBar = () => {
  const updateSearch = useSearchStore((state) => state.updateSearch);

  const handleChange = (value: string) => {
    updateSearch(value);
  };

  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push("/produits");
  };

  return (
    <form onSubmit={handleSearch} className={styles.container}>
      <div className="mobile">
        <Magnifying width="2em" height="2em" color="var(--opacity)" bg="var(--opacity)" />
      </div>
      <div className="not-mobile">
        <Magnifying width="2em" height="2em" color="var(--primary)" bg="var(--primary)" />
      </div>
      <Input
        id="searchBar"
        placeholder="Rechercher"
        aria-label="Barre de recherche"
        onChange={(e) => handleChange(e.target.value)}
        className={styles.input}
      />
    </form>
  );
};

export default SearchBar;
