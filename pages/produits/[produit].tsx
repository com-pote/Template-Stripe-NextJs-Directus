import Image from "next/image";
import getAsset from "../../lib/directus/getAssets";
import { getAll } from "../../lib/directus/utils";
import Head from "next/head";
import styles from "../../styles/ProductSingle.module.scss";
import { GetStaticProps, GetStaticPaths } from "next";
import { findProduct, getAllProduct } from "../../lib/directus/products";
import { ICartItem } from "../../Interfaces/ICartItem";
import Button from "../../components/Atoms/Button/Button";
import { useCartStore } from "../../contexts/cartStore";
import Badge from "../../components/Atoms/Badge/Badge";

export const getStaticPaths: GetStaticPaths = async () => {
  const produits = await getAllProduct();

  const paths = produits.map((item) => ({
    params: { produit: item.name.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const name = context.params.produit;
  const product = await findProduct(name);
  const categories = await getAll("category");
  return {
    props: {
      product,
      categories,
    },
    revalidate: 10,
  };
};

const ProductSingle = ({ product }) => {
  const addOneToCart = useCartStore((state) => state.addOneToCart);

  const handleButton = (product: ICartItem) => {
    addOneToCart(product);
  };
  return (
    <>
      <Head>
        <title>{`${product && product.name} | Nom du Commerce`}</title>
      </Head>
      <div className={styles.container}>
        {/* <BreadCrumb /> */}
        <article>
          {product && (
            <>
              {product.fimg && (
                <div className={styles.fimg}>
                  <Image src={getAsset(product.fimg.id)} alt={product.name} fill />
                </div>
              )}
              <div className={styles.infos}>
                <h1>{product.name}</h1>
                <Badge text={product.category?.name} />
                <span className={styles.price}>{product.price} €</span>
                <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
                <Button onClick={() => handleButton(product)} text="Ajouter au Panier" color="primary" />
              </div>
            </>
          )}
        </article>
      </div>
    </>
  );
};

export default ProductSingle;
