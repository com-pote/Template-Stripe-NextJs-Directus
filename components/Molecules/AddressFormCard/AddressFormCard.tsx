import Input from "../../Atoms/Input/Input";
import { useForm } from "react-hook-form";
import styles from "./AddressFormCard.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/AuthContext";
import { createAdress } from "../../../lib/directus/users";

export const AddressFormCard = () => {
  const { user } = useAuth();

  const [userId, setUserId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      street: "",
      zip_code: "",
      city: "",
      country: "",
    },
  });

  const submit = async (data) => {
    if (userId !== null) {
      await createAdress({ ...data, recipient: userId })
        .then(() => {
          reset();
          router.push("/mon-compte/adresses");
        })
        .catch((err) => err);
    }
  };

  return (
    user && (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(submit)}>
          <div className={styles.header}>
            <p>Nouvelle Adresse</p>
          </div>
          <hr />
          <div className={styles.body}>
            <Input
              {...register("name", {
                required: { value: true, message: "Requis" },
              })}
              error={errors.name}
              dirty={dirtyFields.name}
              id="name"
              defaultValue=""
            />
            <Input
              {...register("street", {
                required: { value: true, message: "Requis" },
              })}
              error={errors.street}
              dirty={dirtyFields.street}
              id="street"
              defaultValue=""
            />
            <Input
              {...register("zip_code", {
                required: { value: true, message: "Requis" },
              })}
              error={errors.zip_code}
              dirty={dirtyFields.zip_code}
              id="zip_code"
              defaultValue=""
            />
            <Input
              {...register("city", {
                required: { value: true, message: "Requis" },
              })}
              error={errors.city}
              dirty={dirtyFields.city}
              id="zip_code"
              defaultValue=""
            />
            <Input
              {...register("country", {
                required: { value: true, message: "Requis" },
              })}
              error={errors.country}
              dirty={dirtyFields.country}
              id="country"
              defaultValue=""
            />
          </div>
          <hr />
          <div className={styles.footer}>
            <button>Ajouter</button>
          </div>
        </form>
      </div>
    )
  );
};
