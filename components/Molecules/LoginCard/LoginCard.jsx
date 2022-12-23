import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { UseUxContext } from "../../../contexts/uxContext";
import { login } from "../../../services/directus/utils";
import Link from "next/link";
import { useEffect } from "react";
import Flash from "../../Atoms/Flash/Flash";
import Input from "../../Atoms/Input/Input";
import ButtonUi from "../../Atoms/Button/Button";
import { Card, Spacer, Text } from "@nextui-org/react";
import styles from "./LoginCard.module.css";

const LoginCard = () => {
  const { flash, flashType, handleFlash, setIsAuthenticated, isAuthenticated } = UseUxContext();

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

  const submit = async (credentials) => {
    try {
      await login(credentials);
      setIsAuthenticated(true);
    } catch (err) {
      handleFlash("error", "Mauvaise combinaison Identifiant / Mot de passe", 3000);
    }
  };

  return (
    <>
      <Card css={{ p: "$6", mw: "400px" }}>
        <Card.Header>
          <Text h4 css={{ lineHeight: "$xs" }}>
            Formulaire de connexion
          </Text>
        </Card.Header>
        <Card.Body css={{ py: "$6" }}>
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
              placeholder="nom@pocli.fr"
              defaultValue=""
              className={styles.email}
            />
            <Spacer y={2} />
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
              defaultValue=""
              type="password"
              className={styles.password}
            />
            <div className={styles.submit}>
              <ButtonUi type="submit" text="Connexion" />
            </div>
          </form>
        </Card.Body>
        <Card.Footer>
          {/** TODO Request password change */}
          <Link href="/">
            <span className="passwordForgot">Mot de passe oublié ?</span>
          </Link>
        </Card.Footer>
      </Card>

      {flash && <Flash type={flashType} text={flash} />}
    </>
  );
};

export default LoginCard;
