import styles from "./SearchBar.module.css";
import { BsSearch } from "react-icons/bs";
import { Input } from "@nextui-org/react";

const SearchBar = () => {
  return (
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
    />
  );
};

export default SearchBar;
