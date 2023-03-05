import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import Input from "../../Atoms/Input/Input";
import styles from "./LoginCard.module.scss";
import { useAuth } from "../../../contexts/AuthContext";
import Button from "../../Atoms/Button/Button";
import Loader from "../Loader/Loader";

const LoginCard = () => {
  const { isAuthenticated, login, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/mon-compte");
    }
  }, [router, isAuthenticated]);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({ mode: "onChange" });

  const submit = (credentials: { email: string; password: string }) => {
    login(credentials);
  };

  return (
    <div className={styles.container}>
      <span>Formulaire de connexion</span>
      <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <Input
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
          label="Email"
          id="email"
          placeholder="nom@domain.fr"
          defaultValue=""
          className={styles.email}
        />
        <Input
          {...register("password", {
            required: { value: true, message: "Requis" },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
              message: "8 caractères dont 1 spécial, 1 chiffre",
            },
          })}
          error={errors.password}
          dirty={dirtyFields.password}
          label="Mot de Passe"
          id="password"
          type="password"
          placeholder="**********"
          className={styles.password}
        />
        {/* <Button text="Connexion" color="primary" /> */}
        <Button type="submit" color="primary" text="Connexion" icon={loading && <Loader />} />
      </form>
      {/** TODO Request password change */}
      <Link href="/">
        <span className="passwordForgot">Mot de passe oublié ?</span>
      </Link>
    </div>
  );
};

export default LoginCard;
