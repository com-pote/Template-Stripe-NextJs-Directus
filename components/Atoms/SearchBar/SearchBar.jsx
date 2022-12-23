import { BsSearch } from "react-icons/bs";
import { Input } from "@nextui-org/react";
import { UsecartContext } from "../../../contexts/cartContext";
import { useRouter } from "next/router";

const SearchBar = () => {
  const { setSearch } = UsecartContext();

  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push("/produits");
  };

  return (
    <form onSubmit={handleSearch}>
      <Input
        clearable
        underlined
        contentLeft={<BsSearch />}
        contentLeftStyling={false}
        css={{
          w: "100%",
          "@xsMax": {
            mw: "300px",
          },
          "& .nextui-input-content--left": {
            h: "100%",
            ml: "$4",
            dflex: "center",
          },
        }}
        placeholder="Rechercher"
        aria-label="Barre de recherche"
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
