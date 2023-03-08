import Footer from "../Molecules/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Molecules/Header/Header";
import HeaderMobile from "../Molecules/HeaderMobile/HeaderMobile";
import NavBarMobile from "../Molecules/NavBarMobile/NavBarMobile";
import UserInterface from "../Atoms/UserInterface/UserInterface";
import Categories from "../Atoms/Categories/Categories";
interface Props {
  children: React.ReactElement;
  categories?: unknown;
}

const Layout = ({ children, categories }: Props) => {
  return (
    <>
      <Header categories={categories} />
      <HeaderMobile categories={categories} />
      <UserInterface />
      <Categories categories={categories} />
      {children}
      <Footer />
      <NavBarMobile />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Layout;
