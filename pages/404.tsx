import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main>
      <h1>404 - Page Not Found</h1>
      <Link href="/">Retour a l&apos;accueil</Link>
    </main>
  );
};

export default NotFound;
