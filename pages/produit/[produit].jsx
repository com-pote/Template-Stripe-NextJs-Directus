import Image from "next/image";
import getAssetURL from "../../services/directus/getAssets";
import { find, getAll } from "../../services/directus/utils";
import { BsFillCartPlusFill } from "react-icons/bs";
import Head from "next/head";
import { UsecartContext } from "../../contexts/cartContext";
import { UseUxContext } from "../../contexts/uxContext";
import styles from "../../styles/ProductSingle.module.css";
import Flash from "../../components/Atoms/Flash/Flash";
import { Container } from "@nextui-org/react";
import ButtonUI from "../../components/Atoms/Button/Button";

export async function getStaticPaths() {
  const produits = await getAll("product");

  const paths = produits.map((item) => ({
    params: { produit: item.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const id = context.params.produit;
  const product = await find("product", id);
  const categories = await getAll("category");
  return {
    props: {
      product,
      categories,
    },
    revalidate: 10,
  };
}

const ProductSingle = ({ product }) => {
  const { addOneToCart } = UsecartContext();
  const { handleFlash, flash, flashType } = UseUxContext();

  const handleButton = (product) => {
    addOneToCart(product);
    handleFlash("success", "Produit ajouté au panier", 1000);
  };
  return (
    <>
      <Head>
        <title>{`${product && product.name} | Nom du Commerce`}</title>
      </Head>
      <Container className={styles.container}>
        <article>
          {product && (
            <>
              <div className={styles.fimg}>
                <Image src={getAssetURL(product.fimg.id)} alt={product.name} fill />
              </div>
              <div className={styles.infos}>
                <h1>{product.name}</h1>
                <span className={styles.price}>{product.price} €</span>
                <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
                <ButtonUI onClick={() => handleButton(product)} text={"Ajouter au Panier"} />
              </div>
            </>
          )}
        </article>
        {flash && <Flash type={flashType} text={flash} />}
      </Container>
    </>
  );
};

export default ProductSingle;
