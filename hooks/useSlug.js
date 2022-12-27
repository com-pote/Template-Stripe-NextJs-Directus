import { useEffect, useState } from "react";

// retourne le nombre d'article dans le panier
export const UseSlug = (text) => {
  const [slug, setSlug] = useState("");

  useEffect(() => {
    setSlug(
      text
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    );
  }, [text]);

  return slug;
};
