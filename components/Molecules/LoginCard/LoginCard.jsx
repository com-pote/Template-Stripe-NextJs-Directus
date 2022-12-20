import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useUxContext } from "../../../contexts/uxContext";
import Icon from "../Icon/Icon";
import { login } from "../../../directus/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import Flash from "../Flash/Flash";
import Input from "../Input/Input";
import { AiOutlineEye } from "react-icons/ai";

const LoginCard = () => {
  const { flash, flashType, handleFlash, setIsAuthenticated, isAuthenticated } = useUxContext();
  const [passwordVisible, togglePasswordVisibilty] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/espace-adherent");
    }
  }, [router, isAuthenticated]);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({ mode: "onChange" });

  const submit = async (credentials) => {
    await login(credentials)
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch((err) => {
        // handleFlash("error", err.message, 3000);
        handleFlash("error", "Mauvaise combinaison Identifiant / Mot de passe", 3000);
      });
  };

  return (
    <>
      <form className="loginCardContainer" onSubmit={handleSubmit(submit)}>
        <h2>S&apos;identifier</h2>
        <div className="loginCardContainer__email">
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
          />
        </div>

        <div className="loginCardContainer__password">
          {passwordVisible ? (
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
              type="text"
            />
          ) : (
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
            />
          )}
          <AiOutlineEye onClick={() => togglePasswordVisibilty(!passwordVisible)} />
        </div>

        {/* <div className="loginCardContainer__stayConnected">
          <input id="stayConnected" type="checkbox" onChange={(e) => setStayConnected(e.target.checked)}></input>
          <label htmlFor="stayConnected" className="loginCardContainer__stayConnected__title">
            Rester connecté
          </label>
        </div> */}
        <Link href="/contact">
          <span className="loginCardContainer__passwordForgot">Mot de passe oublié ?</span>
        </Link>
        <button type="submit" className="loginCardContainer__submit">
          <Icon name="arrow-right" width="40px" height="40px" color="white" />
        </button>
      </form>
      {flash && <Flash type={flashType} text={flash} />}
    </>
  );
};

export default LoginCard;
