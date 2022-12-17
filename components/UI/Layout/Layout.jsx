import { useEffect } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import { loadStripe } from "@stripe/stripe-js";
import getConfig from "next/config";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const { publicRuntimeConfig } = getConfig();

const { stripeKey } = publicRuntimeConfig;

const Layout = ({ children, categories }) => {
  useEffect(() => {
    const stripe = loadStripe(stripeKey);
  }, []);

  useLocalStorage("cart", "[]");

  return (
    <>
      <Header />
      <Navbar categories={categories} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
