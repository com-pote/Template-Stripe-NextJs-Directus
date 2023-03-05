import Footer from "../Molecules/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Molecules/Header/Header";
interface Props {
  children: React.ReactElement;
  categories?: unknown;
}

const Layout = ({ children, categories }: Props) => {
  return (
    <>
      <Header categories={categories} />
      {children}
      <Footer />
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
