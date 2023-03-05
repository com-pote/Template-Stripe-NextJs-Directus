import styles from "../../../styles/Profile.module.scss";
import InputRef from "../../../components/Atoms/Input/Input";
import { useForm } from "react-hook-form";
import directus from "../../../lib/directus/directus";
import BreadCrumb from "../../../components/Molecules/BreadCrumb/BreadCrumb";
import { useAuth } from "../../../contexts/AuthContext";
import { getAllCategories } from "../../../lib/directus/categories";
import { updateMe } from "../../../lib/directus/users";
import { IUser } from "../../../Interfaces/IUser";
import ButtonUI from "../../../components/Atoms/Button/Button";
import Button from "../../../components/Atoms/Button/Button";

export async function getStaticProps() {
  const categories = await getAllCategories();
  return {
    props: {
      categories: categories,
      protected: true,
    },
    revalidate: 10,
  };
}

const Profile = () => {
  const { user, logout } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({ mode: "onChange" });

  const submit = async (credentials: IUser) => {
    updateMe(credentials).then(() => {
      logout();
    });
  };

  const requestPasswordChange = async () => {
    await directus.auth.password.request(user.email);
  };

  return (
    <div className={styles.container}>
      <BreadCrumb />
      <h1>Mes Infos</h1>
      {user && (
        <>
          <p>Prénom : {user.first_name}</p>
          <p>Nom : {user.last_name}</p>
          <p>Email : {user.email}</p>
          <InputRef
            {...register("email", {
              required: { value: true, message: "Requis" },
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "nom@domain.extension",
              },
            })}
            error={errors.email}
            dirty={dirtyFields.email}
            label="Changer Email"
            id="email"
            placeholder="nom@pocli.fr"
            defaultValue={user.email}
            className={styles.email}
          />

          <Button color="warning" onClick={handleSubmit(submit)} text="Changer d'adresse mail" />

          <Button color="primary" onClick={requestPasswordChange} text="Changer mot de passe" />
        </>
      )}
    </div>
  );
};

export default Profile;
