import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../contexts/AuthContext";
import { createUser } from "../../../lib/directus/users";
import Button from "../../Atoms/Button/Button";
import Input from "../../Atoms/Input/Input";
import Loader from "../Loader/Loader";
import styles from "./RegisterCard.module.scss";
import getConfig from "next/config";
import { ItemInput, UserItem } from "@directus/sdk";
import { toast } from "react-toastify";

const { publicRuntimeConfig } = getConfig();

const { role } = publicRuntimeConfig;

const RegisterCard = () => {
  const { isAuthenticated, loading } = useAuth();

  const router = useRouter();

  const roleId = role;
  const avatar = "ba180e8b-f784-4910-b7af-ab16a14f9234";

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/mon-compte");
    }
  }, [router, isAuthenticated]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({ mode: "onChange" });

  const submit = (credentials: ItemInput<UserItem<unknown>>) => {
    createUser({
      first_name: credentials.first_name,
      last_name: credentials.last_name,
      email: credentials.email,
      password: credentials.password,
      role: credentials.role,
      avatar: credentials.avatar,
    })
      .then(() => toast.success("Compte bien crée", {}))
      .then(() => router.push("/connexion"))
      .then(() => toast.info("Vous pouvez dès à présent vous connecter", {}));
  };

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <Input
          {...register("first_name", {
            required: { value: true, message: "Requis" },
            minLength: { value: 3, message: "Au moins 3 caractères" },
            maxLength: { value: 20, message: "Maximum 20 caractères" },
          })}
          error={errors.first_name}
          dirty={dirtyFields.first_name}
          id="firstname"
          placeholder="Louis"
          defaultValue=""
        />
        <Input
          {...register("last_name", {
            required: { value: true, message: "Requis" },
            minLength: { value: 3, message: "Au moins 3 caractères" },
            maxLength: { value: 20, message: "Maximum 20 caractères" },
          })}
          error={errors.last_name}
          dirty={dirtyFields.last_name}
          id="lastname"
          placeholder="De Funès"
          defaultValue=""
        />
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
          id="password"
          type="password"
          placeholder="**********"
          className={styles.password}
        />
        <Input
          {...register("verify", {
            required: { value: true, message: "Requis" },
            validate: (value) => {
              if (watch("password") != value) {
                return "Vos mots de passe ne correspondent pas";
              }
            },
          })}
          error={errors.verify}
          dirty={dirtyFields.verify}
          id="verify"
          type="password"
          placeholder="**********"
          className={styles.password}
        />
        <input type="hidden" value={roleId} {...register("role")} />
        <input type="hidden" value={avatar} {...register("avatar")} />
        <Button type="submit" color="primary" text="Connexion" icon={loading && <Loader />} />
      </form>
    </section>
  );
};

export default RegisterCard;
